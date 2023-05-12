import Layout from '@/layout';

export default {
  path: '/detection',
  component: Layout,
  redirect: '/detection/detection',
  name: 'detection',
  children: [
    {
      path: '/detection/detection',
      name: 'detection',
      component: () => import('@/views/Detection/index'),
      meta: {
        title: 'detection',
        icon: 'tree',
      },
    },
  ],
};
