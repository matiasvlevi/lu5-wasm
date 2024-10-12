import { LU5 } from "./lu5";
import { get_script } from "./common/script";
import { get_or_create_by_id } from "./common/dom";
import { LU5Console } from "./console";

declare global {
    interface Window {
        _get_or_create_by_id: (t: string, id: string) => HTMLElement;
        lu5: {
            compile: (wasm_path?: string) => Promise<WebAssembly.Module>
            instantiate: (module: WebAssembly.Module) => Promise<LU5>;
            init: (wasm_path?: string) => Promise<LU5>
            Console: LU5Console;
        }
        readonly _lu5_instantiate_script: Element;
    }
}

Object.defineProperty(window, '_lu5_instantiate_script', {
    value: document.currentScript,
    writable: false
});

const DEV = false;
const LU5_WASM_CDN = DEV ? '../dist/lu5.wasm' : `https://unpkg.com/lu5-wasm@latest/dist/lu5.wasm`;

window._get_or_create_by_id = get_or_create_by_id

// If included as a library, leak this function to the global scope.
if (document.currentScript.hasAttribute('lib')) {
    window.lu5 = {
        init: (wasm_path: string = LU5_WASM_CDN) => LU5.compile(wasm_path).then(module => LU5.instantiate(module)),
        compile: (wasm_path: string = LU5_WASM_CDN) => LU5.compile(wasm_path),
        instantiate: (module: WebAssembly.Module) => LU5.instantiate(module),
        Console: class {
            constructor() {
                console.warn("`lu5-console` is required to use the DOM console emulator");
                return null;
            }
        } as never as LU5Console
    }
} else {
    window.onload = () => {
        let wasm_bin_path = LU5_WASM_CDN;

        // Use wasm attribute to determine lu5 wasm binary url,
        // default is passed argument
        if (window._lu5_instantiate_script.hasAttribute('wasm')) {
            wasm_bin_path = window._lu5_instantiate_script.getAttribute('wasm');
        }

        // Start lu5
        LU5.compile(wasm_bin_path)
            .then(mod => LU5.instantiate(mod))
            .then(vm => vm.attach(1, console as never as LU5Console))
            .then(vm => vm.attach(2, console as never as LU5Console))
            .then(async vm => {
                // Find lua script
                const { id, source } = await get_script();

                // Set canvas and execute
                return vm.setCanvas(id).then(vm => vm.execute(source));
            })
            .catch(console.error);
    };
}
