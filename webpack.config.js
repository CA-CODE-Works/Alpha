const path = require('path');
const glob = require('glob');
const PATHS = {
  src: path.join(__dirname, 'src')
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Minification options here -> https://github.com/DanielRuf/html-minifier-terser#options-quick-reference
const minificationOptions = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: false,
  removeScriptTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true,
  sortAttributes: true,
  sortClassName: true,
  useShortDoctype: true
};
const minificationOptionsWithComments = JSON.parse(JSON.stringify(minificationOptions));
minificationOptionsWithComments.removeComments = false;

const allChunks = ['style', 'roads', 'shelters', 'lifeline'];

// usage
//    excludeChunks: excludeChucksExcept("roads"),
//    excludeChunks: excludeChucksExcept("roads","alerts"),
const excludeChucksExcept = (...args) => allChunks.filter(x => !args.includes(x));

module.exports = {
  entry: {
    style: ['./src/css/_index.scss'],
    roads: ['./src/js/roads/index.js'],
    shelters: ['./src/js/shelters/index.js'],
    lifeline: ['./src/js/lifeline/index.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/serverfiles' },
      { from: 'src/img', to: 'img' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/[chunkhash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      filename: 'en/index.html',
      template: 'src/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/news/index.html',
      template: 'src/news/index.html',
      excludeChunks: allChunks,
      minify: minificationOptionsWithComments
    }),
    new HtmlWebpackPlugin({
      filename: 'news/post.html',
      template: 'src/news/post.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/about/index.html',
      template: 'src/about/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    //* ************** Begin Lifeline
    new HtmlWebpackPlugin({
      filename: 'en/apply-discounted-phone-service/index.html',
      template: 'src/services/apply-discounted-phone-service/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-online-discounted-phone-service/index.html',
      template: 'src/services/apply-online-discounted-phone-service/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),

    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),

    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/no-not-sure/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/no-not-sure/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/not-qualified/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/not-qualified/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/not-sure-qualified/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/not-sure-qualified/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/qualified/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/qualified/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/qualified-income/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/qualified-income/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-if-you-can-get-discounted-phone-service/total-income/index.html',
      template: 'src/services/check-if-you-can-get-discounted-phone-service/total-income/index.html',
      excludeChunks: excludeChucksExcept('lifeline'),
      minify: minificationOptions
    }),

    //* ************** End Begin Lifeline

    new HtmlWebpackPlugin({
      filename: 'en/apply-for-disability-insurance-benefits/index.html',
      template:
        'src/services/apply-for-disability-insurance-benefits/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-cal-grant/index.html',
      template: 'src/services/apply-for-cal-grant/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-cal-grant/step-1/index.html',
      template: 'src/services/apply-for-cal-grant/step-1/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-cal-grant/step-2/index.html',
      template: 'src/services/apply-for-cal-grant/step-2/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-cal-grant/finish/index.html',
      template: 'src/services/apply-for-cal-grant/finish/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-lane-closures/index.html',
      template: 'src/services/check-lane-closures/index.html',
      excludeChunks: excludeChucksExcept('roads'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/contact-us/index.html',
      template: 'src/services/contact-us/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/contact-us/results/index.html',
      template: 'src/services/contact-us/results/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/contact-us/home/index.html',
      template: 'src/services/contact-us/home/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/sign-up-for-local-emergency-alerts/index.html',
      template: 'src/services/sign-up-for-local-emergency-alerts/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/request-birth-certificate/index.html',
      template: 'src/services/request-birth-certificate/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/find-minimum-wage-your-city/index.html',
      template: 'src/services/find-minimum-wage-your-city/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/state-california-employee-holidays/index.html',
      template: 'src/services/state-california-employee-holidays/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/find-food-banks-near-you/index.html',
      template: 'src/services/find-food-banks-near-you/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/find-shelters-near-you/index.html',
      template: 'src/services/find-shelter/index.html',
      excludeChunks: excludeChucksExcept('shelters'),
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/check-your-tap-water-quality/index.html',
      template: 'src/services/water/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),

    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/index.html',
      template: 'src/services/apply-for-unemployment-insurance/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/after-you-apply/index.html',
      template: 'src/services/apply-for-unemployment-insurance/after-you-apply/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/how-to-apply/index.html',
      template: 'src/services/apply-for-unemployment-insurance/how-to-apply/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/update-us-every-two-weeks/index.html',
      template: 'src/services/apply-for-unemployment-insurance/update-us-every-two-weeks/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/what-you-need-before-you-apply/index.html',
      template: 'src/services/apply-for-unemployment-insurance/what-you-need-before-you-apply/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/apply-for-unemployment-insurance/when-to-apply/index.html',
      template: 'src/services/apply-for-unemployment-insurance/when-to-apply/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
	new HtmlWebpackPlugin({
      filename: 'en/office-of-digital-innovation/index.html',
      template: 'src/office-of-digital-innovation/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),

    //* ************** End Begin Fire Stories

    new HtmlWebpackPlugin({
      filename: 'en/prepare-for-wildfire/index.html',
      template: 'src/services/steps-to-prepare-for-wildfire/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'en/considerations-after-wildfire/index.html',
      template: 'src/services/steps-to-take-after-wildfire/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),

    new HtmlWebpackPlugin({
      filename: 'en/hire-licensed-contractor-home-improvements/index.html',
      template:
        'src/services/hire-licensed-contractor-home-improvements/index.html',
      excludeChunks: allChunks,
      minify: minificationOptions
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'css/fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              publicPath: '../img'
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/')
  }
};
