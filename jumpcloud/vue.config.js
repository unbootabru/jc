module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:8005',
          changeOrigin: true
        },
      }
    }
  }