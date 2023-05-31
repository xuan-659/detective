/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-05-31 16:51:37
 */
import Layout from '@/layout';

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  name: 'user',
  children: [
    {
      path: '/user/user',
      name: 'user',
      component: () => import('@/views/User/index'),
      meta: {
        title: 'user',
        icon: 'tree',
      },
    },
  ],
};
