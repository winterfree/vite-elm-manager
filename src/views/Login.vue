<template>
  <Particles v-show="bgShow" id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
  <transition name="form-fade" mode="in-out">
    <div class="login" v-if="showLogin">
      <div>
        <el-affix z-index="1000" class="affix-wrapper" position="top" :offset="300">
          <el-button type="primary" @click="drawer = true" :icon="drawer === false ? Setting : Close">
          </el-button>
        </el-affix>
        <el-drawer v-model="drawer" size="25%">
          <template #header>
            <h4>更多设置</h4>
          </template>
          <template #default>
            <div class="drawer-item">
              <span>显示粒子背景</span>
              <el-switch v-model="bgShow" />
            </div>
          </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelClick">cancel</el-button>
              <el-button type="primary" @click="confirmClick">confirm</el-button>
            </div>
          </template>
        </el-drawer>
      </div>
      <div class="login-header">
        <img src="./../assets/vue.svg" alt="logo" class="login-header-logo"/>
        <span class="login-header-title">Riya 数据管理平台</span>
      </div>
      <div class="login-desc">一个由Vite构建，基于Vue3 + Element Plus设计的后台管理系统</div>
      <div class="login-container">
        <div class="login-content raised">
          <h1>管理员账号登录</h1>
          <div class="login-main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名" :prefix-icon="User"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginForm.password" :prefix-icon="Lock"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox-group v-model="loginForm.type">
                  <el-checkbox label="记住密码" name="type" />
                </el-checkbox-group>
                <el-link type="primary" :underline="false" style="margin-left: 170px">忘记密码？</el-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
              </el-form-item>
            </el-form>
            <p class="tip">
              <i class="iconfont">&#xe77e;</i>
              未登录过的新用户将自动注册
            </p>
          </div>
        </div>
      </div>
      <nav-foot></nav-foot>
    </div>
  </transition>
</template>

<script>
import NavFoot from './../components/NavFoot.vue'
import { User, Lock, Setting, Close } from "@element-plus/icons-vue"
import { ElMessageBox } from 'element-plus'
import { login } from './../api'
import { mapActions, mapState } from 'vuex'
import { options, particlesInit, particlesLoaded } from './../config/particles'

export default {
  components: {
    NavFoot
  },
  setup () {
    return {
      User, Lock, Setting, Close
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        type: [], // 表单记住密码单选框
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      showLogin: false,
      options,
      bgShow: false, // 是否显示粒子背景
      drawer: false, // 显示右侧设置
      particlesInit,
      particlesLoaded
    }
  },
  mounted () {
    this.showLogin = true
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  methods: {
    ...mapActions(['getAdminData']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('manage')
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          });
          return false;
        }
      })
    },
    cancelClick() {
      this.drawer = false
    },
    confirmClick() {
      ElMessageBox.confirm('是否关闭？')
      .then(() => {
        this.drawer = false
      })
      .catch(() => {
        // catch error
      })
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  watch: {
    adminInfo: function (newValue){
      if (newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到您之前登录过，将自动登录'
        })
        this.$router.push('manage')
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
.affix-wrapper {
  float: right;
  top: 50%;
}
.drawer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  color: rgba(0,0,0,.85);
}

.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 70px 0 0 0;
  text-align: center;
  overflow: auto;
  background-color: #324057;
  .login-header {
    position: relative;
    height: 44px;
    line-height: 44px;
    .login-header-logo {
      height: 44px;
      margin-right: 16px;
      vertical-align: top;
      z-index: 100;
    }
    .login-header-title {
      position: relative;
      top: 2px;
      color: #fff;
      // color: rgba(0,0,0,.85);
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir,helvetica neue,Arial,Helvetica,sans-serif;
    }
  }
  .login-desc {
    margin-top: 12px;
    margin-bottom: 40px;
    color: #fff;
    // color: rgba(0,0,0,.45);
    font-size: 14px;
    z-index: 100;
  }
  .login-container {
    padding: 0 0 32px 0;
    .login-content {
      position: relative;
      width: 400px;
      height: 250px;
      margin: 0 auto;
      background: rgba(255,255,255,.4);
      border-radius: 5px;
      padding: 30px 20px;
      transition: all 1s;
      h1 {
        flex: 1;
        font-size: 18px;
        font-weight:bold;
        color: #1890ff;
      }
      .login-main {
        position: absolute;
        width: 325px;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        .submit_btn {
          width: 100%;
        }
        .tip {
          color: rgba(0,0,0,.45);
          font-size: 14px;
          float: left;
        }
      }
    }
    .raised:hover {
      box-shadow:13px 13px 15px rgba(0, 0, 0, 0.3);
      background: rgba(255,255,255,1);
    }
  }
}

.form-fade-enter-active, .form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>