<template>
  <div>
    <el-dialog :visible="showDialog" title="编辑角色" @close="cancelRole">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="cancelRole">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { assignRoles } from '@/api/employees'
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null

    }
  },
  data() {
    return {
      list: [],
      checkList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取全部角色
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      console.log(rows)
      this.list = rows
    },
    // 获取员工的角色
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
    },

    // 保存
    async saveRole() {
    //   console.log(this.checkListBox)
      await assignRoles({ id: this.userId, roleIds: this.checkList })
      this.$emit('update:showDialog', false)
    },
    // 取消
    cancelRole() {
      this.checkList = []
      console.log(this.checkListBox)

      this.$emit('update:showDialog', false)
    //   console.log(this.checkListBox)
    }
  }

}
</script>

<style>

</style>
