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
        this.friendsList = res.data
      })
    }
  }

};
</script>

<style lang='scss' scoped>
.address_book {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  overflow: auto;
}

.search_wrap {
  background-color: #f1f1f1;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
}
.sear_content {
  height: 40px;
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.sear_content i {
  color: #888;
  margin-right: 10px;
}
.sear_content input {
  height: 36px;
  width: 90%;
  outline: none;
  border: none;
  font-size: 14px;
}

.count_wrap {
  min-height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  color: #888;
  font-size: 16px;
  width: 100%;
  line-height: 50px;
  text-align: center;
}
</style>
