/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: init

// NAMESPACE OBJECT: ./src/wasi.ts
var wasi_namespaceObject = {};
__webpack_require__.r(wasi_namespaceObject);
__webpack_require__.d(wasi_namespaceObject, {
  clock_res_get: () => (clock_res_get),
  clock_time_get: () => (clock_time_get),
  fd_write: () => (fd_write)
});

// NAMESPACE OBJECT: ./src/platform/index.ts
var platform_namespaceObject = {};
__webpack_require__.r(platform_namespaceObject);
__webpack_require__.d(platform_namespaceObject, {
  lu5_background: () => (lu5_background),
  lu5_close_fonts: () => (lu5_close_fonts),
  lu5_createWindow: () => (lu5_createWindow),
  lu5_getCursorPos: () => (lu5_getCursorPos),
  lu5_glBegin: () => (lu5_glBegin),
  lu5_glEnd: () => (lu5_glEnd),
  lu5_glVertex: () => (lu5_glVertex),
  lu5_init_freetype: () => (lu5_init_freetype),
  lu5_load_and_add_font: () => (lu5_load_and_add_font),
  lu5_load_default_font: () => (lu5_load_default_font),
  lu5_loop: () => (lu5_loop),
  lu5_noLoop: () => (lu5_noLoop),
  lu5_render_arc_fill: () => (lu5_render_arc_fill),
  lu5_render_arc_stroke: () => (lu5_render_arc_stroke),
  lu5_render_box_edges: () => (lu5_render_box_edges),
  lu5_render_box_faces: () => (lu5_render_box_faces),
  lu5_render_cylinder_edges: () => (lu5_render_cylinder_edges),
  lu5_render_cylinder_faces: () => (lu5_render_cylinder_faces),
  lu5_render_debug: () => (lu5_render_debug),
  lu5_render_ellipse: () => (lu5_render_ellipse),
  lu5_render_plane_edges: () => (lu5_render_plane_edges),
  lu5_render_plane_faces: () => (lu5_render_plane_faces),
  lu5_render_quad_fill: () => (lu5_render_quad_fill),
  lu5_render_quad_stroke: () => (lu5_render_quad_stroke),
  lu5_render_ring: () => (lu5_render_ring),
  lu5_render_sphere_edges: () => (lu5_render_sphere_edges),
  lu5_render_sphere_faces: () => (lu5_render_sphere_faces),
  lu5_render_text: () => (lu5_render_text),
  lu5_render_torus_edges: () => (lu5_render_torus_edges),
  lu5_render_torus_faces: () => (lu5_render_torus_faces),
  lu5_set_font: () => (lu5_set_font),
  lu5_time_seed: () => (lu5_time_seed)
});

;// ./src/unimplemented.ts
const lu5_bindings_unimplemented = [
    'lu5_image_crop',
    'lu5_load_image',
    'lu5_render_image',
    'lu5_apply_color',
    'lu5_glVertex2'
];
const wasi_snapshot_preview1_unimplemented = [
    'args_get',
    'args_sizes_get',
    'environ_get',
    'environ_sizes_get',
    'fd_close',
    'fd_prestat_get',
    'fd_prestat_dir_name',
    'fd_read',
    'fd_seek',
    'proc_exit',
    'path_open',
    'path_unlink_file',
    'path_filestat_get',
    'path_filestat_set_times',
    'path_symlink',
    'path_link',
    'path_remove_directory',
    'poll_oneoff',
    'proc_raise',
    'sched_yield',
    'sock_send',
    'sock_recv',
    'sock_shutdown',
    'sock_close',
    'fd_fdstat_get',
    'fd_fdstat_set_flags',
    'fd_sync',
    'fd_allocate',
    'fd_advise',
    'path_rename',
    'path_open',
    'fd_filestat_get',
    'fd_filestat_set_times',
    'fd_filestat_set_size',
    'fd_filestat_set_times',
    'fd_renumber',
    'fd_datasync',
    'fd_pread',
    'fd_pwrite',
    'fd_readdir',
    'fd_fdstat_set_rights',
    'fd_tell',
    'path_create_directory',
    'path_readlink',
    'path_filestat_set_size',
    'sock_accept',
    'sock_bind',
    'sock_connect',
    'sock_listen',
    'sock_recvmsg',
    'sock_sendmsg',
    'sock_create',
    'sock_shutdown',
    'sock_recv',
    'sock_send',
];


