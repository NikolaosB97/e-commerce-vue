const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new (require('webpack')).DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
      })
    ]
  },
  // Aggiungi qui il devServer per configurare il proxy
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://abcd-12-34-56-78.ngrok.io', // sostituisci con il tuo URL ngrok
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  }
});