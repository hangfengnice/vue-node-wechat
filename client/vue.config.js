
module.exports = {
  devServer: {
    open : true,
    proxy: {
      '/api': {
        target: "http://localhost:5000/",
        ws: true,
        chnageOrigin: true,
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  }
}