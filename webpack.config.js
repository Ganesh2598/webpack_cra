const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode : "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, './'),
        publicPath: '/'
    },
    entry : path.resolve(__dirname, "src/index.js"),
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "bundle.js"
    },
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_module/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({ 
            template: "./public/index.html",
            filename: "index.html",
        })
    ]
}