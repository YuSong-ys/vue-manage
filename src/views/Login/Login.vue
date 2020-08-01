<template>
  <div class="login">
    <el-form :model="form" label-width="120" style="padding:20px">
      <el-form-item label="用户名:">
        <el-input v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('/api/permission/getMenu', this.form).then(res => {
        res = res.data
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 300px;
  width: 500px;
  margin: 15% auto;
  background-color: #f2f6fc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .btn {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    .el-button {
      width: 150px;
    }
  }
}
</style>
