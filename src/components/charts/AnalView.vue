<template>
  <div class="analysis">
    <el-card shadow="hover" :body-style="{ padding: '0 0 20px 0' }">
      <template #header>
        <div class="menu-wrapper">
          <el-menu
            :default-active="avtiveIndex"
            mode="horizontal"
            @select="onMenuSelect"
            class="elmenu"
          >
            <el-menu-item index="2"><el-icon><TrendCharts /></el-icon>折线图</el-menu-item>
            <el-menu-item index="1" ><el-icon><Histogram /></el-icon>柱状图</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日" @click="changeDate(1)" />
              <el-radio-button label="本周" @click="changeDate(2)" />
              <el-radio-button label="本月" @click="changeDate(3)"/>
              <el-radio-button label="今年" @click="changeDate(4)"/>
            </el-radio-group>
            <date-picker
              :set-type="'daterange'"
              :set-size="'small'"
              :set-date-value="dateValue"
            ></date-picker>
          </div>
        </div>
      </template>
      <div class="chart-wrap">
        <skeleton-bar v-show="barSkeleton"></skeleton-bar>
        <v-chart :option="chartOptions"></v-chart>
        <skeleton-list v-show="listSkeleton"></skeleton-list>
        <div class="chart-list">
          <div class="chart-list-title">排行榜</div>
          <div class="list-item-wrapper">
            <div
              class="list-item"
              v-for="(item, index) in shopListArr"
              :key="index"
            >
              <div :class="['list-item-sort', +index <=2 ? 'sortby': '']">{{index + 1}}</div>
              <div class="list-item-name">{{item.name}}</div>
              <div class="list-item-category">{{item.category}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import DatePicker from './../common/DatePicker.vue'
import SkeletonBar from './../skeleton/Bar.vue'
import SkeletonList from './../skeleton/List.vue'
import { shopList } from './../../api'
import { TrendCharts, Histogram } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
export default {
  components: {
    DatePicker,
    SkeletonBar,
    SkeletonList,
    TrendCharts,
    Histogram
  },
  props: ['sevenDate', 'sevenDay'],
  data () {
    return {
      avtiveIndex: '1',
      radioSelect: '今日',
      shopListArr: [], // 店铺列表数据
      latitude: 31.38098,
      longitude: 121.50146,
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      sortByType: 6, // 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
      chartOptions: {},
      dateValue: [],
      barSkeleton: true, // 柱状图骨架屏加载
      listSkeleton: true, // 列表骨架屏加载
    }
  },
  updated () {
    this.render('bar', true)
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await shopList(this.latitude, this.longitude, this.offset, '', '', this.sortByType)
      this.shopListArr = [...res]
      this.listSkeleton = false
    },
    onMenuSelect (index) {
      this.avtiveIndex = index
      if (index === '1') {
        this.render('bar', true)
      } else {
        this.render('line', false)
      }
    },
    changeDate (type) {
      switch (type) {
        // 今日
        case 1: {
          const start = dayjs().format('YYYY-MM-DD')
          const end = dayjs().format('YYYY-MM-DD')
          this.dateValue = [start, end]
        }
        break
        // 本周
        case 2: {
          const start =  dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
          const end = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
          this.dateValue = [start, end]
        }
        break
        // 本月
        case 3: {
          const start =  dayjs().startOf('month').format('YYYY-MM-DD')
          const end = dayjs().endOf('month').format('YYYY-MM-DD')
          this.dateValue = [start, end]
        }
        break
        // 今年
        case 4: {
          const start =  dayjs().startOf('year').format('YYYY-MM-DD')
          const end = dayjs().endOf('year').format('YYYY-MM-DD')
          this.dateValue = [start, end]
        }
        break

      }
    },
    render(type, gap) {
      this.chartOptions = {
        title: {
          text: '一周新增趋势',
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员'],
          top: 20
        },
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          boundaryGap: gap,
          data: this.sevenDay,
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333',
          },
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            name:'新注册用户',
            type: type,
            seriesLayoutBy: "row",
            data: this.sevenDate[0],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#83bff6' // 0% 处的颜色
                }, {
                    offset: 0.5, color: '#188df0'
                }, {
                  offset: 1, color: '#188df0' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            // markPoint: {
            //   data: [
            //     {type: 'max', name: '最大值'},
            //     {type: 'min', name: '最小值'}
            //   ]
            // },
          },
          {
            name:'新增订单',
            type: type,
            seriesLayoutBy: "row",
            data: this.sevenDate[1],
            itemStyle: {
              opacity: 0.8,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }],
                global: false // 缺省为 false
              }
            },
            // markPoint: {
            //   data: [
            //     {type: 'max', name: '最大值'},
            //     {type: 'min', name: '最小值'}
            //   ]
            // },
          },
          {
            name:'新增管理员',
            type: type,
            seriesLayoutBy: "row",
            data: this.sevenDate[2],
            itemStyle: {
              opacity: 0.8,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgb(255, 191, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }],
                global: false // 缺省为 false
              }
            },
            // markPoint: {
            //   data: [
            //     {type: 'max', name: '最大值'},
            //     {type: 'min', name: '最小值'}
            //   ]
            // },
          },
        ],
      }
      // 方法加载后，取消骨架屏
      this.barSkeleton = false
      
    }
  },
}
</script>

<style lang="scss" scoped>
.pos {
  position: absolute;
}
.pos2 {
  position: relative;
}
.echarts {
  width: 60px;
}
.analysis {
  width: 100%;
  margin-top: 20px;
  .menu-wrapper {
    position: relative;
    display: flex;
    .elmenu {
      width: 100%;
      padding-left: 20px;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
      }
    }
    .menu-right {
      position: absolute;
      right: 20px;
      top: 0;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .chart-wrap {
    display: flex;
    height: 270px;
    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }
    .chart-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .chart-list-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }
      .list-item-wrapper {
        margin-top: 15px;
        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding:  6px 20px 6px 0;
          .list-item-sort {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;
            &.sortby {
              background-color: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }
          .list-item-name {
            margin-left: 10px;
            color: #333;
          }
          .list-item-category {
            flex: 1;
            text-align: right;
          }
        }
      }
      
    }
  }
}

.el-card :deep(.el-card__header) {
  border-bottom: none;
  padding: 0;
}

.demo-date-picker {
  display: inline-block;
  margin-left: 20px;
}
</style>