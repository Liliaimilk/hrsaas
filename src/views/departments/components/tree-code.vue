<template>
  <div style="width:100%">
    <el-row type="flex" justify="end" align="middle" style="height: 40px;width:100%">
      <el-col>
        <span>{{ treeData.name }}</span>
      </el-col>
      <el-col :span="5">
        <el-row type="flex" justify="space-between">
          <el-col><span>{{ treeData.manager }}</span></el-col>
          <el-col>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        // this.$message(command)
        console.log('12346')
        this.$emit('showDialog', this.treeData.id)
      } else if (command === 'edit') {
        // this.$message(command)
        this.$emit('editDialog', this.treeData)
      } else if (command === 'del') {
        // this.$message(command)
        // const result=  await delDepartments()
        this.$confirm('确定删除当前部门？').then(() => {
          return delDepartments(this.treeData.id)
        }).then(() => {
          this.$emit('depts')
          this.$message.success('删除成功')
        })
      }
    }
  }

}
</script>

<style>

</style>
