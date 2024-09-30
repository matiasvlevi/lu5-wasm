import { LU5 } from "./lu5";
import { get_script } from "./script";

declare global {
    interface Window {
        lu5: {
            init: (path: string) => Promise<LU5>;
        }
        readonly _lu5_instantiate_script: Element;
    }
}

Object.defineProperty(window, '_lu5_instantiate_script', { 
    value: document.currentScript, 
    writable: false,
    configurable: false
});

// If included as a library, leak this function to the global scope.
if (document.currentScript.hasAttribute('lib')) {
    window.lu5 = {
        init: (wasm_path: string) => (new LU5()).instantiate(wasm_path)
    }
} else {
    window.onload = () => init();
}

export function init(wasm_bin_path: string = `https://unpkg.com/lu5-wasm@latest/dist/lu5.wasm`): Promise<void> 
{

    // Check if library was included with a wasm attribute
    if (!window._lu5_instantiate_script) {
        console.error('Could not find current lu5 script')
        return;
    }

    // Use wasm attribute to determine lu5 wasm binary url,
    // default is passed argument
    if (window._lu5_instantiate_script.hasAttribute('wasm')) {
        wasm_bin_path = window._lu5_instantiate_script.getAttribute('wasm');
    }

    // Start lu5
    const lu5 = new LU5();
    lu5.instantiate(wasm_bin_path)
        .then(_lu5 => get_script())
        .then(({ id, source }) => {
            lu5.canvas_id = id;
            lu5.execute(source);
        })
        .catch(console.error);
};
