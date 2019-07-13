<template>
  <div class="tabbar">
    <router-link v-for="(item, index) of data" :key="index" :to="item.path" 

    class="tab-item">
      <div class="tab-item-icon">
        <i :class='"fa fa-"+item.icon'></i>
        
      </div>

      <div class='tab-item-lable'>

{{item.title}}
      </div>
    </router-link>
    <!-- <a href class="tab-item">
      <div class="tab-item-icon">
        <i class="fa fa-comment"></i>
      </div>
      <div class="tab-item-label">微信</div>
    </a>
    <a href class="tab-item">
      <div class="tab-item-icon">
        <i class="fa fa-address-book"></i>
      </div>
      <div class="tab-item-label">通讯录</div>
    </a>
    <a href class="tab-item">
      <div class="tab-item-icon">
        <i class="fa fa-compass"></i>
      </div>
      <div class="tab-item-label">发现</div>
    </a>
    <a href class="tab-item">
      <div class="tab-item-icon">
        <i class="fa fa-user"></i>
      </div>
      <div class="tab-item-label">我的</div>
    </a>-->
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    data: Array
  },
  created(){
    // console.log(this.data)
  }
};
</script>

<style scoped>
[data-v-a83bd3b0] {
  height: 55px;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-image: linear-gradient(180deg) no-repeat;
  background-size: 100% 1px;
  background-position: 0 0;
  background-color: #fafafa;
  display: flex;
  text-align: center;
}
.tab-item {
  display: block;
  padding: 7px 0;
  flex: 1;
}
.tab-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto 5px;
}
.tab-item-icon i {
  font-size: 1.3rem;
}
.tab-item-label {
  color: inherit;
  font-size: 12px;
  line-height: 1;
}
a {
  text-decoration: none;
  color: #888;
}
.router-link-active{
  color: #20af0e;
}
</style>