;// ./src/wasi.ts
function fd_write(fd, iovecs, iovec_len, nwritten) {
    if (!this.memory)
        return;
    this.refreshMemory();
    const memory = this.memory.buffer;
    let totalBytesWritten = 0;
    const buffers = [];
    for (let i = 0; i < iovec_len; i++) {
        const iovec_ptr = iovecs + (i * 8);
        if (iovec_ptr < 0 || (iovec_ptr + 8) > memory.byteLength) {
            console.error(`fd_write: iovec_ptr (${iovec_ptr}) out of bounds at iovec index ${i}`);
            continue;
        }
        const ptr = this.view.getUint32(iovec_ptr, true);
        const size = this.view.getUint32(iovec_ptr + 4, true);
        if (ptr < 0 || (ptr + size) > memory.byteLength) {
            console.error(`fd_write: Data pointer (${ptr}) out of bounds or invalid size at iovec index ${i}`);
            continue;
        }
        if (size <= 0)
            continue;
        // Extract buffer data
        const buffer = new Uint8Array(this.memory.buffer, ptr, size);
        buffers.push(buffer);
        totalBytesWritten += size;
    }
    // Concatenate all buffers
    let combinedBuffer = new Uint8Array(totalBytesWritten);
    let offset = 0;
    buffers.forEach(buffer => {
        combinedBuffer.set(buffer, offset);
        offset += buffer.length;
    });
    let str = new TextDecoder().decode(combinedBuffer);
    // Log in console
    switch (fd) {
        case 1:
            console.log(str);
            break;
        case 2:
            console.error(str);
            break;
        default:
            console.error('fd_write: unknown file descriptor');
            return 1;
    }
    // Write the total written size at the specified location
    let writtenBytes = totalBytesWritten;
    if (this.view)
        this.view.setUint32(nwritten, writtenBytes, true);
    return writtenBytes;
}
function clock_res_get(_clockId, resolution) {
    if (this.view)
        this.view.setBigUint64(resolution, 1000n, true);
    return 0;
}
function clock_time_get(_clockId, _precision, time) {
    if (this.view)
        this.view.setBigUint64(time, BigInt(Date.now()) * 1000000n, true);
    return 0;
}

;// ./src/memory.ts
function get_cstr(mem, ptr, len) {
    if (!mem)
        return '';
    if (len !== undefined) {
        let str_buffer = new Uint8Array(mem.buffer, ptr, len);
        return new TextDecoder().decode(str_buffer);
    }
    // Null terminated
    let str_buffer = new Uint8Array(mem.buffer, ptr, mem.buffer.byteLength - ptr);
    return new TextDecoder().decode(str_buffer.subarray(0, str_buffer.indexOf(0)));
}
function write_cstr(mem, ptr, str_value) {
    if (!mem)
        return;
    let encoder = new TextEncoder();
    let encodedString = encoder.encode(str_value);
    // Add null terminator
    let nullTerminatedString = new Uint8Array(encodedString.length + 1);
    nullTerminatedString.set(encodedString);
    nullTerminatedString[encodedString.length] = 0; // null terminator
    let i8 = new Uint8Array(mem.buffer);
    // Check for buffer overflow
    if ((ptr + nullTerminatedString.length) >= mem.buffer.byteLength) {
        console.error('Memory overflow');
        return;
    }
    i8.set(nullTerminatedString, ptr);
}

;// ./src/glfw.ts
const RELEASE = 0;
const PRESS = 1;
const REPEAT = 2;
const MOD_SUPER = 0x0008;
const MOD_CONTROL = 0x0002;
/**
 * Get the GLFW mod bits from a KeyboardEvent
 *
 * @param e The event
 * @returns the GLFW mod bits
 */
const fromKeyboardEvent = (e) => (+e.metaKey << MOD_SUPER) |
    (+e.ctrlKey << MOD_CONTROL);
/**
 * KeyboardEvent keyCode to GLFW Key Map
 */
