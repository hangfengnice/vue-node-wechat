<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <!-- 表单 -->
      <form action>
        <InputGroup label="账号" placeholder="请填写邮箱" v-model="user.email" />
        <InputGroup label="密码" type="password" placeholder="请填写密码" v-model="user.password" />
      </form>
      <div class="btn_wrap">
        <Ybutton :disabled="isDisabled" @click="loginClick">登录</Ybutton>
      </div>
    </div>
    <div class="footer_wrap">
      |
      <button class="register" @click="$router.push('/register')">注册账号</button>|
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/inputGroup";
import Ybutton from "../components/YButton";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    InputGroup,
    Ybutton
  },
  computed: {
    isDisabled() {
      if (this.user.email && this.user.password) return false;
      else return true;
    }
  },
  methods: {
    loginClick() {
      // 验证
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        console.log("请输入正确的邮箱 @ @");
        return;
      }

      // 实现登录
      this.$axios.post("/api/login", this.user).then(res => {
        const { token } = res.data;

        // 存储 本地 localStorage
        localStorage.setItem("wxToken", token);

        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 80px;
  font-size: 22px;
  text-align: center;
}
.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
  .register {
    font-size: 16px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #7b8ca9;
  }
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
