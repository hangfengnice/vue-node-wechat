<template>
  <div class='mine'>
    <Top title="我" />
    <div class="container">
      <Info :userInfo="user" />
      <div class="btn_wrapper">
        <Button @click='logOut'>退出登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import Info from "../components/info";
import Button from '../components/YButton'
export default {
  name: "me",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    Top,
    Info,
    Button
  },
  methods: {
    logOut(){ 
      localStorage.removeItem('wxToken')
      this.$router.push('/login')
    }
  }
};
</script>

<style lang='scss' scoped>
.mine{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container{
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  background-position-x: #f1f1f1;
}
.btn_wrapper{
  box-sizing: border-box;
  padding: 20px;
}
</style>