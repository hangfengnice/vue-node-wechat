<template>
  <div class='address_book'>
    <Top title="通讯录" btn_icon="user-plus" />
    <div class="container">
      <div class="content_wrap">
        <UserCell 
        v-for="friend of friendsList"
        :key= 'friend._id'
        :user='friend'
         />
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import UserCell from '../components/userCell'

export default {
  name: "contact",
  components: {
    Top,
    UserCell
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
