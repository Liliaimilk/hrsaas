import Layout from '@/layout'
export default {
  // 因为子模块在layout组件上显示，也就是都位于layout的二级路由里面
  path: '/approvals',
  //   name: '/approvals',
  component: Layout,
  children: [{
    // path为空为默认的，表示该路由为当前二级路由的默认路由
    path: '',
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
