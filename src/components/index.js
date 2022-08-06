// 负责所有全局自定义组件的注册
import PageTolls from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import lang from './lang'
import tagsView from './TagsView'

export default {
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTolls)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('lang', lang)
    Vue.component('tagsView', tagsView)
  }
}
