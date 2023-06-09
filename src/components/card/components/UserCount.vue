<template>
  <base-card
    title="注册用户"
    time="月"
    :value="userMonth"
  > 
    <template v-slot:inner>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span>{{dod}}</span>
          <div :class="dayCompare ? 'increase' : 'decrease'"></div>
        </div>
        <div class="compare">
          <span>周同比</span>
          <span>{{wow}}</span>
          <div :class="dayCompare ? 'increase' : 'decrease'"></div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer">
        <span>总用户量</span>
        <span>{{allUserCount}}</span>
      </div>
    </template>
  </base-card>
</template>

<script>
import baseCardMixin from '../../../mixins/baseCardMixin'

export default {
  mixins: [baseCardMixin],
  props: ['userCount', 'allUserCount', 'userMonth', 'dod', 'wow', 'dayCompare', 'weekCompare']
}
</script>

<style lang="scss" scoped>
.compare-wrapper {
  display: inline-block;
  padding-top: 20px;
  .compare {
    font-size: 12px;
    margin-right: 12px;
    display: inline-block;
    .increase {
      width: 0;
      height: 0;
      border-width: 3px;
      border-color: transparent transparent red transparent;
      border-style: solid;
      display: inline-block;
      margin: 0 0 2px -3px;
    }
    .decrease {
      width: 0;
      height: 0;
      border-width: 3px;
      border-color: green transparent transparent transparent;
      border-style: solid;
      display: inline-block;
      margin: 2px 0 0 -3px;
    }
    span {
      margin-right: 8px;
      display: inline-block;
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #515a6e;
}
</style>