<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>{{title}}</span>
        <el-button class="button" type="primary" text bg>{{time}}</el-button>
      </div>
    </template>
    <div class="load" v-show="showLoading" v-loading="showLoading"></div>
    <div class="value">{{value}}</div>
    <div class="chart">
      <slot name="inner"></slot>
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: String,
    time: String,
    value: String,
    showLoading: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.load {
  margin-top: 34px;
  margin-bottom: 0;
}
.value {
  color: rgba(0,0,0,.85);
  font-size: 30px;
  letter-spacing: 1px;
  margin-top: 4px;
  margin-bottom: 0;
  overflow: hidden;
}
.chart {
  margin-top: 15px;
  height: 50px;
}
.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}
.total {
  font-size: 14px;
  color: rgba(0,0,0,.85);
}
</style>