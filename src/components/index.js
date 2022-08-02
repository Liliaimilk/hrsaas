// 负责所有全局自定义组件的注册
import PageTolls from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'

export default {
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTolls)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
  }
}
