import { LU5 } from "./lu5";
import { get_script } from "./common/script";
import { LU5_WASM_CDN } from "./env";

if (window && document) {
    // Object.defineProperty(window, '_lu5_instantiate_script', {
    //     value: document.currentScript,
    //     writable: false
    // });
    
    window.onload = () => {
        let wasm_bin_path = LU5_WASM_CDN;

        // // Use wasm attribute to determine lu5 wasm binary url,
        // // default is passed argument
        // if (window._lu5_instantiate_script.hasAttribute('wasm')) {
        //     wasm_bin_path = window._lu5_instantiate_script.getAttribute('wasm');
        // }

        // Start lu5
        LU5.compile(wasm_bin_path)
            .then(mod => LU5.instantiate(mod))
            .then(vm => vm.attach(1, console as never))
            .then(vm => vm.attach(2, console as never))
            .then(async vm => {
                // Find lua script
                const { id, source } = await get_script();

                // Set canvas and execute
                return vm.setCanvas(id).then(vm => vm.execute(source));
            })
            .catch(console.error);
    };
}

export * from './lib'