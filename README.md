# lu5-wasm

This is a minimal JavaScript polyfill for the [lu5](https://github.com/matiasvlevi/lu5) interpreter when used in WebAssembly.


<br/>


## Getting Started

Add the `lu5-wasm` library from a CDN

```htm
<script src="https://unpkg.com/lu5-wasm@latest/dist/lu5-wasm.min.js"></script>
```

Add a script

```xml
<script type="text/lua">
    function setup()
        createWindow(400, 400);
    end

    function draw()
        background('purple');
    end
</script>
```

Out of the box, `lu5-wasm` will search for lua or lu5 scripts and execute them. For now, it is only possible to have 1 canvas per page.


<br/>
<br/>

## Use `lu5-wasm` as a library

For more specialized use cases, you may prefer to use `lu5-wasm` in library mode.
This will disable the auto-execution of lua scripts in your document.

Add the `lib` attribute to the script tag to enable library mode

```htm
<script src="https://unpkg.com/lu5-wasm@latest/dist/lu5-wasm.min.js" lib></script>
```

<br/>

## Library usage

Instantiate `lu5` with the wasm binary and execute scripts.

```js
lu5.init('./lu5.wasm')
    .then(vm => vm.execute(`print('Hello from lu5!')`))
    .then(vm => vm.execute(`
        function setup()
            createWindow(400, 400);
        end

        function draw()
            background('green');
        end
    `));
```

<br/>

You can use variables created from a previous execute calls

```js
lu5.init('./lu5.wasm')
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.execute('y = 18'))
    .then(vm => vm.execute('print(x + y)'));
```

Call `lu5.reset` to clear memory

```js
lu5.init('./lu5.wasm')
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.reset())
    .then(vm => vm.execute('print(x)')); // nil
```