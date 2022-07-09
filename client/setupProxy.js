// eslint-disable-next-line @typescript-eslint/no-var-requires
const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api'], {
      target: 'https://circuit-synergy.herokuapp.com/',
      changeOrigin: true,
      ws: true,
    })
  );
};
