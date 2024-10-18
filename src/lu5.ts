import {
    lu5_bindings_unimplemented,
    makeEnv,
    wasi_snapshot_preview1_unimplemented
} from "./unimplemented";
import { LU5Console, WebAssemblyInstance, type PlatformFunction } from "./types";

import * as wasi_snapshot_preview1 from "./wasi";
import * as bindings from './platform/index'
import { write_cstr } from "./memory";
import { colorToHex, colorToRGBA } from "./color";

import * as glfw from './keyboard'
import { LU5_WASM_CDN } from "./env";

export class LU5 {
    readonly l5: number | null;
    canvas_id: string | null;
    wasm: WebAssemblyInstance | undefined;

    ctx: CanvasRenderingContext2D | null;
    gl: WebGLRenderingContext | null;

    memory: WebAssembly.Memory | null;
    view: DataView | null;

    lastTime: number;

    mouseX: number;
    mouseY: number;

    depth_mode: number;

    fd: LU5Console[][];

    loop: boolean;
    frame: () => any | undefined;

    debug_tag: any;

    keyname_ptr: number;

    env: Record<string, PlatformFunction>;
    calls: Record<string, PlatformFunction>;

    events: Record<string, any>;

    _af_id: number;

    constructor() {
        this.wasm;
        this.canvas_id = 'lu5-canvas';
        this.fd = [];

        this.l5 = null;

        this.ctx = null;
        this.gl = null;

        this.memory = null;
        this.view = null;

        this.lastTime = 0;

        this.mouseX = 0;
        this.mouseY = 0;

        this.loop = true;
        this.frame = undefined;
        this.debug_tag = undefined;

        this.depth_mode = 0;

        this.events = {};

        this._af_id = 0;
    }

    colorToHex = colorToHex.bind(this);
    colorToRGBA = colorToRGBA.bind(this);

    write(fd: number, method: string, msg: string) {
        const handlers = this.fd[fd];
        if (!handlers) return;
        handlers.forEach((c: Record<string, any>) => {
            if (c[method]) {
                c[method](msg);
            }
        });
    }

    static err_prefix = '\x1b[30;41m ERROR \x1b[0m';
    error(msg: string) {
        // Replace prefix
        msg = msg.replace(/\[string ".*?"\]:(\d+):/g, (_, linenumber) => `line ${linenumber}: `);

        // Add error prefix if not found
        if (!msg.includes(LU5.err_prefix)) msg = `${LU5.err_prefix} ${msg}`;

        // Write error
        this.write(2, 'error', msg);
    }
    log(msg: string) { this.write(1, 'log', msg) }
    warn(msg: string) { this.write(1, 'warn', msg) }
    clear() {
        // Clear all attached fds
        this.fd.forEach(fd => (fd) ? fd.forEach(c => c.clear()) : 0);
        return this;
    }

    handle_exception(e: any) {
        if (e instanceof WebAssembly.RuntimeError) {
            if (!e.message.includes('unreachable')) {
                this.log(e.message);
                this.log(e.stack);
            } else {
                // Unrechable, currently reachable since setjmp/longjmp 
                // do not work in wasi-libc
            }
        } else if (e instanceof WebAssembly.Exception) {
            if (e.is(this.debug_tag)) {
                this.error(e.getArg(this.debug_tag, 0));
            } else {
                this.error('Unknown exception');
            }
        } else {
            this.error((e as any).toString());
        }

        // Stop script
        this.loop = false;

        // Clear memory and remove event listeners
        if (this.l5) {
            this.calls._lu5_close(this.l5);

            document.removeEventListener('wheel', this.events.handleWheel);
            document.removeEventListener('keydown', this.events.handleKeydown);
            document.removeEventListener('keyup', this.events.handleKeyup);

            // Remove all canvas event listeners
            if (this.ctx && this.ctx.canvas.parentNode) {
                let new_element = this.ctx.canvas.cloneNode(true);
                this.ctx.canvas.parentNode.replaceChild(new_element, this.ctx.canvas);
            }
        }
    }

