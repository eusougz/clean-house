const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:3333/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
