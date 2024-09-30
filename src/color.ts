import { LU5 } from "./lu5";

export function colorToRGBA(this:LU5, ptr: number) {
    this.refreshMemory();
    if (!this.view) return '#000';
    const alpha = this.view.getUint8(ptr);
    if (alpha == 0) return '#000';
    const color = '#' +
        this.view.getUint8(ptr + 3).toString(16).padStart(2, '0')+
        this.view.getUint8(ptr + 2).toString(16).padStart(2, '0')+
        this.view.getUint8(ptr + 1).toString(16).padStart(2, '0')+
        alpha.toString(16).padStart(2, '0');

    return color;
}