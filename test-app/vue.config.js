module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/testDeploy/" : "/",

  transpileDependencies: ["vuetify"]
};
