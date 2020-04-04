<template>
  <div class="app-container">
    <ManageTable :table-data="tableData" />
  </div>
</template>

<script>
import ManageTable from './manage-table'
import { getUserList } from '@/api/manage'
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
      // console.log('getUserList', res) // for debug
      this.tableData = res.data.data
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>

