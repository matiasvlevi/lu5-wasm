import { LU5 } from "../../lu5";

export function lu5_render_debug() {
    console.log('lu5_render_debug');
}

export function lu5_render_box_faces(this: LU5, x: number, y: number, z: number, w: number, h: number, d: number) {
    console.log('lu5_render_box_faces', x, y, z, w, h, d);
}

export function lu5_render_box_edges(this: LU5, x: number, y: number, z: number, w: number, h: number, d: number) {
    console.log('lu5_render_box_edges', x, y, z, w, h, d);
}

export function lu5_render_cylinder_faces(this: LU5, x: number, y: number, z: number, r: number, h: number) {
    console.log('lu5_render_cylinder_faces', x, y, z, r, h);
}

export function lu5_render_cylinder_edges(this: LU5, x: number, y: number, z: number, r: number, h: number) {
    console.log('lu5_render_cylinder_edges', x, y, z, r, h);
}

export function lu5_render_torus_faces(this: LU5, x: number, y: number, z: number, r1: number, r2: number) {
    console.log('lu5_render_torus_faces', x, y, z, r1, r2);
}

export function lu5_render_torus_edges(this: LU5, x: number, y: number, z: number, r1: number, r2: number) {
    console.log('lu5_render_torus_edges', x, y, z, r1, r2);
}

export function lu5_render_plane_faces(this: LU5, x: number, y: number, z: number, w: number, h: number) {
    console.log('lu5_render_plane_faces', x, y, z, w, h);
}

export function lu5_render_plane_edges(this: LU5, x: number, y: number, z: number, w: number, h: number) {
    console.log('lu5_render_plane_edges', x, y, z, w, h);
}

export function lu5_render_sphere_faces(this: LU5, x: number, y: number, z: number, r: number) {
    console.log('lu5_render_sphere_faces', x, y, z, r);
}

export function lu5_render_sphere_edges(this: LU5, x: number, y: number, z: number, r: number) {
    console.log('lu5_render_sphere_edges', x, y, z, r);
}