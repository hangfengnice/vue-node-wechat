<template>
  <div>
    <Header title="微信" btn_icon="plus" />
    <div class="container">
      <UserCell
        :count="item.count"
        @click="$router.push({name: 'chat', params:{user:item.target}})"
        v-for="item of chatDataList"
        :key="item._id"
        :user="item.target"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import UserCell from "../components/userCell";
import WSocket from "../socket";
export default {
  name: "chats",
  data() {
    return {
      chatDataList: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    WSocket.init(
      { user: this.user },
      message => {
        // console.log(message);
        this.setMsgCount(message);
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    setMsgCount(message) {
      // 判断
      let chatUser = this.chatDataList.filter(item => {
        return item.target._id == message.from;
      });
      if (chatUser.length > 0) {
        chatUser[0].count++;
        chatUser[0].message.push({
          msg: message.msg,
          source: "other"
        });
        this.saveMsg(
          chatUser[0].target,
          chatUser[0].count,
          chatUser[0].message
        );
      } else {
        this.getUserInfo(message);
      }
    },
    saveMsg(targetUser, count, msg) {
      const messageObj = {
        target: {
          avatar: targetUser.avatar,
          name: targetUser.name,
          _id: targetUser._id
        },
        count: count,
        message: msg,
        user_id: this.user.id
      };

      this.$axios
        .post("/api/chat/addmsg", messageObj)
        .then(res => console.log("数据保存成功"));
    },
    getUserInfo(message) {
      // 根据ID 查寻 id
      this.$axios(`/api/${message.from}`).then(res => {
        // console.log(res.data);
        const msg = [];
        msg.push({
          msg: message.msg,
          source: "other"
        });
        this.chatDataList.push({
          target: res.data,
          count: 1,
          message: msg
        });
        this.saveMsg(res.data, 1, msg);
      });
    }
  },
  components: {
    Header,
    UserCell
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$axios(`/api/chat/msg/${vm.user.id}`).then(res => {
        console.log(res.data);
        vm.chatDataList = res.data;
      });
    });
  }
};
</script>

<style lang='scss' scoped>
.chat {
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
</style>
