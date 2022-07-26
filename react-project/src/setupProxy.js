const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    // '/api',
    // createProxyMiddleware({
    //   target: 'https://cnodejs.org',  // 远程服务器地址
    //   changeOrigin: true
    // })
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9999',  // 远程服务器地址
      changeOrigin: true
    })
  )
}