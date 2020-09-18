const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports= {
    entry:"./src/index.js",
    output:{
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './Public/index.html'
        }),
    ],
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
};