<template>
  <div>
    <el-dialog :title="showTitle" :visible="showdialog" center @close="btnCancel">
      <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" style="width:80%" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="formData.code" style="width:80%" />

        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="formData.manager" style="width:80%" @focus="options">
            <el-option v-for="item in people" :key="item.id" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="formData.introduce" style="width:80%" type="textarea" :rows="3" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getemployInfo } from '@/api/employees'
import { addDepartments, getDepartInfo, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  props: {
    showdialog: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      //   required: true
      default: null
    }
  },
  data() {
    // 验证同级下是否名字相同
    var checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartInfo()
      var ispart = false
      if (this.formData.id) {
        // 编辑模式下的校验
        ispart = depts.filter(item => item.pid === this.formData.pid && item.id !== this.formData.id).some(item => item.name === value)
      } else {
        // 增加模式下的校验
        const { depts } = await getDepartInfo()
        ispart = depts.filter(item => item.pid === this.node.id).some(item => item.name === value)
      }
      ispart ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 验证是有相同id
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartInfo()
      var ispart = false
      if (this.formData.id) {
        ispart = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        ispart = depts.some(item => item.code === value && value)
      }
      ispart ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      people: [],
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入名称' },
          { min: 1, max: 20, message: '请输入1-20字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入编号' },
          { min: 1, max: 20, message: '请输入1-20字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }

        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
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
    // 弹出框多选
    async options() {
      this.people = await getemployInfo()
    //   console.log(result)
    },
    submit() {
      // 手动验证后调用增加方法
      this.$refs.formData.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            // 编辑部门
            await updateDepartments(this.formData)
          } else {
            // 增加部门
            await addDepartments({
              ...this.formData,
              pid: this.node.id
            })
          }
          this.$emit('depts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      // 覆盖重置formData
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.formData.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭
    },
    // async getDepartDetail(id) {
    // }
    async getDepartDetail(id) {
      // 因为props的传值是异步的，this.node.id有可能取到值，有可能取不到
      // 所以采用父组件调用直接传值
    //   const { formData } = await getDepartDetail(this.node.id)

      // 将点击部门详情覆盖给formData
      this.formData = await getDepartDetail(id)
      console.log(this.formData)
    }
  }
}
</script>

<style>

</style>
