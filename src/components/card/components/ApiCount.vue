<template>
  <base-card
    title="API请求量"
    time="月"
    :value="'213'"
  > 
    <template v-slot:inner>
      <v-chart :option="getOptions()"></v-chart>
    </template>
    <template v-slot:footer>
      <div class="footer">
        <span>累计API请求</span>
        <span>{{allApiCount}}</span>
      </div>
    </template>
  </base-card>
</template>

<script>
import baseCardMixin from '../../../mixins/baseCardMixin'

export default {
  mixins: [baseCardMixin],
  props: ['apiMonth', 'allApiCount', 'thirtyDate'],
  methods: {
    getOptions () {
      return {
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        xAxis: {
          type: 'value',
          show: false,
          max: '500'
        },
        yAxis: {
          type: 'category',
          show: false,
        },
        tooltip: {
          formatter: '每月最高请求次数：500',
        },
        series: [
          {
            type: 'bar',
            showBackground: true,
            stack: 'total',
            data: [200],
            barWidth: 10,
            itemStyle: {
              color: '#2d8cf0'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 5,
                shadowColor: 'rgba(0,0,0,0.3)'
              },
            }
          },
          // {
          //   type: 'bar',
          //   stack: 'total',
          //   data: [300],
          //   itemStyle: {
          //     color: '#eee'
          //   },
          //   emphasis: {
          //     itemStyle: {
          //       color: '#d1dbe5'
          //     },
          //   }
          // },
          {
            type: 'custom',
            stack: 'total',
            data: [200],
            renderItem: (params, api) => {
              const value = api.value(0)
              const endPoint = api.coord([value, 0])
              return {
                type: 'group',
                position: endPoint,
                children: [{
                  type: 'path',
                  shape: {
                    d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                    x: -5,
                    y: -20,
                    width: 10,
                    height: 10,
                    layout: 'cover'
                  },
                  style: {
                    fill: '#2d8cf0'
                  }
                }, {
                  type: 'path',
                  shape: {
                    d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                    x: -5,
                    y: 10,
                    width: 10,
                    height: 10,
                    layout: 'cover'
                  },
                  style: {
                    fill: '#2d8cf0'
                  }
                }]
              }
            }
          }
        ],
        
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