const fromKeyCode = {
    8: 259, // Backspace
    9: 258, // Tab
    13: 257, // Enter
    16: 340, // Shift (Left Shift)
    17: 341, // Ctrl (Left Ctrl)
    18: 342, // Alt (Left Alt)
    19: 284, // Pause
    20: 280, // Caps Lock
    27: 256, // Escape
    32: 32, // Space
    33: 266, // Page Up
    34: 267, // Page Down
    35: 269, // End
    36: 268, // Home
    37: 263, // Left Arrow
    38: 265, // Up Arrow
    39: 262, // Right Arrow
    40: 264, // Down Arrow
    45: 260, // Insert
    46: 261, // Delete
    48: 48, // 0
    49: 49, // 1
    50: 50, // 2
    51: 51, // 3
    52: 52, // 4
    53: 53, // 5
    54: 54, // 6
    55: 55, // 7
    56: 56, // 8
    57: 57, // 9
    65: 65, // A
    66: 66, // B
    67: 67, // C
    68: 68, // D
    69: 69, // E
    70: 70, // F
    71: 71, // G
    72: 72, // H
    73: 73, // I
    74: 74, // J
    75: 75, // K
    76: 76, // L
    77: 77, // M
    78: 78, // N
    79: 79, // O
    80: 80, // P
    81: 81, // Q
    82: 82, // R
    83: 83, // S
    84: 84, // T
    85: 85, // U
    86: 86, // V
    87: 87, // W
    88: 88, // X
    89: 89, // Y
    90: 90, // Z
    91: 343, // Left Super (Windows/Command key)
    92: 344, // Right Super (Windows/Command key)
    93: 348, // Menu
    96: 320, // Numpad 0
    97: 321, // Numpad 1
    98: 322, // Numpad 2
    99: 323, // Numpad 3
    100: 324, // Numpad 4
    101: 325, // Numpad 5
    102: 326, // Numpad 6
    103: 327, // Numpad 7
    104: 328, // Numpad 8
    105: 329, // Numpad 9
    106: 332, // Numpad Multiply
    107: 334, // Numpad Add
    109: 333, // Numpad Subtract
    110: 330, // Numpad Decimal
    111: 331, // Numpad Divide
    112: 290, // F1
    113: 291, // F2
    114: 292, // F3
    115: 293, // F4
    116: 294, // F5
    117: 295, // F6
    118: 296, // F7
    119: 297, // F8
    120: 298, // F9
    121: 299, // F10
    122: 300, // F11
    123: 301, // F12
    144: 282, // Num Lock
    145: 281, // Scroll Lock
    186: 59, // Semicolon (;)
    187: 61, // Equal (=)
    188: 44, // Comma (,)
    189: 45, // Minus (-)
    190: 46, // Period (.)
    191: 47, // Slash (/)
    192: 96, // Backtick (`)
    219: 91, // Left Bracket ([)
    220: 92, // Backslash (\)
    221: 93, // Right Bracket (])
    222: 39 // Apostrophe (')
};

;// ./src/platform/geometry/2D.ts


