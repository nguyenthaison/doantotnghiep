var webpack = require("webpack");

const paths = {
  js: __dirname + "/app/assets/javascripts",
  jsx: __dirname + "/app/jsx",
}

module.exports = {
  entry: paths.jsx + "/index.jsx",
  output: {
    path: paths.js,
    filename: "react-app.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        "babel?cacheDirectory",
      ],
    }]
  },
  plugins: [
     new webpack.ProvidePlugin({
        React: "react",
        update: "react-addons-update",
        mui: "material-ui",
        config: __dirname + "/config/react_app",
        cm: paths.jsx + "/Common",
        BaseComponent : paths.jsx + "/BaseComponent",
        PageComponent : paths.jsx + "/PageComponent",
        BaseMaster: paths.jsx + "/Master/BaseMaster",
     })
  ],
}
