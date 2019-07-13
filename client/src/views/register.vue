<template>
  <div class="index">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账户</div>
      <div class="content">
        <!-- 表单 -->
        <form action>
          <InputGroup label="昵称" placeholder="例如: 周周" v-model="user.name" />
          <InputGroup label="邮箱" placeholder="请填写邮箱" v-model="user.email" />
          <InputGroup label="密码" type="password" placeholder="请填写密码" v-model="user.password" />

          <InputGroup label="确认密码" type="password" placeholder="请确认密码" v-model="user.password2" />
        </form>
        <div class="btn_wrap">
          <Ybutton :disabled="isDisabled" @click="registerClick">注册</Ybutton>
        </div>
      </div>
    </div>

    <div class="footer_wrap">
      |
      <button class="login" @click="$router.push('/login')">前往登录页面</button>|
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/inputGroup";
import Ybutton from "../components/YButton";

export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        eamil: "",
        password: "",
        password2: ""
      }
    };
  },
  components: {
    InputGroup,
    Ybutton
  },
  computed: {
    isDisabled() {
      if (
        this.user.name &&
        this.user.email &&
        this.user.password &&
        this.user.password2
      )
        return false;
      else return true;
    }
  },
  methods: {
    registerClick() {
      // 验证
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        console.log("请输入正确的邮箱 @ @");
        return;
      }

      if (this.user.password !== this.user.password2) {
        console.log("两次密码不一致");
        return;
      }

      this.$axios.post('/api/register', this.user)
      .then(res => {
        console.log('success')
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style scoped lang='scss'>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    color: #20af0e;
  }
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
  .login {
    font-size: 16px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #7b8ca9;
  }
}
</style>
