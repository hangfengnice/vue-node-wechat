<template>
  <div class="find">
    <Top title="发现" />
    <div class="content">
      <Cell :src='cellData.src' :title='cellData.title' :path='cellData.path'  ></Cell>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import Cell from '../components/cell'

export default {
  name: "discover",
  components: {
    Top,
    Cell
  },
  data(){
    return {
      cellData: {
        src: "pyq.jpg",
        title: '朋友圈',
        path: '/moments'
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.find {
  width: 100%;
  height: calc(100% - 105px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  margin-top: 50px;
}
</style>