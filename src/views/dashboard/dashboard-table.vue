<template>
  <div class="dashboard-table">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, idx) of bugTableKeys"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.type == 'data'">{{ transformDate(scope.row[item.prop]) }}</span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="do"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleRemoveBug(scope.row.id, scope.row.name)"
          >删除漏洞</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { bugTableKeys } from './contacts'
import { deleteBug } from '@/api/main'
import qs from 'qs'

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
      bugTableKeys
    }
  },
  methods: {
    handleRemoveBug(id, name) {
      // 删除bug
      deleteBug(qs.stringify({
        id,
        name
      })).then(res => {
        // console.log('deleteBug', res.data) // for debug
        this.$message.success('删除成功')
        this.tableData = res.data.data
        location.reload()
      })
    },

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
