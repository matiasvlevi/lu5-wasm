import { LU5 } from "../lu5";
import { get_cstr } from "../memory";

export function lu5_load_and_add_font(this: LU5, _lu5: number, _font_name_ptr: number) 
{
    this.warn(`Calling \x1b[90m'loadFont'\x1b[0m on the Web is ignored. Instead, use textFont directly.`)

    return 1;
}

export function lu5_set_font(this: LU5, fontname_ptr: number) {
    const name = get_cstr(this.memory, fontname_ptr);
    this.ctx.font = `${this.ctx.font.split(' ')[0]} ${name}`;
    return 0;
}