<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <Treecode
          :tree-data="company"
          :is-root="true"
          @depts="loadDepartInfo"
          @showDialog="adddepart($event)"
        />
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <Treecode
            slot-scope="{data}"
            :tree-data="data"
            :is-root="false"
            @depts="loadDepartInfo"
            @showDialog="adddepart($event)"
            @editDialog="editdepts($event)"
          />
        </el-tree>
        <Treedialog
          ref="addDept"
          :showdialog="showdialog"
          :node="node"
          :show-dialog.sync="showdialog"
          @depts="loadDepartInfo"
        /></el-card>
    </div>
  </div>
</template>

<script>
import { createTreeList } from '@/utils/'
import Treecode from './components/tree-code.vue'
import { getDepartInfo } from '@/api/departments'
import Treedialog from './components/tree-dialog.vue'
export default {
  components: {
    Treecode,
    Treedialog
  },
  data() {
    return {
      showdialog: false,
      company: {},
      departs: [],
      node: null,
      defaultProps: {
        children: 'children',
        label: 'name',
        manager: 'manager'
      }
    }
  },
  created() {
    this.loadDepartInfo()
  },
  methods: {
    async loadDepartInfo() {
      const result = await getDepartInfo()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = createTreeList(result.depts, '')
    },
    adddepart(node) {
      this.showdialog = true
      this.node = node
    },
    editdepts(node) {
      this.showdialog = true
      this.node = node
      // 直接获取组件的vue实例，调用组件内的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style lang='scss' scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
.componey{
  // padding-bottom: 40px;
  border-bottom:1px solid #333;
  font-weight: 600;
}
}
</style>
