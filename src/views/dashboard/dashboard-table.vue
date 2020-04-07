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
            @click="openEditBugDialog(scope.row)"
          >修改</el-button>
          <el-button
            type="text"
            @click="handleRemoveBug(scope.row.id, scope.row.name)"
          >删除漏洞</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改漏洞"
      :visible.sync="editBugDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="addBugForm" :model="editBugForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editBugForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="editBugForm.description"
            type="textarea"
            autosize
          />
        </el-form-item>
        <el-form-item label="方案">
          <el-input
            v-model="editBugForm.repair_plan"
            type="textarea"
            autosize
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBugForm = false">取 消</el-button>
        <el-button type="primary" @click="handleEditBug">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { bugTableKeys } from './contacts'
import { deleteBug, editBug } from '@/api/main'
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
      bugTableKeys,
      editBugDialog: false,
      editBugForm: {
        id: '',
        name: '',
        description: '',
        repair_plan: ''
      }
    }
  },
  methods: {
    openEditBugDialog(row) {
      const { id, name, description, repair_plan } = row
      this.editBugDialog = true
      this.editBugForm = {
        id,
        name,
        description,
        repair_plan
      }
    },

    handleEditBug() {
      // 修改bug
      editBug(qs.stringify(this.editBugForm)).then(res => {
        // console.log('editBug', res.data) // for debug
        this.$message.success('修改成功')
        location.reload()
      }).catch(err => {
        this.$message.error(err)
      })
    },

    handleClose() {
      // 关闭添加漏洞弹窗
      this.editBugForm = {
        id: '',
        name: '',
        description: '',
        repair_plan: ''
      }
      this.editBugDialog = false
    },

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
