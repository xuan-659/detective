/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-01 22:44:27
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';
import Layout from '@/layout';
import account from './modules/account';
// import access from './modules/access';
import user from './modules/user';
import role from './modules/role';
import detection from './modules/detection';

// 私有路由
export const privateRoutes = [account, role, user, detection];

// 公开路由
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    name: '/',
    // 重定向到/profile页面
    redirect: '/home',
    component: Layout,
    // 只有一层的不要使用这个
    // meta: {
    //   title: 'profile',
    //   icon: 'el-icon-user',
    // },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index'),
        meta: {
          title: 'home',
        },
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

// 白名单
const whiteList = ['/login'];
/**
 * @description: 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 从哪里来
 * @param {*} next  是否要去
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 存在 token,继续判断如果是登录页面的时候直接到首页，否则判断是有已经加载了菜单
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (!store.getters.isLoadMenu) {
        // 处理用户权限，筛选出需要添加的路由
        // 模拟请求后菜单数据
        let menusList = ['account', 'access', 'role', 'detection'];
        if (store.getters.userInfo.userType == 0) {
          menusList.push('user');
        }
        const filterRoutes = await store.dispatch('menu/filterRoutes', menusList);
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item);
        });
        next({ ...to, replace: true });
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    }
  } else {
    // 到登录页面
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
