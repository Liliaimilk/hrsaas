import Layout from '@/layout'
export default {
  // 因为子模块在layout组件上显示，也就是都位于layout的二级路由里面
  path: '/social',
  name: '/social',
  component: Layout,
  children: [{
    // path为空为默认的，表示该路由为当前二级路由的默认路由
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
