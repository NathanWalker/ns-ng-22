const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    config.resolve.set('preferRelative', true);
  });

  return webpack.resolveConfig();
};
