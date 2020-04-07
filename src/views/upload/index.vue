<template>
  <div class="app-container">
    <el-upload
      action="http://47.105.182.216:2500/index/upload/upload"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit="1"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
    </el-upload>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      fileList: [],
      headers: {
        token: Cookies.get('vue_admin_template_token')
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
</style>

