<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">我想你{{ total }}遍</span>
        <template v-slot:after>
          <el-button size="small" type="primary" @click="show=true">新增员工</el-button>
          <el-button size="small" type="warning" @click="$router.push({path:'/import'})">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="手机号" sortable="" prop="mobile" />
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
          <el-table-column label="操作" sortable="" fixed="right" width="280px">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail${row.id}`)">查看</el-button>
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
import employees from '@/api/constant/employees'
import { formatDate } from '@/filters'
import DialogAdd from './components/dialogAdd.vue'

// import PageTools from '@/components/PageTools'

export default {
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
    },

    // excel导出
    exportData() {
      import('@/vendor/Export2Excel').then(async excel => {
        const headers = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        // 一次获取全部的员工信息
        const { rows } = await getemployeesInfo({ page: 1, size: this.total })
        const data = this.formTion(headers, rows)
        // 复杂表头
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        // 合并表头
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        // console.log(data, '132')
        excel.export_json_to_excel({
        // data里的一个数组表示header里的一行
        //  header: ['姓名', '性别'], // 表头 必填
        //  data: [['帅哥', 'shuage'], ['男']], // 具体数据 必填

          header: Object.keys(headers), //  ['姓名'，'手机号'，'入职日期'....]
          data,
          filename: '员工资料表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx',
          multiHeader,
          merges // 非必填
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 排列excel表头
    // 将数组转化为二维数组
    formTion(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          // 格式化时间
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
            // 格式化聘用方式
          } else if (headers[key] === 'formOfEmployment') {
            var obj = employees.hireType.find(obj => obj.id === item[headers[key]])
            console.log(obj, '155')
            return obj ? obj.value : '未知'
          }
          // console.log(item[headers[key]])
          return item[headers[key]]
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
