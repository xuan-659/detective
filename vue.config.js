/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-16 17:19:52
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false, // 关闭运行的时候就代码检查
  // outputDir: path.join(__dirname, 'dist', pck.name),
  // publicPath: '/' + pck.name,
  // devServer: {
  //   open: false, //设置自动打开
  //   port: 8000, //设置端口
  // },
  configureWebpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    };
  },
  chainWebpack(config) {
    // 解决i18n控制台警告
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
