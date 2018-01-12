const path = require('path');
const resolvePath = rPath => path.resolve(__dirname, rPath);
module.exports = {
  port: 8080,
  publicPath: '/',
  appDist: resolvePath('../dist'),
  appStatic: resolvePath('../static'),
  appSrc: resolvePath('../src'),
  appHtml: resolvePath('../src/index.html'),
  appMainJs: resolvePath('../src/main.js'),
  appPackageJson: resolvePath('../package.json'),
  vendor: [
    'react',
    'react-dom',
    'react-hot-loader',
    'react-router',
    'redux',
    'react-redux',
    'prop-types',
    'isomorphic-fetch',
    'es6-promise',
    'redux-thunk',
    'classnames',
  ],
}