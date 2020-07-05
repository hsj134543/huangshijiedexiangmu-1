<template>
  <div class="app-container">
    <el-button type="primary" @click="handleClearAche">清除缓存</el-button>
    <ManageTable :table-data="tableData" :total="tableTotal" @tableParams="getparams" />
  </div>
</template>

<script>
import ManageTable from "./manage-table";
import { getUserList, clearAche } from "@/api/manage";
export default {
  components: {
    ManageTable
  },
  data() {
    return {
      tableData: [],
      tableTotal:0
    };
  },
  methods: {
    handleClearAche() {
      // 清除缓存
      clearAche()
        .then(res => {
          // console.log('clearAche', res) // for debug
          this.$message.success("清除缓存成功");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    getparams(val) {
      console.log(val, "getparams");
      getUserList(val)
        .then(res => {
          // 获取用户列表
          console.log("getUserList", res); // for debug
          this.tableData = res.data.data;
          this.tableTotal=res.data.total
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

