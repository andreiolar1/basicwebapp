
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports = {
    /** "mode"
     * the environment - development, production, none. tells webpack 
     * to use its built-in optimizations accordingly. default is production 
     */
    mode: "development",
    devtool: 'source-map',
    /** "entry"
     * the entry point 
     */
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        /** "path"
         * the folder path of the output file 
         */
        path: path.resolve(__dirname, "public"),
        publicPath: '/',
        /** "filename"
         * the name of the output file 
         */
        filename: "main.js"
    },
    /** "target"
     * setting "node" as target app (server side), and setting it as "web" is 
     * for browser (client side). Default is "web"
     */
    target: "web",
    devServer: {
        /** "port" 
         * port of dev server
        */
        port: "3000",
        /** "static" 
         * This property tells Webpack what static file it should serve
        */
        static: ["./public"],
        /** "open" 
         * opens the browser after server is successfully started
        */
        open: true,
        /** "hot"
         * enabling and disabling HMR. takes "true", "false" and "only". 
         * "only" is used if enable Hot Module Replacement without page 
         * refresh as a fallback in case of build failures
         */
        hot: true,
        /** "liveReload"
         * disable live reload on the browser. "hot" must be set to false for this to work
        */
        liveReload: true,

        historyApiFallback: true
    },
    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ['*', '.js', '.jsx', '.json']
    },
    
    module: {
        
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {

                test: /\.(woff|woff2|eot|ttf|otf)$/i,

                type: 'asset/resource',

            },
            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            // For newer versions of Webpack it should be
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Path to your HTML template
        }),
        // ... other plugins ...
    ],
}