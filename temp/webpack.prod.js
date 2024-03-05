const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //to clean up the previous files
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //to separate css file from having loaded with consolidated js file
const optimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin"); //to optimize the css file
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[contenthash].js", //that to avoiding cache issues
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "[name].[fullhash].css",
    }),
    new optimizeCssAssetPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
});
