<template>
  <div>
    <el-dialog
      :title="showTitle"
      :visible="show"
      width="50%"
      @close="back"
    >
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" style="width:80%" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" style="width:80%" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button @click="back">取 消</el-button>
          <el-button type="primary" @click="btnOK">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateInfo, updateRole, addRole } from '@/api/setting'
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    //   showDialog: this.show,
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '增加部门'
    }
  },
  methods: {
    async updateInfo(id) {
      this.formData = await updateInfo(id)
      console.log(this.formData)
    },
    async btnOK() {
      try {
        // 只有校验通过的情况下 才会执行await的下方内容
        // roleForm这个对象有id就是编辑 没有id就是新增
        await this.$refs.form.validate()
        if (this.formData.id) {
          await updateRole(this.formData)
        } else {
          // 新增业务
        //   console.log(this.formData)

          await addRole(this.formData)
        }
        // 重新拉取数据
        this.$emit('updateList')
        this.$message.success('操作成功')
        this.$emit('show')
      } catch (error) {
        console.log(error)
      }
    },
    back() {
      this.formData = {
        name: '',
        description: ''
      }
      this.$refs.form.resetFields()
      this.$emit('show')
    }

  }

}
</script>

<style>

</style>
