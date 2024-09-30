const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
    entry: ['./src/index.ts'],
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
    mode: 'production'
};

// Minified configuration
const minified = {
    ...baseConfig,
    output: {
        filename: 'lu5-wasm.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};

const non_minified = {
    ...baseConfig,
    output: {
        filename: 'lu5-wasm.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false
    }
};

module.exports = [non_minified, minified];