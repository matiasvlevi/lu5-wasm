export type PlatformFunction = (...args: any) => any;

export type WebAssemblyInstance = (WebAssembly.WebAssemblyInstantiatedSource & { instance: { exports: Record<string, PlatformFunction> } });