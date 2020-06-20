const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// console.log("using the extended webpack! Using the end to begin order");

// two styles. Editor only, and frontend+editor (style).
// editor-only goes into... index of block, which goes to editor.js (or index for me)?
// src/script gets the blockfolder/script which imports the style.scss
// So NOW in the php file you don't register the scss files.
// Just register the styles that get "transpiled" to the build/ folder. One for the front+backend = style.css
// the other for only the editor = editor.css

let cssRules = {
    test: /\.s(a|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        'css-loader',
        'sass-loader'
    ],
};
defaultConfig.module.rules[3] = cssRules;

// let testObj = {
//     // ...defaultConfig.output,
//     // ...defaultConfig.entry,
//     ...defaultConfig.entry,
//     style: './src/style.js',
// }
// console.log("new stuff...")
// console.log(testObj);
module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        // frontEndStyles: './src/frontEndStyles.js',
        editorStyles: './src/editorStyles.js'
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            // {
            //     test: /\.css$/,
            //     use: [
            //         // MiniCssExtractPlugin.loader,
            //         "style-loader",
            //         "css-loader",
            //     ],
            // },
        ],
    },
}
