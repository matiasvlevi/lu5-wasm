const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
    resolve: {
        extensions: ['.ts', '.js'],
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
    plugins: [
        // This will make foobar available globally, so secondary can use it
        new webpack.ProvidePlugin({
            'get_or_create_by_id': path.resolve(__dirname, 'src/common/dom.ts'),
        }),
    ],
    mode: 'production'
};

const lu5_wasm = {
    entry: {
        'lu5-wasm': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: "lu5",
        libraryTarget: "umd"
    }
}

const lu5_wasm_lib = {
    entry: {
        'lu5-wasm-lib': './src/lib.ts'
    },

    experiments: {
        outputModule: true, // Enables output as an ES module
    },
    externalsType: "module",
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'module',
        chunkFormat: 'module',
        globalObject: 'window',
    }
}

// Minified configuration
const minified = (c) => ({
    ...c,
    output: {
        filename: '[name].min.js',
        ...c.output
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
});

const non_minified = (c) => {
    return {
        ...c,
        output: {
            filename: '[name].js',
            ...c.output
        },
        optimization: {
            minimize: false
        }
    }
};

module.exports = [
    // UMD Module
    non_minified({ ...baseConfig, ...lu5_wasm }),
    minified({ ...baseConfig, ...lu5_wasm }),

    // ES Module
    non_minified({ ...baseConfig, ...lu5_wasm_lib }),
    minified({ ...baseConfig, ...lu5_wasm_lib })
];