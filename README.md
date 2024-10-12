# lu5-wasm

A minimal WebAssembly instantiator & javascript polyfill for the [lu5](https://github.com/matiasvlevi/lu5) interpreter.

<br/>

## Current Limitations


* No async 
* No file i/o
* No matrix transform stack (`translate`, `rotate`, `scale`)
* No 3D Rendering
* No setjmp & longjmps
* No exception handling (we currently use a workaround)

<br/>

## Getting Started

Add the `lu5-wasm` library from a CDN

```html
<script src="https://unpkg.com/lu5-wasm@latest/dist/lu5-wasm.min.js"></script>
```

Add a script

```xml
<script type="text/lua">
    function setup()
        createWindow(400, 400);
    end

    function draw()
        background('magenta');
    end
</script>
```

Out of the box, `lu5-wasm` will search for and execute lu5 scripts in the document.

<br/>

## Run in a specific canvas

Add a canvas with an `id`

The canvas can be placed anywhere in your document's body

```html
<canvas id="game"></canvas>
```

Include a lu5 script with a `canvas` attribute referencing the canvas `id`

```html
<script type="text/lua" src="sketch.lua" canvas="game"></script>
```

<br/>
<br/>

## Use `lu5-wasm` as a library

For more specialized use cases, you may prefer to use `lu5-wasm` in library mode.
This will disable the auto-execution of lua scripts in your document.

Add the `lib` attribute to the script tag to enable library mode

```html
<script src="https://unpkg.com/lu5-wasm@latest/dist/lu5-wasm.min.js" lib></script>
```

<br/>

## Library usage

Instantiate `lu5` with the wasm binary and execute scripts.

```js
lu5.init()
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

You can use the state from previous execute calls

```js
lu5.init()
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.execute('y = 18'))
    .then(vm => vm.execute('print(x + y)'));
```

Call `lu5.reset` to clear state

```js
lu5.init()
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.reset())
    .then(vm => vm.execute('print(x)')); // nil
```

See [DOCUMENTATION.md](DOCUMENTATION.md).



<br/><br/>

