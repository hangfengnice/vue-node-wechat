<template>
  <div class="information">
    <Header title="详细资料" btn_icon="ellipsis-h" :is-left="true" />
    <div class="container">
      <InfoCell :userInfo="targetUser" />
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import InfoCell from "../components/info";

export default {
  name: "information",
  components: {
    Header,
    InfoCell
  },
  computed: {
    targetUser() {
      return this.$store.getters.targetUser;
    }
  }
};
</script>

<style lang='scss' scoped>
.information {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  // background-color: #f1f1f1;
}

.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>