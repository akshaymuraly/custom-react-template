const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
// const { name } = require("file-loader");

module.exports = {
  entry: "./src/index.js",
  plugins: [new htmlWebPackPlugin({ template: "./public/index.html" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        include: path.resolve(__dirname, "public"), //setting to check for only files in this folder
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
