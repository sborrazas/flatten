var webpack = require("webpack")
  , ExtractTextPlugin = require("extract-text-webpack-plugin")
  , path = require("path")
  , webpackConfig = null;

webpackConfig = function (fileInput, fileOutput) {
  return {
    entry: path.join(__dirname, fileInput),
    output: {
      path: path.normalize(path.join(__dirname, "..", "public")),
      filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: ExtractTextPlugin.extract("raw-loader")
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("raw-loader!less-loader?compress=true")
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(fileOutput, { allChunks: true })
    ]
  };
};

compile = function (finished) {
  [
    ["templates/index.html", "index.html"]
  ].forEach(function (filenames, i) {
    webpack(webpackConfig(filenames[0], filenames[1])).run(finished);
  });
};

module.exports = {
  run: function (finished) {
    compile(finished);
  }
};
