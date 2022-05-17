const babelOptions = {
  presets: [
    "babel-preset-gatsby",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};

module.exports = require("babel-jest").default.createTransformer(babelOptions);
