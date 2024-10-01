import { get_cstr } from "../../memory";
import * as glfw from "../../glfw";
import { LU5 } from "../../lu5";

export function lu5_createWindow(this: LU5, _L: number, w: number, h: number, _title_ptr: number, mode: number): number {
    if (!this.wasm) return 0;

    this.depth_mode = mode;
    if (mode == 1) {
        console.warn('3D Mode is not supported in lu5-wasm yet.');
        return 0;
    }

    // Get or create
    let canvas = Array.from(document.querySelectorAll('canvas'))
        .filter(c => c.getAttribute('id') === this.canvas_id)[0];
    if (!canvas) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }

    // Set canvas id if provided
    if (this.canvas_id)
        canvas.setAttribute('id', this.canvas_id);

    // Set dimensions
    canvas.width = w;
    canvas.height = h;
    canvas.style.display = 'block';

    // Bind Events
    document.addEventListener('wheel', (e) =>
        this.wasm.instance.exports._lu5_mouse_scroll_callback(null,
            (e.deltaX > 0) ? 1 : -1,
            (e.deltaY > 0) ? 1 : -1
        )
    );
    document.addEventListener('keydown', (e) => {
        this.wasm.instance.exports._lu5_key_callback(
            null,
            (glfw.fromKeyCode[e.keyCode as never] || 0) as number,
            e.key,  // Use scan code to map with Name later in glfwGetKetName
            e.repeat ? glfw.REPEAT : glfw.PRESS,
            glfw.fromKeyboardEvent(e)
        )
    });
    document.addEventListener('keyup', (e) => {
        this.wasm.instance.exports._lu5_key_callback(
            null,
            (glfw.fromKeyCode[e.keyCode as never] || 0) as number,
            e.key,  // Use scan code to map with Name later in glfwGetKetName
            glfw.RELEASE,
            glfw.fromKeyboardEvent(e)
        )
    });
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();

        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        this.wasm.instance.exports._lu5_mouse_cursor_callback(null, this.mouseX, this.mouseY);
    });
    canvas.addEventListener('mousedown', (e) =>
        this.wasm.instance.exports._lu5_mouse_button_callback(null, e.button, 1, 0)
    );
    canvas.addEventListener('mouseup', (e) =>
        this.wasm.instance.exports._lu5_mouse_button_callback(null, e.button, 0, 0)
    );

    // Set rendering context
    switch (mode) {
        case 0: this.ctx = canvas.getContext('2d'); break;
        case 1: this.gl = canvas.getContext('webgl'); break;
        default: break;
    }

    return 0;
}

export function lu5_background(this: LU5, color: number) {
    switch (this.depth_mode) {
        case 0:
            if (!this.ctx) break;
            this.ctx.fillStyle = this.colorToRGBA(color);
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fill();
            break;
        case 1:
            if (!this.gl) break;
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            break;
        default:
            break;
    }
}

export function lu5_glBegin(this: LU5, _mode: number) {
    if (!this.ctx) return;
    this.ctx.beginPath();
}

export function lu5_glVertex(this: LU5, x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y);
}

export function lu5_glEnd(this: LU5) {
    if (!this.ctx) return;
    this.ctx.closePath();
}

export function lu5_render_ellipse(this: LU5, x: number, y: number, w: number, h: number, _segments: number, color: number) {
    if (!this.ctx) return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    this.ctx.fill();
}

export function lu5_render_triangle_fill(this: LU5,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    color: number
) {
    return 0;
}

export function lu5_render_ring(this: LU5, x: number, y: number, inner_radius_h: number, inner_radius_w: number, strokeWeight: number, _segments: number, color: number) {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, inner_radius_w, inner_radius_h, 0, 0, 2 * Math.PI);
    this.ctx.lineWidth = strokeWeight;
    this.ctx.stroke();
}

export function lu5_render_arc_fill(this: LU5, x: number, y: number, rx: number, ry: number, start: number, end: number, _segments: number, color: number) {
    if (!this.ctx) return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, rx, ry, 0, start, end);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
}

export function lu5_render_arc_stroke(this: LU5, x: number, y: number, w: number, h: number, strokeWeight: number, start_angle: number, end_angle: number, _segments: number, color: number) {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, start_angle, end_angle);
    this.ctx.lineWidth = strokeWeight;
    this.ctx.stroke();
}

export function lu5_render_quad_fill(this: LU5, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number) {
    if (!this.ctx) return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.lineTo(x4, y4);
    this.ctx.closePath();
    this.ctx.fill();
}

export function lu5_render_quad_stroke(this: LU5, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, strokeWeight: number, color: number) {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.colorToRGBA(color);

    const px = Math.min(x1, x2, x3, x4);
    const py = Math.min(y1, y2, y3, y4);

    const w = Math.max(x1, x2, x3, x4) - px;
    const h = Math.max(y1, y2, y3, y4) - py;

    this.ctx.lineWidth = strokeWeight;
    this.ctx.strokeRect(px, py, w, h);
}

export function lu5_render_text(this: LU5, text_ptr: number, x: number, y: number, fontSize: number, textAlign: number, _font: number, color: number) {
    if (!this.ctx) return;

    const text = get_cstr(this.memory, text_ptr);

    switch (textAlign) {
        case 1: this.ctx.textAlign = "center"; break;
        case 2: this.ctx.textAlign = "right"; break;
        case 3: this.ctx.textAlign = "left"; break;
    };

    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.fillText(text, x, y);
}