    static wrap_calls(vm: LU5) {
        const methods: Record<string, PlatformFunction> = {};
        for (const [name, method] of Object.entries(vm.wasm.exports)) {
            methods[name] = function () {
                try {
                    return (method as PlatformFunction)(...arguments);
                } catch (e) {
                    vm.handle_exception(e);
                }
            }
        }
        return methods;
    }

    static env = {
        getTempRet0() { return 0 },
        saveSetjmp() {
            // // TODO: Figure this out to catch exceptions
            // console.log('saveSetjmp',...arguments);
            return 0
        },
        testSetjmp() {
            // // TODO: Figure this out to catch exceptions
            // console.log('testSetjmp', ...arguments);
            return 0
        }
    }

    refreshMemory() {
        if (this.memory) if (this.view === null || this.view.buffer.byteLength === 0) {
            this.view = new DataView(this.memory.buffer);
        }
    }

    static async compile(lu5_wasm_path: string = LU5_WASM_CDN): Promise<WebAssembly.Module> {
        const response = await fetch(lu5_wasm_path);
        const buffer = await response.arrayBuffer();
        return await WebAssembly.compile(buffer);
    }

    static async instantiate(module: WebAssembly.Module) {
        const lu5 = new LU5();

        lu5.debug_tag = new WebAssembly.Tag({ parameters: ["i32"] });

        const tagToIndexMap = new Map();
        tagToIndexMap.set(lu5.debug_tag, 0);

        lu5.wasm = await WebAssembly.instantiate(module, {
            env: {
                ...makeEnv(lu5, lu5_bindings_unimplemented, bindings),
                ...LU5.env
            },
            wasi_snapshot_preview1: makeEnv(lu5, wasi_snapshot_preview1_unimplemented, wasi_snapshot_preview1)
        }) as WebAssemblyInstance

        lu5.memory = lu5.wasm.exports.memory as WebAssembly.Memory;

        lu5.calls = LU5.wrap_calls(lu5);

        return lu5;
    }

    async attach(fd: number | string, console?: LU5Console) {
        if (typeof fd === 'string') {
            switch (fd) {
                case 'stdout': fd = 1; break;
                case 'stderr': fd = 2; break;
                default: fd = 3; break;
            }
        }
        if (this.fd[fd] === undefined)
            this.fd[fd] = [];

        this.fd[fd].push(console);

        return this;
    }

    async setCanvas(id?: string) {
        this.canvas_id = id || undefined;

        return this;
    }

    handleWheel(e: WheelEvent) {
        if (!this.wasm) return;
        this.calls._lu5_mouse_scroll_callback(null,
            (e.deltaX > 0) ? 1 : -1,
            (e.deltaY > 0) ? 1 : -1
        )
    };

    handleKeydown(e: KeyboardEvent) {
        if (!this.wasm) return;
        this.calls._lu5_key_callback(
            null,
            (glfw.fromKeyCode[e.keyCode as never] || 0) as number,
            e.key,  // Use scan code to map with Name later in glfwGetKetName
            e.repeat ? glfw.REPEAT : glfw.PRESS,
            glfw.fromKeyboardEvent(e)
        )
    }

    handleKeyup(e: KeyboardEvent) {
        if (!this.wasm) return;
        this.calls._lu5_key_callback(
            null,
            (glfw.fromKeyCode[e.keyCode as never] || 0) as number,
            e.key,  // Use scan code to map with Name later in glfwGetKetName
            glfw.RELEASE,
            glfw.fromKeyboardEvent(e)
        )
    }

