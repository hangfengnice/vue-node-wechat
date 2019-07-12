<template>
  <div class="publish">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
      <button @click="publish">发表</button>
    </div>
    <div class="content">
      <div class="text_wrap">
        <textarea placeholder="有什么想说的吗 @ @ ..." v-model='text'></textarea>
        <!-- 文件上传 -->
        <UpLoad :loading='loading' @getImgs="getImgs"></UpLoad>
      </div>
    </div>
    <Loading :loading='loading' />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import UpLoad from "../components/upLoad";
import Loading from '../components/loading'

export default {
  name: "publish",
  data() {
    return {
      text: "",
      imgs: [],
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
  components: {
    UpLoad,
    Loading
  },
  methods: {
    publish() {
      this.loading = true
      // console.log(this.imgs)
      const postData = {
        name: this.user.name,
        img: this.user.avatar,
        text: this.text,
        imgs: this.imgs.join("|")
      };

      this.$axios
        .post("/api/profile/add", postData)
        .then(res => {
          this.loading = false
          this.$router.push("/moments");
        })
        .catch(err => {});
    },
    getImgs(imgs) {
      imgs.forEach(file => {
        this.upLoadFile(file);
      });
    },
    upLoadFile(file) {
      let reader = new FileReader();
      const _this = this;
      reader.onload = function(e) {
        // console.log(e.target.result)
        _this.imgs.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang='scss' scoped>
.publish {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  line-height: 50px;
  justify-content: space-between;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
}
.header button:nth-child(2) {
  color: #20af0e;
}
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.text_wrap textarea {
  width: 100%;
  font-size: 14px;
  min-height: 60px;
  border: none;
  outline: none;
}
.text_wrap {
  margin-bottom: 16px;
}
</style>