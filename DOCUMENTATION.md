
# Library usage documentation

<br/><br/>

# `lu5.init([path])`

Instantiates the lu5 WebAssembly instance

### Arguments

* **[path]** `string` WebAssembly binary path, by default, the official lu5 cdn is used to serve `lu5.wasm`

### Returns

A promise which passes a lu5 instance.

### Examples

```js
lu5.init()
   .then(vm => console.log(vm))
```

With another `lu5.wasm` build

```js
lu5.init('/path/to/my/build/lu5.wasm')
    .then(vm => console.log(vm))
```

<br/><br/>

# `vm.execute(code)`

Evaluate and run a lua script string.

### Arguments

* **code** `string` The lua script string

### Returns

* A promise which passes a lu5 instance

### Examples

```js
lu5.init()
    .then(vm => vm.execute('print("Hello from lu5!");'))
    .then(vm => vm.execute('print("Hello again!");'))
```

<br/><br/>

# `vm.reset()`

Clear the lua state

### Arguments

None

### Returns

* A promise which passes a lu5 instance

### Examples

```js
lu5.init()
    .then(vm => vm.execute('x = 42'))
    .then(vm => vm.execute('print(x)')) // 42
    .then(vm => vm.reset())
    .then(vm => vm.execute('print(x)')) // nil
```

<br/><br/>

# `vm.setCanvas([id])`

Set the canvas id

### Arguments

* **[id]** `string` The canvas id

### Returns

* A promise which passes a lu5 instance

### Examples

```js
lu5.init()
    .then(vm => vm.setCanvas('mycanvas'))
    .then(vm => vm.execute(`
        function setup()
            createWindow(200, 200);
        end

        function draw()
            background('orange');
            
            circle(100, 100, 50);
        end
    `))
```