import { get_cstr } from "../memory";
import { LU5 } from "../lu5";

export * from './geometry/2D'
export * from './image'

export function lu5_noLoop(this: LU5) {
    this.loop = false;
}

export function lu5_loop(this: LU5) {
    if (!this.loop) {
        requestAnimationFrame(this.frame);
    }

    this.loop = true;
}

export function lu5_getCursorPos(this: LU5, _window: number, mousex_ptr: number, mousey_ptr: number) {
    this.refreshMemory();

    if (this.view) {
        this.view.setFloat64(mousex_ptr, this.mouseX, true);
        this.view.setFloat64(mousey_ptr, this.mouseY, true);
    }
    return 0;
}

export async function lu5_read_file(this: LU5, file_path_ptr: number, file_size_ptr: number, err_ptr: number) {
    console.warn('File I/O is not supported in lu5-wasm yet');
    return 0;
}

export function lu5_write_file() {
    console.warn('File I/O is not supported in lu5-wasm yet');
    return 0;
}

export function lu5_load_and_add_font(this: LU5, _lu5: number, _font_ptrptr: number, name_ptr: number) {
    console.warn(`'lu5_load_and_add_font' is not yet implemented...`);
}

export function lu5_set_font(this: LU5, fontname_ptr: number) {
    const name = get_cstr(this.memory, fontname_ptr);
    console.warn(`Trying to set font ${name} but 'lu5_set_font' is not yet implemented...`);

    return 0;
}

export function lu5_time_seed() {
    return Math.floor(Math.random() * 1000000);
}

