<template>
  <div class="auth-modal">
    <div class="container-crop ">
      <img src="../../assets/logo.png" class="logo" alt="logo">
      <h1>REGISTER</h1>
      <el-row :gutter="20">
        <el-col :span="20" :offset="1">
          <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm col-md-8 ">
            <el-form-item label="Email" prop="uid">
              <el-input v-model="user.uid"></el-input>
            </el-form-item>
            <el-form-item label="User Name" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="Phone" prop="phone">
              <el-input type="number" v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="resource">
              <el-radio-group v-model="user.gender">
                <el-radio :label="0">Male</el-radio>
                <el-radio :label="1">Female</el-radio>
                <el-radio :label="2">Other</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="signup-btn">
              <el-button type="primary" @click="submitSignUp('user')">Sign Up</el-button>
              <el-button @click="resetForm('user')">Reset</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import * as types from '../../store/types'
export default {
  name: 'AuthSignUp',
  data () {
    return {
      user: {
        name: '',
        phone: '',
        gender: 0,
        uid: '',
        password: '',
        provider: 'email'
      },
      rules: {
        uid: [
          { required: true, message: 'Please input Email', trigger: 'blur' },
          { min: 5, message: 'Please input Email Format', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Please input UserName', trigger: 'blur' },
          { min: 5, message: 'Name should more than 5 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          { min: 5, message: 'Password should more than 5 characters', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Phone is required and is number', trigger: 'blur' },
          { min: 9, message: 'Phone should be more than 9 numbers', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      createUser: types.CREATE_USER
    }),
    submitSignUp (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          console.log('submit!!');
          this.$http.post('users', this.user)
            .then(response => {
              if(response.status == 200) {
                this.$notify({
                  title: 'Register Successful',
                  message: 'Firstime, try to login',
                  type: 'success'
                });
                this.$router.push({ name: 'AuthLogin'})
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters({
      status: types.auth_STATUS
    })
  }
}
</script>
