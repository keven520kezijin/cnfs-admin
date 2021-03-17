<template>
  <div class="login-container">
    <img class="logo-img" src="@/assets/logo.svg">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">CNFS存储平台管理系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            class="inp-form"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              class="inp-form"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-form-item class="yam-item" prop="verifyCode">
          <div class="yzm-box">
            <el-input
              ref="verifyCode"
              v-model="loginForm.verifyCode"
              class="yzm-input"
              placeholder="验证码"
              name="verifyCode"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
            <div src="" class="yzm-box" alt="" @click="getYzm">
              <img ref="yzmImg" class="yzm-img" src="" alt="">
            </div>
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn ripple btn-lg"
          @click.native.prevent="handleLogin"
        >登录</el-button>

        <div style="position: relative">
          <div class="tips">
            <span>Username : admin</span>
            <span>Password : any</span>
          </div>
          <div class="tips">
            <span style="margin-right: 18px">Username : editor</span>
            <span>Password : any</span>
          </div>

          <!-- <el-button
            class="thirdparty-button"
            type="primary"
            @click="showDialog = true"
          >
            Or connect with
          </el-button> -->
        </div>
      </el-form>
    </div>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      verifyURL: '',
      loginForm: {
        username: '',
        password: '',
        // username: "henwen",
        // password: "123456",
        verifyCode: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.getYzm()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getYzm() {
      this.$refs.yzmImg.src = `//47.104.20.233:8089/cnfs-platform/userin/getVerify?flag=${Math.random()}`
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
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
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        console.log('loginForm: ', this.loginForm)
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.getYzm()
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #333;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("~@/assets/login-1.jpg");
  position: relative;
  .logo-img {
    position: absolute;
    top: 50px;
    left: 100px;
    height: 50px;
  }
  .inp-form {
    position: relative;
    &::after {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      display: block;
      height: 20px;
      width: 1px;
      background: #e5e5e5;
    }
  }
  .login-box {
    box-sizing: border-box;
    padding: 40px;
    width: 602px;
    height: 642px;
    background-image: url("~@/assets/login-2.png");
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100px;
  }
  .el-input {
    display: inline-block;
    height: 49px;
    width: 85%;
    padding: 0 20px;

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
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e5e5e5;
    background: #fff;
    border-radius: 5px;
    color: #454545;
    margin-bottom: 50px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
@keyframes animate {
  0% {
    left: -20%;
  }
  100% {
    left: 110%;
  }
}

.yam-item {
  border: none !important;
  margin: 0 !important;
  ::v-deep {
    .el-form-item__content {
      padding-right: 0 !important;
    }
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 60px 0;
    margin: 0 auto;
    overflow: hidden;
    .yzm-box {
      display: flex;
      justify-content: space-between;
      .yzm-input {
        width: 240px;
        border: 1px solid #e5e5e5;
        background: #fff;
        border-radius: 5px;
        color: #454545;
        margin-bottom: 50px;
      }
      .yzm-box {
        height: 47px;
        width: 140px;
        background: #ccc;
        img {
          height: 47px;
          width: 140px;
        }
      }
    }
    .login-btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      padding: 0 !important;
    }
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
    margin-top: 40px;
    .title {
      font-size: 26px;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      text-align: left;
      position: relative;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 120%;
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, #fff 5%, #fff 100%);
        animation: animate 2s linear forwards;
      }
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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
