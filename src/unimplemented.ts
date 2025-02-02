import { LU5 } from "./lu5";
import { PlatformFunction } from "./types";

const lu5_bindings_unimplemented = [
    // Image
    'lu5_image_crop',

    // 3D
    'lu5_render_debug',
    'lu5_render_box_faces',
    'lu5_render_box_edges',
    'lu5_render_cylinder_faces',
    'lu5_render_cylinder_edges',
    'lu5_render_torus_faces',
    'lu5_render_torus_edges',
    'lu5_render_plane_faces',
    'lu5_render_plane_edges',
    'lu5_render_ellipsoid_faces',
    'lu5_render_ellipsoid_edges',

    // GLFW
    'lu5_swapBuffers',
    'lu5_pollEvents',
    'lu5_setWindowShouldClose',
    'lu5_PushMatrix',
    'lu5_PopMatrix',

    // Other
    'lu5_glVertex2',
    'lu5_init_freetype',
    'lu5_close_fonts',
    'lu5_load_default_font',
];

const wasi_snapshot_preview1_unimplemented = [
    'random_get',
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

function makeEnv(bind: LU5, symbols: string[], implemented: Record<string, PlatformFunction>) {
    const env: Record<string, PlatformFunction> = {};
    const syms = [...new Set([...symbols, ...Object.keys(implemented)])];
    for (let sym of syms) {
        env[sym] = (implemented[sym] == undefined) ? (() => 0) : implemented[sym].bind(bind);
    }
    return env;
}

export { lu5_bindings_unimplemented, wasi_snapshot_preview1_unimplemented, makeEnv };