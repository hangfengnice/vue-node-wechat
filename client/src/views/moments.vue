<template>
  <div class="circle">
    <Header title="朋友圈" btn_icon="camera" :isLeft="true"></Header>
    <div class="container">
      <div class="scroll-wrap">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{user.name}}</span>
            <div class="user_img">
              <img class="head_img" :src="user.avatar" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/top";
import jwt_decode from "jwt-decode";

export default {
  name: "moments",
  data() {
    return {
      momentList: []
    };
  },
  computed: {
    user() {
      const token = localStorage.wxToken;
      const decode = jwt_decode(token);
      return decode;
    }
  },
  created() {
    this.getLatestData();
  },
  methods: {
    getLatestData() {
      this.$axios.get("/api/profile/latest").then(res => {
        this.momentList = [...res.data];
      });
    }
  },
  components: {
    Header
  }
};
</script>

<style lang='scss' scoped>
.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
  z-index: 3;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: white;
}
.content_wrapper {
  padding-top: 20px;
}
</style>
