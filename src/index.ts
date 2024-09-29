import { LU5 } from "./lu5";

export function init(lu5_wasm_path: string): Promise<void> {
    const lu5 = new LU5();

    window.lu5 = lu5;
    
    return lu5.instantiate(lu5_wasm_path)
        .then(_ => lu5.get_script())
        .then(source => lu5.vm(source))
        .catch(console.error);
};

window.onload = async () => init('../../bin/wasm/lu5.wasm');