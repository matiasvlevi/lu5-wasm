import { LU5 } from "../lu5";

export async function lu5_open_file(this: LU5, file_path_ptr: number, mode_str_ptr: number) {
    this.warn('File I/O is not supported in lu5-wasm yet');
    return 0;
}

export async function lu5_read_file(this: LU5, file_path_ptr: number, file_size_ptr: number, err_ptr: number) {
    this.warn('File I/O is not supported in lu5-wasm yet');
    return 0;
}

export function lu5_write_file() {
    this.warn('File I/O is not supported in lu5-wasm yet');
    return 0;
}