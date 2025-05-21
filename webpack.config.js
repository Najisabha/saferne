const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  entry: {
    app: './src/js/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/[name][ext]', // الصور تحفظ هنا
    clean: true,
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    port: 9000,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // ✅ بديل file-loader
      },
      {
        test: /\.html$/i,
        loader: 'html-loader', // ✅ ضروري لتمكين <img src="..."> في HTML
        options: {
          sources: {
            list: [
              { tag: 'img', attribute: 'src', type: 'src' },
            ],
          },
        },
      },
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HtmlWebpackPlugin({ filename: 'round.html', template: './src/round.html' }),
    new HtmlWebpackPlugin({ filename: 'Login.html', template: './src/Login.html' }),
    new HtmlWebpackPlugin({ filename: 'create_account.html', template: './src/create_account.html' }),
    ...(!isDevelopment ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : [])
  ],

  optimization: {
    minimize: !isDevelopment,
    minimizer: [new CssMinimizerPlugin()],
  },
};
