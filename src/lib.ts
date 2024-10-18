
import { LU5_WASM_CDN } from "./env";
import { LU5 } from "./lu5";

declare global {
    interface Window {
        _get_or_create_by_id: (t: string, id: string) => HTMLElement;
        lu5: {
            compile?: (wasm_path?: string) => Promise<WebAssembly.Module>
            instantiate?: (module: WebAssembly.Module) => Promise<LU5>;
            init?: (wasm_path?: string) => Promise<LU5>
            Console?: any;
        }
        readonly _lu5_instantiate_script: Element;
    }
}

export const init = (wasm_path:string = LU5_WASM_CDN) => LU5.compile(wasm_path).then(module => LU5.instantiate(module));

export const compile = LU5.compile;

export const instantiate = LU5.instantiate;

export type { LU5 };