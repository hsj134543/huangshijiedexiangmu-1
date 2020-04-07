<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="openAddBugDialog">添加漏洞</el-button>

    <!-- 漏洞列表 -->
    <DashBoardTable :table-data="tableData" />

    <el-dialog
      title="添加漏洞"
      :visible.sync="addBugDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="addBugForm" :model="addBugForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addBugForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="addBugForm.description"
            type="textarea"
            autosize
          />
        </el-form-item>
        <el-form-item label="方案">
          <el-input
            v-model="addBugForm.repair_plan"
            type="textarea"
            autosize
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBugDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddBug">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DashBoardTable from './dashboard-table'
import { getBugList, addBug, checkName } from '@/api/main'
import qs from 'qs'

export default {
  name: 'Dashboard',
  components: {
    DashBoardTable
  },
  data() {
    return {
      tableData: [],
      addBugDialog: false,
      addBugForm: {
        name: '',
        description: '',
        repair_plan: ''
      }
    }
  },
  mounted() {
    getBugList().then(res => {
      // 获取漏洞列表
      // console.log('getBugList', res.data) // for debug
      this.tableData = res.data.data
    }).catch(err => {
      this.$message.error(err)
    })
  },
  methods: {
    openAddBugDialog() {
      this.addBugDialog = true
    },

    handleAddBug() {
      // 添加漏洞
      checkName(qs.stringify({
        name: this.addBugForm.name
      })).then(res => {
        // console.log('checkName', res.data) // for debug
        addBug(qs.stringify(this.addBugForm)).then(res => {
          // console.log('addBug', res.data) // for debug
          this.$message.success('添加成功')
          location.reload()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(err => {
        this.$message.error(err)
      })
    },

    handleClose() {
      // 关闭添加漏洞弹窗
      this.addBugForm = {
        name: '',
        description: '',
        repair_plan: ''
      }
      this.addBugDialog = false
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
