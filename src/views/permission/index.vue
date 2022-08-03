<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template v-slot:after>
          <el-button type="primary" class="addBtn" @click="addPermission(0,'0')">+新增权限</el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <!-- 添加按钮只到2级菜单 -->
            <el-button v-if="row.type===1 || row.type===2" type="text" @click="addPermission(row.type,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 弹层 -->
      <el-dialog :visible="showDialog" :title="showTitle" @close="btnCancel">
        <!-- 表单 :rules="rules"-->
        <el-form ref="formData" :model="formData" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <!-- 按钮可视 -->
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, getPermissionDetail, updatePermission } from '@/api/permisson'
import { createTreeList } from '@/utils'
export default {
  data() {
    return {
      showDialog: false,
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑菜单' : '增加菜单'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限点
    async getPermissionList() {
      this.list = createTreeList(await getPermissionList(), '0')
      console.log(this.list, '49')
    },

    // 删除权限点
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取点击添加的所属的id和菜单级别
    addPermission(type, id) {
      this.formData.type = type + 1
      this.formData.pid = id
      this.showDialog = true
    },

    // 编辑回显
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },

    // 保存权限
    btnOK() {
      this.$refs.formData.validate().then(() => {
        // 新增菜单没有id
        // 编辑更新
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        // 新增保存
        return addPermission(this.formData)
      }).then(() => {
        //  提示消息
        // console.log(this)
        if (this.formData.id) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.getPermissionList()
        this.showDialog = false
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },
    // 取消
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.formData.resetFields()
      this.showDialog = false
    }

  }

}
</script>

<style>
</style>