function lu5_createWindow(_L, w, h, _title_ptr, mode) {
    if (!this.wasm)
        return 0;
    this.depth_mode = mode;
    const _lu5_mouse_scroll_callback = this.wasm.instance.exports._lu5_mouse_scroll_callback;
    const _lu5_key_callback = this.wasm.instance.exports._lu5_key_callback;
    const _lu5_mouse_cursor_callback = this.wasm.instance.exports._lu5_mouse_cursor_callback;
    const _lu5_mouse_button_callback = this.wasm.instance.exports._lu5_mouse_button_callback;
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
    // Bind Events
    document.addEventListener('wheel', (e) => _lu5_mouse_scroll_callback(null, (e.deltaX > 0) ? 1 : -1, (e.deltaY > 0) ? 1 : -1));
    document.addEventListener('keydown', (e) => {
        _lu5_key_callback(null, (fromKeyCode[e.keyCode] || 0), e.key, // Use scan code to map with Name later in glfwGetKetName
        e.repeat ? REPEAT : PRESS, fromKeyboardEvent(e));
    });
    document.addEventListener('keyup', (e) => {
        _lu5_key_callback(null, (fromKeyCode[e.keyCode] || 0), e.key, // Use scan code to map with Name later in glfwGetKetName
        RELEASE, fromKeyboardEvent(e));
    });
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
        _lu5_mouse_cursor_callback(null, this.mouseX, this.mouseY);
    });
    canvas.addEventListener('mousedown', (e) => _lu5_mouse_button_callback(null, e.button, 1, 0));
    canvas.addEventListener('mouseup', (e) => _lu5_mouse_button_callback(null, e.button, 0, 0));
    // Set rendering context
    switch (mode) {
        case 0:
            this.ctx = canvas.getContext('2d');
            break;
        case 1:
            this.gl = canvas.getContext('webgl');
            break;
        default: break;
    }
    return 0;
}
function lu5_background(color) {
    switch (this.depth_mode) {
        case 0:
            if (!this.ctx)
                break;
            this.ctx.fillStyle = this.colorToRGBA(color);
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fill();
            break;
        case 1:
            if (!this.gl)
                break;
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            break;
        default:
            break;
    }
}
function lu5_glBegin(_mode) {
    if (!this.ctx)
        return;
    this.ctx.beginPath();
}
function lu5_glVertex(x, y) {
    if (!this.ctx)
        return;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y);
}
function lu5_glEnd() {
    if (!this.ctx)
        return;
    this.ctx.closePath();
}
function lu5_render_ellipse(x, y, w, h, _segments, color) {
    if (!this.ctx)
        return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    this.ctx.fill();
}
function lu5_render_ring(x, y, inner_radius_h, inner_radius_w, strokeWeight, _segments, color) {
    if (!this.ctx)
        return;
    this.ctx.strokeStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, inner_radius_w, inner_radius_h, 0, 0, 2 * Math.PI);
    this.ctx.lineWidth = strokeWeight;
    this.ctx.stroke();
}
function lu5_render_arc_fill(x, y, rx, ry, start, end, _segments, color) {
    if (!this.ctx)
        return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, rx, ry, 0, start, end);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
}
function lu5_render_arc_stroke(x, y, w, h, strokeWeight, start_angle, end_angle, _segments, color) {
    if (!this.ctx)
        return;
    this.ctx.strokeStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w, h, 0, start_angle, end_angle);
    this.ctx.lineWidth = strokeWeight;
    this.ctx.stroke();
}
function lu5_render_quad_fill(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    if (!this.ctx)
        return;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.lineTo(x4, y4);
    this.ctx.closePath();
    this.ctx.fill();
}
function lu5_render_quad_stroke(x1, y1, x2, y2, x3, y3, x4, y4, strokeWeight, color) {
    if (!this.ctx)
        return;
    this.ctx.strokeStyle = this.colorToRGBA(color);
    const px = Math.min(x1, x2, x3, x4);
    const py = Math.min(y1, y2, y3, y4);
    const w = Math.max(x1, x2, x3, x4) - px;
    const h = Math.max(y1, y2, y3, y4) - py;
    this.ctx.lineWidth = strokeWeight;
    this.ctx.strokeRect(px, py, w, h);
}
function lu5_render_text(text_ptr, x, y, fontSize, textAlign, _font, color) {
    if (!this.ctx)
        return;
    const text = get_cstr(this.memory, text_ptr);
    switch (textAlign) {
        case 1:
            this.ctx.textAlign = "center";
            break;
        case 2:
            this.ctx.textAlign = "right";
            break;
        case 3:
            this.ctx.textAlign = "left";
            break;
    }
    ;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillStyle = this.colorToRGBA(color);
    this.ctx.fillText(text, x, y);
}

