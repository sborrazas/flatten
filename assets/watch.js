var chokidar = require("chokidar")
  , watcher = chokidar.watch(__dirname, { usePolling: true })
  , compiler = require("./compiler.js")
  , runCompiler;

runCompiler = function () {
  compiler.run(function (err, stats) {
    if (err) {
      console.log("An error ocurred.", err);
    }
    else {
      console.log(stats.toString({ colors: true }));
    }
  });
};

runCompiler();
watcher.on("change", runCompiler);
