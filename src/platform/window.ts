import { get_or_create_by_id, is_mobile } from "../common/dom";
import { LU5 } from "../lu5";

export function lu5_createWindow(this: LU5, _L: number, w: number, h: number, _title_ptr: number, mode: number): number 
{
    if (!this.wasm) return 0;

    this.depth_mode = mode;
    if (mode == 1) {
        this.warn('3D Mode is not yet supported in lu5-wasm.');
        this.loop = false;
        return 0;
    }

    const canvas = get_or_create_by_id('canvas', this.canvas_id) as HTMLCanvasElement;
    canvas.style.display = 'inline';

    // Set dimensions
    canvas.width = w;
    canvas.height = h;

    // Set rendering context
    switch (mode) {
        case 0: this.ctx = canvas.getContext('2d'); break;
        case 1: this.gl = canvas.getContext('webgl'); break;
        default: break;
    }

    // Bind Events
    this.events['handleWheel'] = this.handleWheel.bind(this);
    document.addEventListener('wheel', this.events['handleWheel']);

    this.events['handleKeydown'] = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.events['handleKeydown']);
    
    this.events['handleKeyup'] = this.handleKeyup.bind(this);
    document.addEventListener('keyup', this.events['handleKeyup']);
    
    this.events['handleMousemove'] = this.handleMousemove.bind(this);
    this.events['handleMousedown'] = this.handleMousedown.bind(this);
    this.events['handleMouseup'] = this.handleMouseup.bind(this);

    const mobile = is_mobile();
    
    canvas.addEventListener(mobile ? 'touchmove' : 'mousemove', this.events['handleMousemove']);
    canvas.addEventListener(mobile ? 'touchstart' : 'mousedown', this.events['handleMousedown']);
    canvas.addEventListener(mobile ? 'touchend' : 'mouseup', this.events['handleMouseup']);

    return 0;
}

export function lu5_background(this: LU5, color: number) 
{
    switch (this.depth_mode) {
        case 0:
            if (!this.ctx) break;
            this.ctx.fillStyle = this.colorToHex(color);
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

export function lu5_getCursorPos(this: LU5, _window: number, mouseX_ptr: number, mouseY_ptr: number) 
{
    this.refreshMemory();

    if (this.view) {
        this.view.setFloat64(mouseX_ptr, this.mouseX, true);
        this.view.setFloat64(mouseY_ptr, this.mouseY, true);
    }
    return 0;
}

export function lu5_noLoop(this: LU5) 
{
    this.loop = false;
}

export function lu5_loop(this: LU5) 
{
    if (!this.loop) {
        requestAnimationFrame(this.frame);
    }

    this.loop = true;
}

export function lu5_time_seed() {
    return Math.floor(Math.random() * 1000000);
}
