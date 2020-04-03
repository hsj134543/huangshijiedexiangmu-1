<template>
  <div class="dashboard-table">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="漏洞名称"
      />
      <el-table-column
        prop="create_time"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ transformDate(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_name"
        label="创建人"
      />
      <el-table-column
        prop="last_update_time"
        label="最后更新时间"
      >
        <template slot-scope="scope">
          <span>{{ transformDate(scope.row.last_update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_update_name"
        label="最后更新人"
      />
    </el-table>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'DashboardTable',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    transformDate(unix) {
      return format(unix * 1000, 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-table {
    width: 90%;
    height: 500px;
    padding: 20px;
    margin: 20px 0;
    background: #eee;
  }
}
</style>
