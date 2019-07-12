<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";

export default {
  name: "app",
  created() {
    if (localStorage.wxToken) {
      const decode = jwt_decode(localStorage.wxToken);
      this.$store.dispatch("setUser", decode);
    }
  }
};
</script>


<style lang="scss" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
