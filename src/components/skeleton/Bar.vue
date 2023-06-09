<template>
  <div style="position: absolute">
    <el-skeleton class="container" animated>
      <template #template>
        <div v-for="(item, index) in 5" :key="index" :class="`block block`+item">
          <el-skeleton-item class="list" />
          <el-skeleton-item class="list2" />
          <el-skeleton-item class="list3" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 30px;
  width: 775px;
  height: 270px;
  box-sizing: border-box;
  // 一个区域柱状图宽度：110px
  .block {
    position: absolute;
    bottom: 0;
    .list {
      position: absolute;
      width: 30px;
      height: 150px;
      bottom: 0;
    }
    .list2 {
      position: absolute;
      margin-left: 40px;
      width: 30px;
      height: 250px;
      bottom: 0;
    }
    .list3 {
      position: absolute;
      margin-left: 80px;
      width: 30px;
      height: 190px;
      bottom: 0;
    }
  }
  .block2 {
    margin-left: 140px;
  }
  .block3 {
    margin-left: 280px;
  }
  .block4 {
    margin-left: 420px;
  }
  .block5 {
    margin-left: 560px;
  }
}
</style>