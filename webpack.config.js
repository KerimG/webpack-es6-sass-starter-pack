const path = require("path");

let destinationFolder = "dev";

if (process.env.NODE_ENV === "production") {
  destinationFolder = "dist";
}

const config = {
  entry: {
    app: "./src/js/app.js"
  },
  output: {
    path: path.resolve(__dirname, destinationFolder),
    filename: "bundle.js"
  },
  module: {
    rules: [{ est: /\.txt$/, use: "raw-loader" }]
  }
};

module.exports = config;
