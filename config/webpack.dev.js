/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    https: false,
    hot: false,
    inline: false,
    host: "0.0.0.0",
    port: 3005,
    useLocalIp: true,
    compress: true,
    headers: {},
    proxy: {},
    before(app) {},
    after(app) {}
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
