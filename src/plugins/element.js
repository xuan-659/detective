import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import store from '@/store';

export default (app) => {
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};
