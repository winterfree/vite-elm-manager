<template>
  <div class="manage-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <nav-left :is-collapse="isCollapse"></nav-left>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <nav-head @click-collapse="showCollapse"></nav-head>
      <div class="wrapper">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <nav-foot></nav-foot>
      </div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
import NavHead from './../components/NavHead.vue'
import NavLeft from './../components/NavLeft.vue'
import NavFoot from './../components/NavFoot.vue'
export default {
  components: {
    NavHead,
    NavLeft,
    NavFoot
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    showCollapse (isShow) {
      this.isCollapse = isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 240px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    // overflow-y: auto;
    transition: all .5s ease-in-out;
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 240px;
    transition: all .5s ease-in-out;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
  }
}
.wrapper {
  background-color: #eef0f3;
  height: calc(100% - 64px);
  padding: 20px;
}
</style>