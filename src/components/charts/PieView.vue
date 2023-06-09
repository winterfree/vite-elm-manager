<template>
  <el-card shadow="hover">
    <template #header>
      <div class="title-wrapper">
        <div class="title">用户地区分布情况</div>
        <div class="radio-wrapper">
          <el-radio-group v-model="radioSelect" size="small">
            <el-radio-button label="环形" @click="changePie('环形')" />
            <el-radio-button label="饼图" @click="changePie('饼图')" />
          </el-radio-group>
        </div>
      </div>
    </template>
    <div class="chart-wrapper">
      <v-chart :option="radioSelect === '饼图' ? circularOptions() : annularOptions()"></v-chart>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['pieData'],
  data () {
    return {
      radioSelect: '环形',
      skeLoading: true
    }
  },
  methods: {
    changePie (str) {
      this.radioSelect = str
    },
    circularOptions () {
      return {
        title : {
          text: '用户分布',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京','上海','深圳','杭州','其他']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: [
              {value:this.pieData.beijing, name:'北京'},
              {value:this.pieData.shanghai, name:'上海'},
              {value:this.pieData.shenzhen, name:'深圳'},
              {value:this.pieData.hangzhou, name:'杭州'},
              {value:this.pieData.qita, name:'其他'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    annularOptions () {
      return {
        title : [{
          text: '用户分布',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '总用户量',
          subtext: '320',
          x: '38.5%',
          y: '42.5%',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          },
          textAlign: 'center'
        }],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '80%',
          top: 'middle',
          data: ['北京','上海','深圳','杭州','其他']
        },
        tooltip : {
          trigger: 'item',
          formatter: function(params) {
            const str = params.seriesName + '<br />' +
              params.marker + params.data.name + '<br />' +
              '数量：' + params.data.value +  '<br />' +
              '占比：' + params.percent + '%'
            return str
          }
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            data: [
              {value:this.pieData.beijing, name:'北京'},
              {value:this.pieData.shanghai, name:'上海'},
              {value:this.pieData.shenzhen, name:'深圳'},
              {value:this.pieData.hangzhou, name:'杭州'},
              {value:this.pieData.qita, name:'其他'}
            ],
            label: {
              show: true,
                position: 'outter',
                formatter: function(params) {
                  return params.data.name
                }
            },
            labelLine: {
              length: 5,
              length2: 3,
              smooth: true
            },
            clockwise: false,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            },
            center: ['40%', '50%'],
            radius: ['45%', '60%']
            
          }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.title-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  .radio-wrapper {
    position: absolute;
    right: 0;
  }
}
.chart-wrapper {
  display: flex;
  flex-direction: column;
  height: 452px;
}
</style>