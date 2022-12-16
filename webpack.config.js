const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'), // the bundle output path
        filename: 'bundle.js', // the name of the bundle
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html', // to import index.html file inside index.js
            filename: './index.html',
        }),
    ],
    devServer: {
        port: process.env.PORT || 3030, // you can change the port
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: 'url-loader',
                options: { limit: false },
            },
        ],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
}
