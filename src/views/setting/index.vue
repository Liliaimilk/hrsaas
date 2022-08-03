<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <div>
              <el-button type="primary" size="small" @click="showDialog=true">+新增角色</el-button>
              <el-table
                :data="list"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  label="序号"
                  width="180"
                />
                <el-table-column
                  prop="name"
                  label="角色名称"
                  width="180"
                />
                <el-table-column
                  prop="description"
                  label="描述"
                />
                <el-table-column
                  label="操作"
                >
                  <template slot-scope="{row}">
                    <el-row justify="center" type="flex">
                      <el-button type="text" @click="managerKey(row.id)">分配权限</el-button>
                      <el-button type="text" @click="editInfo(row.id)">修改</el-button>
                      <el-button type="text" @click="delInfo(row.id)">删除</el-button>
                    </el-row>
                  </template>

                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination
                  :page-size="page.pagesize"
                  layout="total, prev, pager, next"
                  :total="page.total"
                  @current-change="currentPage1"
                />
              </div>
            </div>
            <PopDialog ref="formData" :show="showDialog" @updateList="loadListInfo" @show="showDialog=false" />
          </el-tab-pane>

          <!-- 公司信息 -->
          <el-tab-pane label="公司信息">
            <el-form :model="formData" label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width:500px"
                /></el-form-item>
              <el-form-item
                v-model="formData.companyAddress"
                label="公司地址"
              >
                <el-input
                  disabled
                  style="width:500px"
                />
              </el-form-item>
              <el-form-item
                label="
                    公司电话"
              >
                <el-input
                  v-model="formData.companyPhone"
                  disabled
                  style="width:500px"
                />
              </el-form-item>
              <el-form-item
                label="
                      邮箱"
              >
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width:500px"
                />
              </el-form-item>
              <el-form-item
                label="
                        介绍"
              >
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  rows="3"
                  disabled
                  style="width:500px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!-- 分配权限 -->
        <el-dialog :visible="showRole" title="权限管理" @close="cancelBtn">
          <!-- <el-form :model="formData">
            <el-form-item>
              <el-input />
            </el-form-item>
            <el-form-item>
              <el-input />
            </el-form-item>

          </el-form> -->
          <el-tree
            ref="tree"
            :data="data"
            :props="defaultProps"
            show-checkbox
            check-strictly
            default-expand-all
            node-key="id"
            :default-checked-keys="defaultSelect"
          />
          <el-row slot="footer" type="flex" justify="center">
            <el-button type="primary" @click="saveRole">确定</el-button>
            <el-button @click="cancelBtn">取消</el-button>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, updateInfo, assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'
import PopDialog from './componts/Pop.vue'
import { getPermissionList } from '@/api/permisson'
import { createTreeList } from '@/utils'
export default {
  components: {
    PopDialog
  },
  data() {
    return {
      data: [],
      roleId: '',
      defaultSelect: [],
      defaultProps: {
        // 默认label:label 需改成要显示的key
        label: 'name'
      },
      showRole: false,
      showDialog: false,
      PopData: [],
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0 //
      },
      // formData: {
      //   name: '',
      //   address: '',
      //   phone: '',
      //   mail: '',
      //   intro: ''
      // }
      formData: {

      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.loadListInfo()
    this.loadCompany()
  },
  methods: {

    // 获取角色列表
    async loadListInfo() {
      const result = await getRoleList({
        page: this.page.page,
        pagesize: this.page.pagesize
      })
      this.list = result.rows
      this.page.total = result.total
      // console.log(result)
    },
    // 获取公司信息
    async loadCompany() {
      this.formData = await getCompanyInfo(this.companyId)
      // console.log(this.formData)
    },

    // 翻页更新
    currentPage1(newPage) {
      this.page.page = newPage
      this.loadListInfo()
    },
    editInfo(id) {
      // console.log(id)
      this.$refs.formData.updateInfo(id)
      this.showDialog = true
      // this.id = id
    },
    // 删除
    async delInfo(id) {
      await this.$confirm('你确定删除吗')
      await deleteRole(id)
      this.loadListInfo()
      this.$message.success('操作成功')
    },
    // 管理权限
    async managerKey(id) {
      this.roleId = id
      this.data = createTreeList(await getPermissionList(id), '0')
      this.showRole = true
      // 获取权限点
      const { permIds } = await updateInfo(id)
      this.defaultSelect = permIds
      // console.log(permIds)
    },
    // 保存
    async saveRole() {
      // this.$refs.tree.getCheckedKeys() 直接获取已经选中的key值
      await assignPerm({ id: this.roleId, permIds: this.$refs.tree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.showRole = false
    },
    // 取消
    cancelBtn() {
      this.data = []
      this.showRole = false
    }
  }
}
</script>

<style>
.el-tabs__item{
  font-size: 18px;
}
</style>
