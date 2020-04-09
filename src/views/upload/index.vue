<template>
  <div class="app-container">
    <el-upload
      drag
      action="http://47.105.182.216:2500/index/upload/upload"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1"
      accept=".zip"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传zip文件，上传文件并转化</div>
    </el-upload>
    <el-upload
      drag
      action="http://47.105.182.216:2500/index/upload/optimize"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1"
      accept=".zip"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传zip文件,上传文件并优化</div>
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
    },

    handlePreview(file) {
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleSuccess(res, file, fileList) {
      if (res.code) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      this.fileList = []
    }
  }
}
</script>

<style scoped>
</style>

