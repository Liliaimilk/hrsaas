<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="hanlerimage"
      :limit="1"
      :on-remove="removeImg"
      :file-list="fileList"
      :on-change="changeImg"
      :http-request="upload"
      :class="{disabled: fileComputed }"
      :before-upload="beforevalidate"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="percent" :percentage="percent" type="line" status="success" :format="format" style="width:180px" />
    <!-- <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog> -->

    <!-- 二维码 -->
    <el-dialog title="图片二维码" :visible.sync="showDialog" @close="imgUrl=''">
      <!-- 图片预览 -->
      <el-row type="flex" justify="center">
        <!-- 二维码 -->
        <canvas ref="myCanvas" />
      </el-row>
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import QrCode from 'qrcode'
import COS from 'cos-js-sdk-v5' // 引入腾讯云cos包
// 实例化COS对像
const cos = new COS({
  SecretId: 'AKIDd2B3fmhLjpeCTTCepkiQs50e17wUllVY',
  SecretKey: 'FDvMXR4RYOxHK6apmSrzrTpujIabMq31'
})
export default {

  data() {
    return {
      // 上传的文件列表,
      fileList: [],
      imgUrl: '',
      showDialog: false,
      currentId: '',
      percent: 0
    }
  },
  computed: {
    // 当fileList有数据时，不显示加号
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 获取对文件重新编排的数据
    hanlerimage(file) {
      console.log(file)
      this.imgUrl = file.url
      this.showQrCode(this.imgUrl)
      this.showDialog = true
    },
    // 删除图片
    removeImg(file) {
      console.log(this.fileList)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      console.log(this.fileList)
    },
    // 添加图片
    changeImg(file, fileList) {
      console.log('64')
      this.fileList = fileList.map(item => item)
    },
    beforevalidate(file) {
      console.log('68')
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      //   检查格式
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //   检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      //   保存当前上传id
      this.currentId = file.uid
      return true
    },
    //   上传
    upload(params) {
    //   console.log(params.file, '74')
      if (params.file) {
        cos.putObject({
          Bucket: 'liiliaimilk-hrsaasimg-1313160482', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percent = progressData * 100
          }
        }, (err, data) => {
          console.log(err || data)
          //   判断是否成功
          if (!err && data.statusCode === 200) {
            // 将传回来的网址id覆盖上传时保存在fileList的网盘id
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentId) {
                // upload 是为了在保存信息时的成功提示
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            this.percent = 0
          }
        })
      }
    },
    // 进度条
    format(percentage) {
      return percentage === 100 ? '100%' : `${percentage}%`
    },

    // 二维码
    showQrCode(url) {
      console.log(url)
      if (url) {
      // url存在的情况下 才弹出层
        this.showDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    }
  }

}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
