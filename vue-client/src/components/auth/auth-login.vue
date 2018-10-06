<template>
  <div class="auth-modal">
    <div class="container-crop ">
      <img src="../../assets/logo.png" class="logo" alt="logo">
      <h1>LOGIN</h1>
      <div class="social-login">
        <div class="circle facebook" @click="loginFacebook"><i class="fa fa-facebook" aria-hidden="true"></i></div>
        <div class="circle google"><i class="fa fa-google-plus" aria-hidden="true"></i></div>
        <div class="circle twitter"><i class="fa fa-twitter" aria-hidden="true"></i></div>
      </div>
      <el-row :gutter="20">
        <el-col :span="20" :offset="1">
          <el-form :model="loginInfo" :rules="rules" ref="loginInfo" label-width="100px" class="demo-ruleForm col-md-8">
            <el-form-item label="Email" prop="uid">
              <el-input v-model="loginInfo.uid"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="loginInfo.password"></el-input>
            </el-form-item>
            <div class="signup-btn">
              <el-button type="success" @click="submitLogin('loginInfo')">Login</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <div class="other-actions">
        <a class="btn-normal">Forger Password?</a>
        <a class="btn-normal">Have no account?</a>
      </div>
    </div>
  </div>
</template>

<script>
import {loadFbSdk, fbLogin} from '../../helper/authFacebook.js'
import {mapActions, mapGetters} from 'vuex'
import * as types from '../../store/types'

export default {
  name: 'AuthLogin',
  data () {
    return {
      loginInfo: {
        uid: '',
        password: ''
      },
      FB: window.FB,
      rules: {
        uid: [
          { required: true, message: 'Please input Email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' }
        ],
      }
    }
  },
  mounted () {
    loadFbSdk()
  },
  methods: {
    ...mapActions({
      loginEmail: types.LOG_IN,
      setConnected: types.SET_CONNECTION,
      setCurrentUser: types.SET_CURRENT_USER,
      getFacebookUser: types.GET_FACEBOOK_USER
    }),
    loginFacebook () {
      fbLogin(this.loginOptions)
        .then(response => {
          if (response.status === 'connected') {
            this.setConnected({status: true, provider: 'fb'})
            this.getFacebookUser(response)
          } else {
            this.setConnected({status: false})
          }
        })
    },
    submitLogin (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          console.log('Begin login!!')
          this.loginEmail(this.loginInfo)
        } else {
          console.log('error login!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters({
      connected: types.CONNECTED
    })
  },
  watch: {
    connected: function (value) {
      if (this.connected.status === true) {
        this.$router.push({ name: 'NewsFeed'})
        this.$notify({
          title: 'Login Successful',
          message: "Let's discover our system",
          type: 'success',
          offset: 100
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .social-login{
//   margin: 20px 0;
// }
// .circle{
//   margin: 0 20px;
// }
// .logo{
//   width: 100px;
// }
// .auth-modal{
//   height: 90vh;
// }
// .container-crop {
//   border-radius: 5px;
//   background-color: white;
//   max-width: 30rem;
//   text-align: center;
//   margin: 4em auto;
//   padding: 1em 0;
// }
// .input-light-grey{
//   margin: 1em 4em;
//   text-align: left;
//   input{
//     width: 10rem;
//   }
// }
// .other-actions{
//   margin: 20px 0;
// }
</style>