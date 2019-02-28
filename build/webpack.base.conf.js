var path = require('path')
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        loaders: [
            {
                loader: 'style-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            },
        ]
    },
      {
        test: /\.less$/,
        loaders: [
              {
                  loader: 'style-loader',
                  options: {
                      sourceMap: true,
                  },
              },
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true,
                  },
              },
              {
                  loader: 'less-loader',
                  options: {
                      sourceMap: true,
                  },
              },
          ]
      },
      {
        test: /\.scss$/,
        loaders: [
            {
                loader: 'style-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            },
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

module.exports = webpackConfig
