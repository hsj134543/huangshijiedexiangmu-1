<template>
  <div class="dashboard-container">
    <div class="dashboard-tabs">
      <el-card
        v-for="(item, idx) of tabs"
        :key="idx"
        :class="activeTab === idx ? 'dashboard-tab--active' : 'dashboard-tab'"
        @click.native="activeTab = idx"
      >
        {{ item }}
      </el-card>
    </div>
    <DashBoardTable :table-data="tableData" />
    <ModifyBtn @click.native="drawer = true" />
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import DashBoardTable from './dashboard-table'
import ModifyBtn from './dashboard-modifybtn'
import { getBugList } from '@/api/main'

export default {
  name: 'Dashboard',
  components: {
    DashBoardTable,
    ModifyBtn
  },
  data() {
    return {
      drawer: false,
      tabs: ['漏洞信息修改页', '漏洞信息录入页', '漏洞报告优化页'],
      activeTab: 0,
      tableData: []
    }
  },
  mounted() {
    getBugList().then(res => {
      // console.log('getBugList', res.data) // for debug
      this.tableData = res.data.data
    })
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  &-tab,
  &-tab--active {
    width: 30%;
    height: 100px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &-tab {
    background-color: #eee;
  }
  &-tab--active {
    background-color: #09baf0;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
