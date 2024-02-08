const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './index.html', 
        filename: 'index.html', 
        favicon: './favicon.ico', 
      }),
      // Add InjectManifest for service worker configuration
        new InjectManifest({
          swSrc: './src-sw.js', 
          swDest: 'src-sw.js', 
          }),
          

      // Add WebpackPwaManifest to generate a web app manifest file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Another text editor for you to use!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],


    module: {
      rules: [
        // Add CSS loader rule
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Add Babel loader rule
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
