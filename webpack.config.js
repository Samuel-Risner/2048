const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: "ts-loader",
          options: {
              configFile: path.resolve(__dirname, "tsconfig.json")
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "minified.js",
    path: path.resolve(__dirname, "static", "js", "dist"),
  },
  mode: "production",
};
