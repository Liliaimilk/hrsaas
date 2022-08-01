<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 修改账号 -->
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="formData"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
              :model="formData"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="formData.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 个人详情 -->
          <el-tab-pane label="个人详情">
            <!-- 内置动态组件切换 -->
            <component :is="UserComponent" />
          </el-tab-pane>

          <!-- 岗位信息 -->
          <el-tab-pane label="岗位信息">
            <component :is="UserJob" />

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import UserJobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    UserJobInfo
  },
  data() {
    return {
      // 获取当前路由的id值
      UserComponent: UserInfo,
      UserJob: UserJobInfo,
      userId: this.$route.params.id,
      formData: {
        username: '',
        password2: ''
      },
      // userInfo: [],
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名不能超过10个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 1, max: 12, message: '密码长度不能超过12个字符', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    // 获取个人信息
    async getUserDetailById() {
      // console.log(this.userId)
      this.formData = await getUserDetailById(this.userId)
      console.log(this.formData)
    },

    // 保存员工信息
    async updateUser() {
      try {
        await this.$refs.formData.validate()
        console.log(this.formData.password2)
        // this.formData.password2 应该已经是被覆盖了？
        await saveUserDetailById({ ...this.formData, password: this.formData.password2 })
        this.$message.success('修改成功')
      } catch (error) {
        console.log(error)
      }
    }

  }

}
</script>

<style>

</style>
