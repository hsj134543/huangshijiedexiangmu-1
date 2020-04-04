<template>
  <div class="app-container">
    <div>
      <el-input v-model="formData.old_password" placeholder="请输入旧密码">
        <template slot="prepend">旧密码：</template>
      </el-input>
    </div>
    <div>
      <el-input v-model="formData.new_password" placeholder="请输入新密码">
        <template slot="prepend">新密码：</template>
      </el-input>
    </div>
    <el-button type="primary" @click="handleModifyPwd">修改密码</el-button>
  </div>
</template>

<script>
import { modifyPwd } from '@/api/user'
import qs from 'qs'
const Base64 = require('js-base64').Base64

export default {
  data() {
    return {
      formData: {
        old_password: '',
        new_password: ''
      }
    }
  },
  methods: {
    Base64Encode(pwd) {
      const str = `21232f297a57a5a743894a0e4a801fc3${pwd}`
      return Base64.encode(str)
    },

    handleModifyPwd() {
      const username = sessionStorage.getItem('username') || ''
      const { old_password, new_password } = this.formData
      modifyPwd(qs.stringify({
        username,
        old_password: this.Base64Encode(old_password),
        new_password: this.Base64Encode(new_password)
      })).then(res => {
        // console.log('modifyPwd', res) // for debug
        this.$message.success('修改密码成功')
        this.formData = {
          old_password: '',
          new_password: ''
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 300px;
    margin: 10px 0;
  }
</style>

