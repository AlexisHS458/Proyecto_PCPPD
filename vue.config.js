const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin() // Place it here
    ]
  }
  /* plugins: [new MonacoWebpackPlugin()] */
};
