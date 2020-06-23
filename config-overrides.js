const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = function(config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@": resolve("src/"),
    "@utils": resolve("src/utils"),
    "@components": resolve("src/components"),
  });

  return config;
};