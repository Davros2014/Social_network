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
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-react", "@babel/preset-env"]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            }
        ]
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
