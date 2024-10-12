export type PlatformFunction = (...args: any) => any;

export type WebAssemblyInstance = (WebAssembly.Instance & { exports: Record<string, PlatformFunction> });