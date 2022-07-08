// eslint-disable-next-line @typescript-eslint/no-var-requires
const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api', '/socket.io'], {
      target: 'https://circuit-synergy.herokuapp.com/',
      changeOrigin: true,
      ws: true,
      router: {
        '/socket.io': 'https://circuit-synergy.herokuapp.com/',
      },
    })
  );
};
