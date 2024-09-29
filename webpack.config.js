const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: [
        './src/types.ts',
        './src/expected.ts',
        './src/glfw.ts',
        './src/lu5.ts',
        './src/wasi.ts',
        './src/platform/geometry/2D.ts',
        './src/platform/geometry/3D.ts',
        './src/platform/index.ts',
        './src/index.ts',
    ],
    output: {
        filename: 'lu5-wasm.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    mode: 'production'
};