import Layout from '@/layout'
// import { Icon } from 'element-ui'
export default {
  // 因为子模块在layout组件上显示，也就是都位于layout的二级路由里面
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    // path为空为默认的，表示该路由为当前二级路由的默认路由
    path: '',
    name: 'attendances',

    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤管理',
      icon: 'skill'
    }
  }]
}
