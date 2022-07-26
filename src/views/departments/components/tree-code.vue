<template>
  <div style="width:100%">
    <el-row type="flex" justify="end" align="middle" style="height: 40px;width:100%">
      <el-col>
        <span>{{ treeData.name }}</span>
      </el-col>
      <el-col :span="5">
        <el-row type="flex" justify="end">
          <el-col><span>{{ treeData.manager }}</span></el-col>
          <el-col>
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">查看部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
  }

}
</script>

<style>

</style>
