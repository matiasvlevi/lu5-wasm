import { 
    lu5_bindings_unimplemented, 
    wasi_snapshot_preview1_unimplemented 
} from "./unimplemented";
import { type PlatformFunction } from "./types";

import * as wasi_snapshot_preview1 from "./wasi";
import * as bindings from './platform/index'
import { write_cstr } from "./memory";
import { colorToRGBA } from "./color";

export class LU5 {
    readonly l5: number | null;
    canvas_id: string | null;
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
    frame: () => any | undefined;

    env: Record<string, PlatformFunction>;

    constructor() {
        this.canvas_id = null;

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
        this.frame = undefined;

        this.depth_mode = 0;

        this.env = {
            getTempRet0() { return 0 },
            saveSetjmp(_ptr: number) { return 0 },
            testSetjmp(_ptr: number, _v: number) { return 0 }
        }

    }

    colorToRGBA = colorToRGBA.bind(this);

    refreshMemory() {
        if (this.memory) if (this.view === null || this.view.buffer.byteLength === 0) {
            this.view = new DataView(this.memory.buffer);
        }
    }

    static makeEnv(bind: LU5, symbols: string[], implemented: Record<string, PlatformFunction>) {
        const env: Record<string, PlatformFunction> = {};
        const syms = [...new Set([...symbols, ...Object.keys(implemented)])];
        for (let sym of syms) {
            env[sym] = (implemented[sym] == undefined) ?
                (() => 0) :
                implemented[sym].bind(bind) ;
        }
        return env;
    }

    instantiate(lu5_wasm_path: string) {
        return WebAssembly.instantiateStreaming(fetch(lu5_wasm_path), {
            env: {
                ...LU5.makeEnv(this, lu5_bindings_unimplemented, bindings),
                ...this.env
            },
            wasi_snapshot_preview1: LU5.makeEnv(this, wasi_snapshot_preview1_unimplemented, wasi_snapshot_preview1)
        })
            .then((w) => {
                this.wasm = w;
                this.memory = w.instance.exports.memory as WebAssembly.Memory;
                return this;
            });
    }

    #run(source: string, done: () => void = () => {}): void {
        if (this.wasm === null || !this.wasm.instance) {
            console.warn('lu5 wasm hasn\'t loaded yet.');
            return;
        }

        const malloc = this.wasm.instance.exports.malloc as PlatformFunction;
        const free = this.wasm.instance.exports.free as PlatformFunction;

        const _lu5_get_handle = this.wasm.instance.exports._lu5_get_handle as PlatformFunction;
        const _lu5_init = this.wasm.instance.exports._lu5_init as PlatformFunction;
        const _lu5_setup = this.wasm.instance.exports._lu5_setup as PlatformFunction;
        const _lu5_frame = this.wasm.instance.exports._lu5_animation_frame as PlatformFunction;

        if (!this.l5) {
            Object.defineProperty(this, 'l5', {
                writable: false,
                value: _lu5_get_handle()
            });

            // init when running for the first time
            _lu5_init(this.l5);
        }
        
        // Allocate memory for lua source
        const source_ptr = malloc(source.length);

        // Set lua source in memory
        write_cstr(this.memory, source_ptr, source);
        if (!this.l5) {
            free(source_ptr);
            return;
        };

        switch (_lu5_setup(this.l5, null, source_ptr)) {
            case 0:
                let lastTime = 0;
                // Single frame call
                this.frame = ((timestamp: number) => {
                    const deltaTime = (timestamp - lastTime) / 1000;

                    _lu5_frame(this.l5, deltaTime);

                    lastTime = timestamp;

                    if (this.loop) {
                        requestAnimationFrame(this.frame);
                    }
                }).bind(this);

                requestAnimationFrame(this.frame);
                break;
            case 1:
            default:
                free(source_ptr);
                done();
                return;
        }
    }

    execute(source: string): Promise<LU5> {
        return new Promise(res => {
            this.#run(source, () => res(this));
        })
    }

    reset() {
        if (!this.wasm) return this;

        const _lu5_close = this.wasm.instance.exports._lu5_close as PlatformFunction;

        if (this.l5) {
            _lu5_close(this.l5);
            Object.defineProperty(this, 'l5', { value: null, writable: false });
        }

        if (this.ctx) {
            this.ctx.canvas.remove();
        }

        return this;
    }
}