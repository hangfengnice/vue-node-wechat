<template>
  <div class="circle">
    <Header title="朋友圈" btn_icon="camera" :isLeft="true" @rightClick="$router.push('/publish')"></Header>
    <div class="container">
      <Scroll ref="refresh" @pulldown="loadData" @pullup="loadMoreData">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{user.name}}</span>
            <div class="user_img">
              <img class="head_img" :src="user.avatar" alt />
            </div>
          </div>
        </div>
        <div class="content_wrapper">
          <CellView v-for="(moment, index) of momentList" :key="index" :momentObj="moment"></CellView>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import jwt_decode from "jwt-decode";
import CellView from "../components/cellView";
import Scroll from "../components/scroll";

export default {
  name: "moments",
  data() {
    return {
      momentList: [],
      page: 2,
      size: 3,
      loading: false
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
      if(this.loading){
        return
      }
      this.loading = true
      this.$axios.get("/api/profile/latest").then(res => {
        this.loading = false
        this.momentList = [...res.data];
        this.$refs.refresh.$emit("refresh");
      });
    },
    loadData() {
      this.page = 2;
      this.getLatestData();
    },
    loadMoreData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$axios.get(`/api/profile/${this.page}/${this.size}`).then(res => {
        // console.log(res.data)
        this.loading = false;
        const result = [...res.data];

        if (result.length > 0) {
          result.forEach(item => {
            this.momentList.push(item);
          });
          this.page++;
        } else {
          this.$refs.refresh.$emit("loadDone");
        }
      });
    }
  },
  components: {
    Header,
    CellView,
    Scroll
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
