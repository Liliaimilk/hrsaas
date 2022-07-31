<template>
  <div>
    <el-dialog :visible="showDialog" title="增加员工" width="50%" @close="btnCancel">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="formData.timeOfEntry"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="聘用形式" prop="forOfEmployment">
          <el-select v-model="formData.formOfEmployment" placeholder="请选择">
            <el-option
              v-for="item in Employees"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="formData.departmentName" placeholder="请选择" @focus="getDepartInfo" />

          <el-tree v-if="showTree" :data="depts" :props="{ label: 'name' }" @node-click="selectNode" />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="formData.correctionTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-row type="flex" justify="center">

          <el-button @click="btnCancel">取 消</el-button>
          <el-button type="primary" @click="addEmployee">确 定</el-button>
        </el-row>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getDepartInfo } from '@/api/departments'
import { addEmployee } from '@/api/employees'
import { createTreeList } from '@/utils'
import Employees from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      Employees, // 引用过来的需先赋值，不然报错
      loading: false,
      showTree: false,
      depts: {},
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '员工名不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 10, message: '员工名在1-10之间' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, trigger: 'blur', message: '手机号码格式不正确' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定添加
    async addEmployee() {
      try {
        await this.$refs.formData.validate()
        await addEmployee(this.formData)
        this.$emit('update:showDialog', false)
        this.$parent.getDepartInfo()
      } catch (error) {
        console.log(error)
      }
    },

    // 部门树形结构
    async getDepartInfo() {
      this.loading = true
      this.showTree = true
      const { depts } = await getDepartInfo()
      this.depts = createTreeList(depts, '')
      this.loading = false
    },

    // 点击树形节点渲染input
    selectNode(node) {
      // console.log(node)
      this.formData.departmentName = node.name
      this.showTree = false
    },
    // 取消
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.formData.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss">
.el-dialog__header{
  display: flex;
  align-items: center;
}
</style>
