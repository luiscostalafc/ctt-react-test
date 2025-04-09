const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin that generates an HTML file and automatically injects the bundle
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Plugin that removes the output folder before each build

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[contenthash].js", // Output file name with a hash to avoid caching issues
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Public URL for the output directory when referenced in a browser
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map", // Generates source maps to simplify debugging of the original code
  devServer: {
    static: path.join(__dirname, "dist"), // Specifies the folder for serving static files in the development server
    historyApiFallback: true, // Redirects all 404s to index.html for single-page applications (SPA)
    port: 3000,
    hot: true, // Enables Hot Module Replacement to update modules without a full page reload
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader", // Uses ts-loader to transpile TypeScript into JavaScript
        exclude: /node_modules/, // Excludes node_modules to improve build performance
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Uses style-loader to inject CSS into the DOM and css-loader to interpret CSS imports
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans the output directory before each build to remove outdated files
    new HtmlWebpackPlugin({
      template: "./src/index.html", // HTML template used to generate index.html with the bundle injected
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // Enables automatic chunk splitting to separate common dependencies and improve performance
    },
  },
};
