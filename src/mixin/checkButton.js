// import store from '@/router'
// 混入 控制权限
// 根据key值也就是权限管理里的标识是否存在判断是否显示该权限
export default {
  methods: {
    checkButton(key) {
      const points = this.$store.getters.points
      console.log(points, '8')
      if (points && points.length) {
        return points.some(item => item === key)
      } else {
        return false
      }
    }
  }
}

