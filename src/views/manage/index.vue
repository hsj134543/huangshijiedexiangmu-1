<template>
  <div class="app-container">
    <el-button type="primary" @click="handleClearAche">清除缓存</el-button>
    <ManageTable :table-data="tableData" />
  </div>
</template>

<script>
import ManageTable from './manage-table'
import { getUserList, clearAche } from '@/api/manage'
export default {
  components: {
    ManageTable
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    getUserList().then(res => {
      // 获取用户列表
      // console.log('getUserList', res) // for debug
      this.tableData = res.data.data
    }).catch(err => {
      this.$message.error(err)
    })
  },
  methods: {
    handleClearAche() {
      // 清除缓存
      clearAche().then(res => {
        // console.log('clearAche', res) // for debug
        this.$message.success('清除缓存成功')
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>

