const path = require('path')

module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: '@/views',
        components: '@/components'
      }
    }
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // },
  devServer: {
    hotOnly: true, // 热更新
    proxy: {
      /* 添加多个跨域请求：/admin、/api... */
      '^/api': {
        target: `http://152.136.185.210:5000`, //访问的服务器地址
        changeOrigin: true, //开启代理
        ws: true, //启用websockets
        pathRewrite: {
          //重写路径
          '^/api': '' //替换规则， 如果你的真实的api路径中没有/admin这一个路径，把这句加上，如果本来就有/admin这一路径的话，这句一定要去掉，要不然会导致域名找不到的
        }
      }
    }
  }
}
