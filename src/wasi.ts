import { LU5 } from "./lu5";

export function fd_write(this: LU5, 
    fd: number, 
    iovecs: number, 
    iovec_len: number, 
    nwritten: number) 
{
    if (!this.memory) return;
    
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

        if (size <= 0) continue;

        // Extract buffer data
        const buffer =  new Uint8Array(this.memory.buffer, ptr, size);
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
        case 1: console.log(str); break;
        case 2: console.error(str); break;
        default: console.error('fd_write: unknown file descriptor'); return 1;
    }

    // Write the total written size at the specified location
    let writtenBytes = totalBytesWritten
    if (this.view)
        this.view.setUint32(nwritten, writtenBytes, true);

    return writtenBytes;
}

export function clock_res_get(this: LU5, 
    _clockId: number, 
    resolution: number) 
{
    if (this.view)
        this.view.setBigUint64(resolution, 1000n, true);
    return 0;
}

export function clock_time_get(this: LU5, 
    _clockId: number, 
    _precision: number, 
    time: number) 
{
    if (this.view)
        this.view.setBigUint64(time, BigInt(Date.now()) * 1_000_000n, true)
    return 0;
}