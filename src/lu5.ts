import { lu5_bindings_expected, wasi_snapshot_preview1_expected } from "./expected";
import { type PlatformFunction } from "./types";


import * as wasi_snapshot_preview1 from "./wasi";
import * as bindings from './platform/index'

declare global {
    interface Window {
        lu5: LU5;
    }
}

export class LU5 {
    readonly l5: number | null;
    wasm: WebAssembly.WebAssemblyInstantiatedSource | null;

    ctx: CanvasRenderingContext2D | null;
    gl: WebGLRenderingContext | null;

    memory: WebAssembly.Memory | null;
    view: DataView | null;

    lastTime: number;

    mouseX: number;
    mouseY: number;

    depth_mode: number;
    
    loop: boolean;

    env: Record<string, PlatformFunction>;

    constructor() {
        this.l5 = null;
        this.wasm = null;
        this.ctx = null;
        this.gl = null;

        this.memory = null;
        this.view = null;

        this.lastTime = 0;

        this.mouseX = 0;
        this.mouseY = 0;

        this.loop = true;

        this.depth_mode = 0;

        this.env = {
            getTempRet0() { return 0 },
            saveSetjmp(_ptr: number) { return 0 },
            testSetjmp(_ptr: number, _v: number) { return 0 }
        }
    }

    static makeEnv(bind: LU5, symbols: string[], implemented: Record<string, PlatformFunction>) {
        
        const env: Record<string, PlatformFunction> = {};
        for (let sym of symbols) {
            env[sym] = (implemented[sym] != undefined) ?
                implemented[sym].bind(bind) :
                (() => 0);
        }
        return env;
    }

    get_cstr(ptr: number, len?: number): string {
        if (!this.memory) return '';
        if (len !== undefined) {
            let str_buffer = new Uint8Array(this.memory.buffer, ptr, len);
            return new TextDecoder().decode(str_buffer);
        }

        // Null terminated
        let str_buffer = new Uint8Array(this.memory.buffer, ptr, this.memory.buffer.byteLength - ptr);
        return new TextDecoder().decode(
            str_buffer.subarray(0, str_buffer.indexOf(0))
        );
    }

    write_cstr(ptr: number, str_value: string): void {
        if (!this.memory) return;
        let encoder = new TextEncoder();
        let encodedString = encoder.encode(str_value);
        let i8 = new Uint8Array(this.memory.buffer);

        if ((ptr + str_value.length) >= this.memory.buffer.byteLength) {
            console.error('Memory overflow');
            return;
        }

        i8.set(encodedString, ptr);
    }

    static bytesToNumber(bytes: Uint8Array): number {
        let result = 0;
        for (let x of bytes.reverse()) {
            result = result * 0x100 + x;
        }
        return result;
    }

    deref(ptr: number, length: number): Uint8Array {
        if (!this.memory) 
            return new Uint8Array(0);
        else 
            return new Uint8Array(this.memory.buffer, ptr, length);
    }

    colorToRGBA(ptr: number) {
        this.refreshMemory();
        if (!this.view) return '#000';

        const alpha = this.view.getUint8(ptr);
        if (alpha == 0) return '#000';
        return '#' +
            this.view.getUint8(ptr + 3).toString(16).padStart(2)+
            this.view.getUint8(ptr + 2).toString(16).padStart(2)+
            this.view.getUint8(ptr + 1).toString(16).padStart(2)+
            alpha.toString(16).padStart(2);
        
    }

    refreshMemory() {
        if (this.memory) if (this.view === null || this.view.buffer.byteLength === 0) {
            this.view = new DataView(this.memory.buffer);
        }
    }

    setMemory(m: any) {
        this.memory = m;
    }

    static async get_script_source(script: Element) {
        let src = script.getAttribute('src');
        if (src) {
            return fetch(src).then(r => r.text());
        } else {
            return script.textContent;
        }
    }

    static get_scripts() {
        const scripts = document.querySelectorAll('script[type="text/lua"]');

        return Array.from(scripts).map(script => {
            return {
                src: script.getAttribute('src'),
                canvas: script.getAttribute('canvas'),
                content: LU5.get_script_source(script)
            }
        })
    }

    async get_script(): Promise<string> {
        const scripts = LU5.get_scripts();
        const content = await scripts[0].content;
        return content ? new Promise((r) => r(content)) : '';
    }

    instantiate(lu5_wasm_path: string) {
        return WebAssembly.instantiateStreaming(fetch(lu5_wasm_path), {
            env: {
                ...LU5.makeEnv(this, lu5_bindings_expected, bindings),
                ...this.env
            },
            wasi_snapshot_preview1: LU5.makeEnv(this, wasi_snapshot_preview1_expected, wasi_snapshot_preview1)
        })
            .then((w) => {
                this.wasm = w;
                this.setMemory(w.instance.exports.memory);
                return w;
            });
    }

    vm(source: string): void {
        if (this.wasm === null || !this.wasm.instance) {
            console.warn('lu5 wasm hasn\'t loaded yet.')
            return;
        }

        const malloc = this.wasm.instance.exports.malloc as PlatformFunction;
        const _lu5_get_handle = this.wasm.instance.exports._lu5_get_handle as PlatformFunction;
        const _lu5_setup = this.wasm.instance.exports._lu5_setup as PlatformFunction;
        const _lu5_frame = this.wasm.instance.exports._lu5_animation_frame as PlatformFunction;

        Object.defineProperty(this, 'l5', {
            writable: false,
            value: _lu5_get_handle()
        });

        // Allocate memory for lua source
        const source_ptr = malloc(source.length);

        // Set lua source in memory
        this.write_cstr(source_ptr, source);
        if (!this.l5) return;

        switch (_lu5_setup(this.l5, null, source_ptr)) {
            case 0:
                let lastTime = 0;
                // Single frame call
                const frame = ((timestamp: number) => {
                    const deltaTime = (timestamp - lastTime) / 1000;

                    _lu5_frame(this.l5, deltaTime);

                    lastTime = timestamp;

                    if (this.loop)
                        requestAnimationFrame(frame);
                }).bind(this);

                requestAnimationFrame(frame);
                break;
            case 1:
            default:
                this.reset();
                return;
        }
    }

    reset() {
        if (!this.wasm) return;

        const _lu5_close = this.wasm.instance.exports._lu5_close as PlatformFunction;

        if (this.l5)
            _lu5_close(this.l5);

        if (this.ctx) {
            this.ctx.canvas.remove();
        }
    }
}