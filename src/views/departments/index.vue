<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <Treecode :tree-data="company" :is-root="true" />
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <Treecode slot-scope="{data}" :tree-data="data" :is-root="false" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createTreeList } from '@/utils/'
import Treecode from './components/tree-code.vue'
import { getDepartInfo } from '@/api/departments'
export default {
  components: {
    Treecode
  },
  data() {
    return {
      company: {},
      departs: [],
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
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = createTreeList(result.depts, '')
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
