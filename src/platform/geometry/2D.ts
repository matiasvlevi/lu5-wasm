import { get_cstr } from "../../memory";
import { LU5 } from "../../lu5";

export function lu5_render_quad(this: LU5,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number,
    strokeWeight: number,
    fill: number,
    stroke: number) {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.colorToHex(fill);

    this.ctx.strokeStyle = this.colorToHex(stroke);
    this.ctx.lineWidth = strokeWeight;

    this.ctx.beginPath();

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.lineTo(x4, y4);
    this.ctx.closePath();

    this.ctx.stroke();

    this.ctx.fill();
}

export function lu5_render_line(this: LU5,
    x1: number, y1: number,
    x2: number, y2: number,
    strokeWeight: number,
    stroke: number) {
    if (!this.ctx) return;

    this.ctx.lineWidth = strokeWeight * 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.colorToHex(stroke);

    this.ctx.beginPath();

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    this.ctx.stroke();
}

export function lu5_render_ellipse(this: LU5,
    x: number, y: number,
    h: number, w: number,
    strokeWeight: number,
    fill: number,
    stroke: number,
    _segments: number) {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.colorToHex(fill);
    this.ctx.strokeStyle = this.colorToHex(stroke);

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    this.ctx.lineWidth = strokeWeight;
    this.ctx.stroke();
    this.ctx.fill();
}

export function lu5_render_ellipse_fill(this: LU5,
    x: number, y: number,
    w: number, h: number,
    color: number,
    _segments: number) 
{
    if (!this.ctx) return;

    this.ctx.fillStyle = this.colorToHex(color);

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    this.ctx.fill();
}

export function lu5_render_arc(this: LU5,
    x: number, y: number,
    rx: number, ry: number,
    strokeWeight: number,
    start_angle: number, end_angle: number,
    _segments: number,
    fill: number,
    stroke: number) {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.colorToHex(fill);
    this.ctx.strokeStyle = this.colorToHex(stroke);
    this.ctx.lineWidth = strokeWeight;

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, rx, ry, 0, start_angle, end_angle);
    this.ctx.stroke();
    
    this.ctx.lineTo(x, y);
    this.ctx.closePath();

    this.ctx.fill();
}

export function lu5_render_text(this: LU5,
    text_ptr: number,
    x: number, y: number,
    fontSize: number,
    textAlign: number,
    _font: number,
    color: number) {
    if (!this.ctx) return;

    const text = get_cstr(this.memory, text_ptr);

    switch (textAlign) {
        case 1: this.ctx.textAlign = "center"; break;
        case 2: this.ctx.textAlign = "right"; break;
        case 3: this.ctx.textAlign = "left"; break;
    };

    this.ctx.font = `${fontSize}px ${this.ctx.font.split(' ')[1]}`;
    this.ctx.fillStyle = this.colorToHex(color);
    this.ctx.fillText(text, x, y - 4);
}

export function lu5_render_triangle_fill(this: LU5,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    color: number) {
    if (!this.ctx) return;

    this.ctx.beginPath();

    this.ctx.fillStyle = this.colorToHex(color);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    return 0;
}

/**
 * custom shapes
 */
let is_first_vertex = true;

export function lu5_glBegin(this: LU5, _mode: number, color: number) {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.colorToHex(color);
    this.ctx.beginPath();

}

export function lu5_glVertex2(this: LU5, x: number, y: number) {
    if (!this.ctx) return;

    if (is_first_vertex) {
        this.ctx.moveTo(x, y);
        is_first_vertex = false;
    } else {
        this.ctx.lineTo(x, y);
    }
}

export function lu5_glEnd(this: LU5) {
    if (!this.ctx) return;
    this.ctx.closePath();
    is_first_vertex = true;
    this.ctx.fill();
    this.ctx.stroke();
}