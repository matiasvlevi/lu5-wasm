import { LU5 } from "../lu5";

export * from './geometry/2D'
export * from './geometry/3D'

export function lu5_getCursorPos(this: LU5, _window: number, mousex_ptr: number, mousey_ptr: number) {
    this.refreshMemory();

    if (this.view) {
        this.view.setFloat64(mousex_ptr, this.mouseX, true);
        this.view.setFloat64(mousey_ptr, this.mouseY, true);
    }
    return 0;
}

export function lu5_init_freetype() { return 0 };

export function lu5_close_fonts() { return 0 };

export function lu5_load_and_add_font(this: LU5, _lu5: number, _font_ptrptr: number, name_ptr: number) {
    console.warn(`'lu5_load_and_add_font' is not yet implemented...`);
}

export function lu5_set_font(this: LU5, fontname_ptr: number) {
    const name = this.get_cstr(fontname_ptr);
    console.warn(`Trying to set font ${name} but 'lu5_set_font' is not yet implemented...`);

    return 0;
}



export function lu5_load_default_font() { return 0 };

export function lu5_time_seed() {
    return Math.floor(Math.random() * 1000000);
}

