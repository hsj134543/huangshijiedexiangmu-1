<template>
  <div class="app-container">
    <el-form ref="BugDetail" :model="bugDetail" label-width="120px">
      <el-form-item v-for="(item,idx) of bugDetails" :key="idx" :label="item.label">
        <div v-if="item.type == 'date'">{{ transformDate(bugDetail[item.prop]) }}</div>
        <div v-else>{{ bugDetail[item.prop] }}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bugDetail } from '@/api/main'
import { bugDetails } from './contacts'
import { format } from 'date-fns'

export default {
  name: 'BugDetail',
  data() {
    return {
      bugDetails,
      bugDetail: {
        id: '',
        name: '',
        description: '',
        repair_plan: '',
        create_time: '',
        create_name: '',
        last_update_time: '',
        last_update_name: ''
      }
    }
  },
  mounted() {
    bugDetail({
      id: this.$route.params.id
    }).then(res => {
      // 获取漏洞详情
      // console.log('bugDetail', res.data) // for debug
      this.bugDetail = res.data
    }).catch(err => {
      this.$message.error(err)
    })
  },
  methods: {
    transformDate(unix) {
      return format(unix * 1000, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
</style>
