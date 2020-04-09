<template>
  <div class="dashboard-table">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, idx) of userTableKeys"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.type == 'map'">{{ getVal(item.prop, scope.row[item.prop]) }}</span>
          <span v-else-if="item.type == 'date'">{{ transformDate(scope.row[item.prop]) }}</span>
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
            @click="handleValidUser(scope.row.uid)"
          >审核</el-button>
          <el-button
            type="text"
            @click="handleLockUser(scope.row.uid)"
          >锁定</el-button>
          <el-button
            type="text"
            @click="handleUnlockUser(scope.row.uid)"
          >解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { types, statuss, userTableKeys } from './contacts'
import { validUser, lockUser, unlockUser } from '@/api/manage'
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
      types,
      statuss,
      userTableKeys
    }
  },
  methods: {
    handleValidUser(uid) {
      // 管理员审核用户
      validUser(qs.stringify({
        uid
      })).then(res => {
        // console.log('validUser', res) // for debug
        this.$message.success('审核成功')
        location.reload()
      })
    },

    handleLockUser(uid) {
      // 管理员锁定用户
      lockUser(qs.stringify({
        uid
      })).then(res => {
        // console.log('lockUser', res) // for debug
        this.$message.success('锁定成功')
        location.reload()
      })
    },

    handleUnlockUser(uid) {
      // 管理员解锁用户
      unlockUser(qs.stringify({
        uid
      })).then(res => {
        // console.log('unlockUser', res) // for debug
        this.$message.success('解锁成功')
        location.reload()
      })
    },

    getVal(prop, val) {
      switch (prop) {
        case 'type':
          return types[val]
        case 'status':
          return statuss[val]
      }
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
