<template>
  <div class="index">
    <TabBar :data='tabbarData'></TabBar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from "../components/tabBar";

export default {
  name: "index",
  data(){
return {
  tabbarData: [
    {title: '微信', icon: 'comment',path: "/chats"},
    {title: '通讯录', icon: 'address-book',path: "/contact"},
    {title: '发现', icon: 'compass',path: "/discover"},
    {title: '我', icon: 'user',path: "/me"},

  ]
}
  },

  components: {
    TabBar
  }
};
</script>

<style scoped lang='scss'>
.index {
  height: 100%;
  width: 100%;
}
</style>