    handleMousemove(e: MouseEvent|TouchEvent) {
        if (!this.wasm) return;
        const rect = this.ctx.canvas.getBoundingClientRect();

        if (e instanceof MouseEvent) {
            this.mouseX = Math.round(e.clientX - rect.left);
            this.mouseY = Math.round(e.clientY - rect.top);
        } else {
            this.mouseX = Math.round(e.changedTouches[0].clientX - rect.left);
            this.mouseY = Math.round(e.changedTouches[0].clientY - rect.top);    
        }

        this.calls._lu5_mouse_cursor_callback(null, this.mouseX, this.mouseY);
    }

    handleMousedown(e: MouseEvent|TouchEvent) {
        if (!this.wasm) return;

        if (!(e instanceof MouseEvent)) {
            const rect = this.ctx.canvas.getBoundingClientRect();
            console.log(e);
            this.mouseX = Math.round(e.changedTouches[0].clientX - rect.left);
            this.mouseY = Math.round(e.changedTouches[0].clientY - rect.top); 
        }
        
        this.calls._lu5_mouse_button_callback(null, e instanceof MouseEvent ? e.button : 0, 1, 0)
    }

    handleMouseup(e: MouseEvent|TouchEvent) {
        if (!this.wasm) return;

        if (!(e instanceof MouseEvent)) {
            const rect = this.ctx.canvas.getBoundingClientRect();
            this.mouseX = Math.round(e.changedTouches[0].clientX - rect.left);
            this.mouseY = Math.round(e.changedTouches[0].clientY - rect.top); 
        }

        this.calls._lu5_mouse_button_callback(null, e instanceof MouseEvent ? e.button : 0, 0, 0);
    }

    #run(source: string, done: () => void = () => { }): void {
        if (!this.wasm) {
            this.warn('lu5 wasm hasn\'t loaded yet.');
            return;
        }

        if (!this.l5) {
            Object.defineProperty(this, 'l5', {
                writable: false,
                value: this.calls._lu5_get_handle()
            });

            // init when running for the first time
            this.calls._lu5_init(this.l5);
        }

        // Allocate memory for lua source
        const source_ptr = this.calls.malloc(source.length + 1);

        // Set lua source in memory
        write_cstr(this.memory, source_ptr, source);

        if (!this.l5) {
            this.calls.free(source_ptr);
            return;
        };

        switch (this.calls._lu5_setup(this.l5, null, source_ptr)) {
            case 0:
                const target_fps = this.view.getInt32(this.l5 + 8, true);
                let elapsed = 0;
                let fpsInterval = 1000 / (target_fps);
                let now = window.performance.now();
                let then_real = window.performance.now();
                let then = window.performance.now();

                // Single frame call
                this.frame = (function (this: LU5, timestamp: number) {
                    now = timestamp || window.performance.now();
                    elapsed = now - then;
                    fpsInterval = 1000 / target_fps;
                    
                    const epsilon = 5;
                    if (!this.loop || elapsed > fpsInterval-epsilon) {

                        const deltaTime = now - then_real;

                        // Call Draw
                        this.calls._lu5_animation_frame(this.l5, deltaTime / 1000);
                        
                        then = Math.max(then + elapsed, now);
                        then_real = now;
                    }

                    if (this.loop) {
                        this._af_id = requestAnimationFrame(this.frame);
                    }

                }).bind(this);

                this._af_id = requestAnimationFrame(this.frame);
                break;
            case undefined: case 1: default:
                this.calls.free(source_ptr);
                done();
                return;
        }
    }

    execute(source: string): Promise<LU5> {
        return new Promise(res => {
            this.#run(source, () => res(this));
        })
    }

    async reset() {
        this.loop = false;

        window.cancelAnimationFrame(this._af_id);

        await new Promise(r => setTimeout(() => {
            if (!this.wasm) {
                r(undefined);
                return;
            }

            if (this.l5) {
                this.calls._lu5_close(this.l5);
            }

            if (this.ctx && !this.canvas_id) {
                this.ctx.canvas.remove();
            } else if (this.ctx) {
                this.ctx.canvas.style.display = 'none';
            }

            this.fd = [];

            delete this.wasm;
            r(undefined);
        }));

        return this;
    }
}