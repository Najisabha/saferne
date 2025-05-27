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
    filename: 'assets/js/[name].js', // JS في مجلد assets/js
    assetModuleFilename: (pathData) => {
      const ext = path.extname(pathData.filename).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
        return 'assets/images/[name][ext]';
      }
      if (['.woff', '.woff2', '.eot', '.ttf', '.otf'].includes(ext)) {
        return 'assets/fonts/[name][ext]';
      }
      return 'assets/misc/[name][ext]'; // أي ملف آخر
    },
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
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
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
    new HtmlWebpackPlugin({ filename: 'round2.html', template: './src/round2.html' }),
    new HtmlWebpackPlugin({ filename: 'Login.html', template: './src/Login.html' }),
    new HtmlWebpackPlugin({ filename: 'create_account.html', template: './src/create_account.html' }),
    ...(!isDevelopment ? [new MiniCssExtractPlugin({ filename: 'assets/css/[name].css' })] : [])
  ],

  optimization: {
    minimize: !isDevelopment,
    minimizer: [new CssMinimizerPlugin()],
  },
};