;// ./src/platform/geometry/3D.ts
function lu5_render_debug() {
    console.log('lu5_render_debug');
}
function lu5_render_box_faces(x, y, z, w, h, d) {
    console.log('lu5_render_box_faces', x, y, z, w, h, d);
}
function lu5_render_box_edges(x, y, z, w, h, d) {
    console.log('lu5_render_box_edges', x, y, z, w, h, d);
}
function lu5_render_cylinder_faces(x, y, z, r, h) {
    console.log('lu5_render_cylinder_faces', x, y, z, r, h);
}
function lu5_render_cylinder_edges(x, y, z, r, h) {
    console.log('lu5_render_cylinder_edges', x, y, z, r, h);
}
function lu5_render_torus_faces(x, y, z, r1, r2) {
    console.log('lu5_render_torus_faces', x, y, z, r1, r2);
}
function lu5_render_torus_edges(x, y, z, r1, r2) {
    console.log('lu5_render_torus_edges', x, y, z, r1, r2);
}
function lu5_render_plane_faces(x, y, z, w, h) {
    console.log('lu5_render_plane_faces', x, y, z, w, h);
}
function lu5_render_plane_edges(x, y, z, w, h) {
    console.log('lu5_render_plane_edges', x, y, z, w, h);
}
function lu5_render_sphere_faces(x, y, z, r) {
    console.log('lu5_render_sphere_faces', x, y, z, r);
}
function lu5_render_sphere_edges(x, y, z, r) {
    console.log('lu5_render_sphere_edges', x, y, z, r);
}

;// ./src/platform/index.ts



function lu5_noLoop() {
    this.loop = false;
}
function lu5_loop() {
    if (!this.loop) {
        requestAnimationFrame(this.frame);
    }
    this.loop = true;
}
function lu5_getCursorPos(_window, mousex_ptr, mousey_ptr) {
    this.refreshMemory();
    if (this.view) {
        this.view.setFloat64(mousex_ptr, this.mouseX, true);
        this.view.setFloat64(mousey_ptr, this.mouseY, true);
    }
    return 0;
}
function lu5_init_freetype() {
    return 0;
}
;
function lu5_close_fonts() {
    return 0;
}
;
function lu5_load_and_add_font(_lu5, _font_ptrptr, name_ptr) {
    console.warn(`'lu5_load_and_add_font' is not yet implemented...`);
}
function lu5_set_font(fontname_ptr) {
    const name = get_cstr(this.memory, fontname_ptr);
    console.warn(`Trying to set font ${name} but 'lu5_set_font' is not yet implemented...`);
    return 0;
}
function lu5_load_default_font() { return 0; }
;
function lu5_time_seed() {
    return Math.floor(Math.random() * 1000000);
}

;// ./src/color.ts
function colorToRGBA(ptr) {
    this.refreshMemory();
    if (!this.view)
        return '#000';
    const alpha = this.view.getUint8(ptr);
    if (alpha == 0)
        return '#000';
    const color = '#' +
        this.view.getUint8(ptr + 3).toString(16).padStart(2, '0') +
        this.view.getUint8(ptr + 2).toString(16).padStart(2, '0') +
        this.view.getUint8(ptr + 1).toString(16).padStart(2, '0') +
        alpha.toString(16).padStart(2, '0');
    return color;
}

;// ./src/lu5.ts
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LU5_instances, _LU5_run;





