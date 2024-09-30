# lu5-wasm

This is a minimal JavaScript polyfill for the [lu5](https://github.com/matiasvlevi/lu5) interpreter when used in WebAssembly.


<br/>


## Adding a lu5 canvas to your homepage

Add the lu5 wasm runtime

```xml
<script src="https://cdn.jsdelivr.net/gh/matiasvlevi/lu5-wasm@master/dist/lu5-wasm.min.js"></script>
```

Create lua scripts

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


<br/>
<br/>

## Include lu5-wasm as a library

Avoid looking for any lua scripts in the html document, instead, expose an api to call lu5 scripts.

Add the `lib` attribute to the script tag to enable library mode

```xml
<script lib src="https://cdn.jsdelivr.net/gh/matiasvlevi/lu5-wasm@master/dist/lu5-wasm.min.js"></script>
```

<br/>

Instantiate lu5 with the wasm binary and execute scripts.

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

You can use variables created from a previous execute call.

```js
lu5.init('./lu5.wasm')
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.execute('y = 18'))
    .then(vm => vm.execute('print(x + y)'));
```


You can call `lu5.reset` to clear memory

```js
lu5.init('./lu5.wasm')
    .then(vm => vm.execute('x = 12'))
    .then(vm => vm.reset())
    .then(vm => vm.execute('print(x)')); // nil
```