const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
    entry: {
        'lu5-wasm': './src/lu5-wasm.ts',
        'lu5-console': './src/console.ts'
    },
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

// Minified configuration
const minified = {
    ...baseConfig,
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],

    }
};

const non_minified = {
    ...baseConfig,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false
    }
};

module.exports = [non_minified, minified];