class LU5 {
    constructor() {
        _LU5_instances.add(this);
        this.colorToRGBA = colorToRGBA.bind(this);
        this.canvas_id = null;
        this.l5 = null;
        this.wasm = null;
        this.ctx = null;
        this.gl = null;
        this.memory = null;
        this.view = null;
        this.lastTime = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.loop = true;
        this.frame = undefined;
        this.depth_mode = 0;
        this.env = {
            getTempRet0() { return 0; },
            saveSetjmp(_ptr) { return 0; },
            testSetjmp(_ptr, _v) { return 0; }
        };
    }
    refreshMemory() {
        if (this.memory)
            if (this.view === null || this.view.buffer.byteLength === 0) {
                this.view = new DataView(this.memory.buffer);
            }
    }
    static makeEnv(bind, symbols, implemented) {
        const env = {};
        const syms = [...new Set([...symbols, ...Object.keys(implemented)])];
        for (let sym of syms) {
            env[sym] = (implemented[sym] == undefined) ?
                (() => 0) :
                implemented[sym].bind(bind);
        }
        return env;
    }
    instantiate(lu5_wasm_path) {
        return WebAssembly.instantiateStreaming(fetch(lu5_wasm_path), {
            env: {
                ...LU5.makeEnv(this, lu5_bindings_unimplemented, platform_namespaceObject),
                ...this.env
            },
            wasi_snapshot_preview1: LU5.makeEnv(this, wasi_snapshot_preview1_unimplemented, wasi_namespaceObject)
        })
            .then((w) => {
            this.wasm = w;
            this.memory = w.instance.exports.memory;
            return this;
        });
    }
    execute(source) {
        return new Promise(res => {
            __classPrivateFieldGet(this, _LU5_instances, "m", _LU5_run).call(this, source, () => res(this));
        });
    }
    reset() {
        if (!this.wasm)
            return this;
        const _lu5_close = this.wasm.instance.exports._lu5_close;
        if (this.l5) {
            _lu5_close(this.l5);
            Object.defineProperty(this, 'l5', { value: null, writable: false });
        }
        if (this.ctx) {
            this.ctx.canvas.remove();
        }
        return this;
    }
}
_LU5_instances = new WeakSet(), _LU5_run = function _LU5_run(source, done = () => { }) {
    if (this.wasm === null || !this.wasm.instance) {
        console.warn('lu5 wasm hasn\'t loaded yet.');
        return;
    }
    const malloc = this.wasm.instance.exports.malloc;
    const free = this.wasm.instance.exports.free;
    const _lu5_get_handle = this.wasm.instance.exports._lu5_get_handle;
    const _lu5_init = this.wasm.instance.exports._lu5_init;
    const _lu5_setup = this.wasm.instance.exports._lu5_setup;
    const _lu5_frame = this.wasm.instance.exports._lu5_animation_frame;
    if (!this.l5) {
        Object.defineProperty(this, 'l5', {
            writable: false,
            value: _lu5_get_handle()
        });
        // init when running for the first time
        _lu5_init(this.l5);
    }
    // Allocate memory for lua source
    const source_ptr = malloc(source.length);
    // Set lua source in memory
    write_cstr(this.memory, source_ptr, source);
    if (!this.l5) {
        free(source_ptr);
        return;
    }
    ;
    switch (_lu5_setup(this.l5, null, source_ptr)) {
        case 0:
            let lastTime = 0;
            // Single frame call
            this.frame = ((timestamp) => {
                const deltaTime = (timestamp - lastTime) / 1000;
                _lu5_frame(this.l5, deltaTime);
                lastTime = timestamp;
                if (this.loop) {
                    requestAnimationFrame(this.frame);
                }
            }).bind(this);
            requestAnimationFrame(this.frame);
            break;
        case 1:
        default:
            free(source_ptr);
            done();
            return;
    }
};

;// ./src/script.ts
async function get_script_source(script) {
    let src = script.getAttribute('src');
    return (src) ?
        fetch(src).then(r => r.text()) :
        script.textContent;
}
function get_canvas_id(script) {
    if (script.hasAttribute('canvas')) {
        return script.getAttribute('canvas');
    }
    else if (script.hasAttribute('src')) {
        return script.getAttribute('src')
            .split('/').join('').split('.')
            .filter(l => l.length != 0).pop();
    }
    return '';
}
async function get_script() {
    const script = document.querySelectorAll('script[type="text/lua"]')[0];
    if (script == undefined) {
        console.warn('No lua scripts found...');
        return { id: '', source: '' };
    }
    return {
        id: get_canvas_id(script),
        source: await get_script_source(script)
    };
}

;// ./src/index.ts


Object.defineProperty(window, '_lu5_instantiate_script', {
    value: document.currentScript,
    writable: false,
    configurable: false
});
// If included as a library, leak this function to the global scope.
if (document.currentScript.hasAttribute('lib')) {
    window.lu5 = {
        init: (wasm_path) => (new LU5()).instantiate(wasm_path)
    };
}
else {
    window.onload = () => init();
}
function init(wasm_bin_path = 'LU5_WASM_CDN') {
    // Check if library was included with a wasm attribute
    if (!window._lu5_instantiate_script) {
        console.error('Could not find current lu5 script');
        return;
    }
    // Use wasm attribute to determine lu5 wasm binary url,
    // default is passed argument
    if (window._lu5_instantiate_script.hasAttribute('wasm')) {
        wasm_bin_path = window._lu5_instantiate_script.getAttribute('wasm');
    }
    // Start lu5
    const lu5 = new LU5();
    lu5.instantiate(wasm_bin_path)
        .then(_lu5 => get_script())
        .then(({ id, source }) => {
        lu5.canvas_id = id;
        lu5.execute(source);
    })
        .catch(console.error);
}
;

/******/ })()
;