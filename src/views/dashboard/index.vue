<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}
      <PageTools :show-before="true">
        <span slot="before">我真的好想你</span>
        <template v-slot:after>
          <el-button size="small" type="primary" @click="show=true">新增员工</el-button>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterStatus" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{row}">
              <span>{{ row.timeOfEntry | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{row}">
              <el-switch
                :value="row.enableState===1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="200px">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delUser(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="total" @current-change="change" />
        </el-row>
      </el-card>
      <!-- 新增成员 -->
      <dialog-add :show-dialog.sync="show" />
    </div>
  </div>
</template>

<script>
import { getemployeesInfo, delUser } from '@/api/employees'
import { mapGetters } from 'vuex'
import employees from '@/api/constant/employees'
import DialogAdd from './components/dialogAdd.vue'

// import PageTools from '@/components/PageTools'

export default {
  name: 'Dashboard',
  components: {
    DialogAdd
    // PageTools
  },
  data() {
    return {
      show: false,
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getemployeesInfo()
  },
  methods: {
    // 获取员工信息
    async getemployeesInfo() {
      this.loading = true
      const { rows, total } = await getemployeesInfo(this.page)
      console.log(rows, total)
      this.total = total
      this.list = rows
      this.loading = false
    },

    // 格式化数据
    formatterStatus(row, column, cellValue, index) {
      const obj = employees.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },

    // 分页刷新数据
    change(newPage) {
      this.page.page = newPage
      this.getemployeesInfo()
    },
    // 删除用户
    async delUser(id) {
      try {
        await this.$confirm('确定删除此员工吗？')
        await delUser(id)
        this.$message.success('删除成功')
        this.getemployeesInfo()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
