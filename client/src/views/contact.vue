<template>
  <div>
    <Top title="通讯录" btn_icon="user-plus" />
  </div>
</template>

<script>
import Top from "../components/top";

export default {
  name: "contact",
  components: {
    Top
  },
  data(){
    return {
      friendsList: []

    }
  },
  created(){
this.getFriendsList()
  },
  methods: {
    getFriendsList(){
      this.$axios.get('/api/all')
      .then(res => {
        // console.log(res.data)
        this.getFriendsList = res.data
      })
    }
  }

};
</script>

<style lang='scss' scoped>
</style>
