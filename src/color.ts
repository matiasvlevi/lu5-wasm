import { LU5 } from "./lu5";

export function colorToHex(this:LU5, ptr: number) {
    this.refreshMemory();
    if (!this.view) return '#00000000';

    const alpha = this.view.getUint8(ptr);
    if (alpha == 0) return '#00000000';
    
    const color = '#' +
        this.view.getUint8(ptr + 3).toString(16).padStart(2, '0')+
        this.view.getUint8(ptr + 2).toString(16).padStart(2, '0')+
        this.view.getUint8(ptr + 1).toString(16).padStart(2, '0')+
        alpha.toString(16).padStart(2, '0');

    return color;
}

export function colorToRGBA(this:LU5, ptr: number) {
    this.refreshMemory();
    if (!this.view) return [0, 0, 0, 0];

    const alpha = this.view.getUint8(ptr);
    if (alpha == 0) return [0, 0, 0, 0];

    return [
        this.view.getUint8(ptr + 3),
        this.view.getUint8(ptr + 2),
        this.view.getUint8(ptr + 1),
        alpha
    ]
}