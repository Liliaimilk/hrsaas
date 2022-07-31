<template>
  <div>公共
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      //       const arr = []
      //       results.forEach(item => {
      //         var userInfo = {}
      //         Object.keys(item).forEach(key => {
      //           userInfo[userRelations[key]] = item[key]
      //           console.log(userInfo, '23')
      //         })
      //         arr.push(userInfo)
      //       })
      //       await importEmployee(arr) // 调用导入接口
      //       console.log(arr)
      //     //   this.$router.back()
      //     }
      //   },

      //   遍历数组
      var newArr = results.map(item => {
        var userInfo = {}
        Object.key(item).forEach(key => {
          // 这里的key为中文
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key]), '/')
          } else {
            // 将中文的key值赋值给英文key值 再放入对象
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.back()
    },
    // 当excel中有日期格式的时候，实际转化的值为一个数字，我们需要一个方法进行转化
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>
</style>
