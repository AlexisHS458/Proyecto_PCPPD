const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin() // Place it here
    ]
  },
  pluginOptions:{
    electronBuilder:{
      appId: "mx.ipn.kun",
      productName: "Kun",
      win: {
        icon: "./buildResources/icon.png"
      }
    }
  }
  /* plugins: [new MonacoWebpackPlugin()] */
};
