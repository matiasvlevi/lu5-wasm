export type PlatformFunction = (...args: any) => any;

export type WebAssemblyInstance = (WebAssembly.Instance & { exports: Record<string, PlatformFunction> });

export interface LU5Console {
    log: (text: string) => void;
    warn: (text: string) => void;
    error: (text: string) => void;
    clear: () => void;
}