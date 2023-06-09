<template>
  <base-card
    title="订单量"
    time="月"
    :value="orderMonth"
  > 
    <template v-slot:inner>
      <v-chart :option="getOptions()"></v-chart>
    </template>
    <template v-slot:footer>
      <div class="footer">
        <span>总订单量</span>
        <span>{{allOrderCount}}</span>
      </div>
    </template>
  </base-card>
</template>

<script>
import baseCardMixin from '../../../mixins/baseCardMixin'

export default {
  mixins: [baseCardMixin],
  props: ['orderMonth', 'allOrderCount', 'thirtyDate'],
  methods: {
    getOptions () {
      return {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            type: 'line',
            data: this.thirtyDate[1],
            areaStyle: {
              color: 'purple'
            },
            lineStyle: {
              width: 0
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }
        ],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #515a6e;
}
</style>