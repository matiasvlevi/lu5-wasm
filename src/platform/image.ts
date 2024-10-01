import { LU5 } from "../lu5";
import { get_cstr } from "../memory";

let images: HTMLImageElement[] = [];

export function lu5_load_image(this:LU5, _L:number, path_str: number) {
    const path = get_cstr(this.memory, path_str);
    
    // Add image
    const img = new Image();
    img.src = path;
    images.push(img);

    // Return an image struct, with an image index as texture ptr
    this.refreshMemory();
    const lu5_image = this.wasm.instance.exports.malloc(4 * 3);
    this.view.setUint32(lu5_image, images.length-1); // texture id
    this.view.setInt32(lu5_image + 1, img.width); 
    this.view.setInt32(lu5_image + 2, img.height);
    return lu5_image;
}

export function lu5_render_image(this:LU5, _L:number, image_ptr:number, x:number, y: number, w: number, h:number, color: number) {

    // Get the texture ptr
    const image_index = this.view.getUint32(image_ptr);

    // Ignore if still unloaded
    const img = images[image_index];
    if (!img.complete) return;

    this.ctx.drawImage(img, x, y, w, h);
}