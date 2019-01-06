module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ...require('./aliases.config').webpack,
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  }
}
