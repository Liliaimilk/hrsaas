import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './lang'

import '@/styles/index.scss' // global css
// 引入工具类
import * as filter from '@/filters'
import Components from '@/components' //global component
import App from './App'
import store from './store'
import router from './router'
// 打印
import Print from 'vue-print-nb'

import '@/icons' // icon
import '@/permission' // permission control
// 将所有导出的对象放入directives
import * as directives from '@/directive'
// 注册全局混入

import checkButton from '@/mixin/checkButton'
// 遍历所有的导出的指令对象 完成自定义全局注册
// Object.keys() 把对象放进数组遍历
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 注册全局
Object.keys(filter).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filter[key])
})

Vue.use(Print)
Vue.mixin(checkButton)

// Vue.use()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 全局注册
Vue.use(Components)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key) // $t为方法，会去的对应的语言包里寻找对应的内容
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
