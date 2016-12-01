var webpack = require('webpack')
//console.log(__dirname);
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jade$/, loader: "jade-loader" },
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader'}
    ]
  }
}
