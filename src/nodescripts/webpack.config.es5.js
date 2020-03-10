const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    es5: [
      './src/js/es5.js'
    ],
    es5Food: [
      './src/js/foodbanks/index.js'
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              modules: false,
              targets: {
                browsers: [
                  '> 1%'
                ]
              }
            }]
          ]
        }
      }
    }]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../../public/')
  }
};
