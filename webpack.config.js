const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// Allow the use of javascript environment files.
const DotenvPluginConfig = new Dotenv({
    path: '.js.env',
    safe: false
});

// Use the provide plugin to provide dependencies to the global scope.
// jQuery and Popper are needed globally for bootstrap v4.
const ProvidePluginConfig = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: "popper.js",
});

// Use the extract text plugin to search for all .scss files instead of
// using the webpack dependency graph.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'app.css',
    allChunks: true,
});

// Copy the static directory to the public directory.
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
        from: 'resources/assets/static'
    }
]);

// Uglify the bundles and reduce the file sizes.
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
});

// Get a notification when a new build completes
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const WebpackBuildNotifierPluginConfig = new WebpackBuildNotifierPlugin({
    title: 'CryptoBird',
    logo: path.resolve('public/favicon.png')
});

module.exports = {
    // Generate a dependency graph for both the javascript and sass files.
    entry: [
        './resources/assets/js/index.tsx',
        './resources/assets/sass/index.scss'
    ],

    // When running webpack keep watching for file changes.
    watch: true,

    output: {
        path: path.resolve('public'),
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/vendor/, /node_modules/]
            },

            // Pack all the sass and css files.
            {
                test: /\.scss$/,
                exclude: [/vendor/, /node_modules/],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            // options: {
                            //     minimize: true,
                            // },
                        },
                        {
                            loader: 'sass-loader',
                            // options: {
                            //     minimize: true,
                            // },
                        },
                    ]
                }),
            },

            // Deal with font files
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        DotenvPluginConfig,
        ProvidePluginConfig,
        ExtractTextPluginConfig,
        CopyWebpackPluginConfig,
        WebpackBuildNotifierPluginConfig,
        //UglifyJsPluginConfig,
    ]
}
