<template>
  <el-skeleton
    class="ske-container" animated>
    <template #template>
      <el-skeleton-item variant="text" class="ske-ske-title" />
      <div class="ske-item-wrapper" style="margin-top: 15px;">
        <div
          v-for="(item, index) in 7"
          :key="index"
          style="
            display: flex;
            align-items: center;
            height: 20px;
            padding:  6px 20px 6px 0;
          "
        >
          <el-skeleton-item
            variant="circle"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
            "
          />
          <el-skeleton-item
            variant="text"
            style="
              margin-left: 10px;
              margin-right: 10px;
              width: 60px;
            "
          />
          <el-skeleton-item
            variant="text"
            style="
              flex: 1;
              text-align: right;
            "
          />
        </div>
      </div>
      
    </template>
  </el-skeleton>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.ske-container {
  width: 332px;
  --el-skeleton-circle-size: 20px;
  .ske-ske-title {
    margin-top: 20px;
    width: 50px;
  }
}
</style>