<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ isLogin ? '登录' : '注册' }}</h3>
        <div
          style="position: absolute; top: 10px; right: 0; cursor: pointer; color: #409EFF"
          @click="isLogin = !isLogin"
        >
          {{ isLogin ? '没有账号？ 注册' : '已有账号？ 登录' }}
        </div>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item v-if="!isLogin" prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="loginForm.name"
          placeholder="姓名"
          name="name"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item v-if="!isLogin" prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.code"
          class="input"
          maxlength="4"
          placeholder="请输入验证码"
        />
        <div class="imgCode" @click="getImgCode()">
          <img
            id="imgCode"
            alt="点击更换"
            title="点击更换"
          >
        </div>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLoginOrLogup"
      >{{ isLogin ? '登录' : '注册' }}</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: '',
        name: '',
        email: '',
        code: ''
      },
      isLogin: true,
      loginRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, message: '长度不能小于 3', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    getImgCode() {
      // 获取图片验证码
      const imgCodeSrc = 'http://47.105.182.216:2500/index/index/get_captcha'
      const objs = document.getElementById('imgCode')
      objs.src = imgCodeSrc
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLoginOrLogup() {
      if (this.isLogin) {
        this.handleLogin()
      } else {
        this.handleLogup()
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { username, password, ...rest } = this.loginForm
          const str = `21232f297a57a5a743894a0e4a801fc3${password}`
          this.$store.dispatch('user/login', {
            username,
            password: Base64.encode(str),
            action: username === 'admin' ? 'admin' : 'user',
            ...rest
          }).then(() => {
            this.$message.success('登录成功')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    },
    handleLogup() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { password, ...rest } = this.loginForm
          const str = `21232f297a57a5a743894a0e4a801fc3${password}`
          this.$store.dispatch('user/logup', {
            password: Base64.encode(str),
            ...rest
          }).then(() => {
            this.loading = false
            this.loginForm = {
              username: '',
              password: '',
              name: '',
              email: '',
              code: ''
            }
            this.isLogin = true
            this.$message.success('注册成功')
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .el-button + .el-button {
    margin-left: unset;
  }

  .imgCode {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 180px; /*设置图片显示的宽*/
    height: 50px; /*图片显示的高*/
    background: #e2e2e2;
    margin: 0;
    img {
      height: 50px;
      width: 180px;
      cursor: pointer;
    }
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
