const path = require('path');
const glob = require('glob');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let destinationFolder = 'devbuild';

if (process.env.NODE_ENV === 'production') {
    destinationFolder = 'dist';
}


module.exports = {
    entry: {
        app: [
            "./src/js/app.js",
            "./src/style/main.scss"
        ]
    },

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, destinationFolder), // string
        // the target directory for all output files

        filename: "scripts/[name].[chunkhash].js" // string
        // the filename template for entry chunks
    },

    module: {
        rules: [
            {
                test: /\.s[ca]ss$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }//,
            // {
            //     test: /\.(html|htm)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].html'
            //         }
            //     }]
            // }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([destinationFolder]),
        new ExtractTextPlugin('css/style.[contenthash].css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "devbuild"),
        compress: true,
        port: 8080
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            parallel: true
        })
    )
}