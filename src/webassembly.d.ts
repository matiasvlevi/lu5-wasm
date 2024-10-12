declare namespace WebAssembly {
    class Exception {
        constructor(payload: any);

        is(expectedTag: WebAssembly.Tag): boolean;
        getArg<T>(tag: WebAssembly.Tag, index: number): T;
    }

    class Tag {
        constructor(descriptor: { parameters: string[] });
    }
}