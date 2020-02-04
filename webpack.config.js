const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack_rules = [];

const webpackOption = {
  entry: {
    app: path.join(__dirname, 'app/app.ts'),
    vendor: [
      'path2d-polyfill',
      'babel-polyfill',
      'backbone',
      'handlebars',
      'i18next'
    ]
  },
  mode: 'development',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, 
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};

let babelLoader = {
  test: /\.ts$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
};

webpack_rules.push(babelLoader);
module.exports = webpackOption;