const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const conf = {
    entry: ["@babel/polyfill", __dirname + "/src/start.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    performance: {
        hints: false
    },
    mode: require.main == module ? "production" : "development",
    optimization:
        require.main == module
            ? {
                  minimizer: [new UglifyJsPlugin({})]
              }
            : {},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s(a|c)ss$/,
                loader: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".scss"]
    }
};

if (require.main == module) {
    webpack(conf, function(err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require("webpack-dev-middleware")(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: "/"
    });
}
