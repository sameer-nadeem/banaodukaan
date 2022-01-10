const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://accounts.bdstaging.com:5000',
      changeOrigin: true,
    })
  );
};
