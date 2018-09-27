<template>
  <div class="login-page">
    <div class="login-section" v-show="showLogin">
      <h3>elm后台管理系统</h3>
      <el-form :model="loginForm" ref="loginForm">
        <el-form-item prop="username" label-position="left">
          <el-input v-model="loginForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login, getAdminInfo} from '../../api/getData'
  import {mapState, mapActions} from 'vuex'

  export default {
  	name: 'index',
  	data () {
  		return {
  			loginForm: {
  				username: '',
  				password: ''
  			},
  			showLogin: false
  		}
  	},
  	computed: {
  		...mapState(['adminInfo'])
  	},
  	mounted () {
  		this.showLogin = true
  		if (!this.adminInfo.id) {
  			this.getAdminData()
  		}
  	},
  	methods: {
  		...mapActions(['getAdminData']),
  		async submitForm (formname) {
  			this.$refs[formname].validate(async valid => {
  				if (valid) {
  					const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})

  					console.log(res)

  					if (res.status == 1) {
  						this.$message({
  							type: 'success',
  							message: '登录成功'
  						})
  						this.$router.push('/home')
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
  					})
  					return false
  				}
  			})
  		}
  	},
  	watch: {
  		adminInfo: function (newValue) {
  			if (newValue.id) {
  				this.$message({
  					type: 'success',
  					message: '检测到您之前登录过，将自动登录'
  				})
  				this.$router.push('/home')
  			}
  		}
  	}
  }
</script>

<style lang="scss" scoped>
  .login-section {
    width: 400px;
    margin: 100px auto;
    text-align: center;
  }
</style>
