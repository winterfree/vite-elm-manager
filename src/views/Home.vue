<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="6">
        <user-count
          :user-month="userMonth"
          :all-user-count="allUserCount"
          :dod="dod"
          :wow="wow"
          :day-compare="dayCompare"
          :week-compare="weekCompare"
          :show-loading="loading"
        ></user-count>
      </el-col>
      <el-col :span="6">
        <admin-count
          :all-admin-count="allAdminCount"
          :admin-month="adminMonth"
          :seven-date='sevenDate'
          :thirty-days='thirtyDays'
          :thirty-date='thirtyDate'
          :show-loading="loading"
        ></admin-count>
      </el-col>
      <el-col :span="6">
        <order-count
          :order-month="orderMonth"
          :all-order-count="allOrderCount"
          :thirty-date='thirtyDate'
          :show-loading="loading"
        ></order-count>
      </el-col>
      <el-col :span="6">
        <api-count
          :api-month="apiMonth"
          :all-api-count="allApiCount"
          :thirty-date='thirtyDate'
          :show-loading="false"
        ></api-count>
      </el-col>
    </el-row>
    <el-row>
      <anal-view
        :seven-date='sevenDate'
        :seven-day='sevenDay'
      ></anal-view>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px">
      <el-col :span="12">
        <keyword-view></keyword-view>
      </el-col>
      <el-col :span="12">
        <pie-view :pie-data="pieData"></pie-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavHead from './../components/NavHead.vue'
import UserCount from './../components/card/components/UserCount.vue'
import AdminCount from './../components/card/components/AdminCount.vue'
import OrderCount from './../components/card/components/OrderCount.vue'
import ApiCount from './../components/card/components/ApiCount.vue'
import AnalView from './../components/charts/AnalView.vue'
import KeywordView from './../components/charts/KeywordView.vue'
import PieView from './../components/charts/PieView.vue'
import { dayjs } from 'element-plus'
import {
  userCount,
  orderCount,
  getUserCount,
  getOrderCount,
  adminDayCount,
  adminCount,
  apiCount,
  apiAllCount,
  getUserCity
} from './../api'
import { wrapperNumber, compareArr, thousandFormat } from './../utils/common'

export default {
  components: {
    NavHead,
    UserCount,
    AdminCount,
    OrderCount,
    ApiCount,
    AnalView,
    KeywordView,
    PieView
  },
  data () {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      apiCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      allApiCount: null,
      sevenDay: [],
      sevenDate: [[],[],[]],
      thirtyDays: [],
      thirtyDate: [[],[],[],[]],
      pieData: {},
      userMonth: null,
      orderMonth: null,
      adminMonth: null,
      apiMonth: null,
      wow: null, // 周同比
      dod: null, // 日同比
      dayCompare: false, // 向子组件传值控制日同比符号
      weekCompare: false, // 向子组件传值控制周同比符号
      loading: true, // 加载图标
    }
  },
  mounted () {
    this.initData()
    this.dataCompare()
    this.getTodayData()
    this.getSevenData()
    this.getThirtyData()
  },
  methods: {
    // 初始化数据
    async initData () {
      // 用户分布
      try {
        const res = await getUserCity()
        if (res.status == 1) {
          this.pieData = res.user_city
        }else{
          throw new Error(res)
        }
      } catch(err) {
        console.log('获取用户分布信息失败',err)
      }
    },
    // 数据同比
    // 同比数据应在服务端计算，前端仅接收返回数据，该方法仅在没有对应api接口的情况下计算模拟展示
    async dataCompare () {
      const today = dayjs().format('YYYY-MM-DD')
      const beforeDay = dayjs(new Date().getTime() - 86400000).format('YYYY-MM-DD')
      // 日同比 (今日指标 - 昨日指标) / 昨日指标 * 100%
      Promise.all([userCount(beforeDay), userCount(today)]).then(res => {
        const initDod = (res[1].count - res[0].count) / res[0].count
        if (initDod > 0) {
          this.dayCompare = true
          this.dod = Number(initDod * 100).toFixed(2) + '%'
        } else {
          this.dayCompare = false
          this.dod = Number(Math.abs(initDod) * 100).toFixed(2) + '%'
        }
      })
      // 周同比 (本周指标 - 上周指标) / 上周指标 * 100%
      // 本周起始时间
      const thisWeek_start = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      const thisWeek_end = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
			const thisWeekArr = compareArr(thisWeek_start, thisWeek_end)
      // 上周起始时间
      const lastWeek_start = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD')
      const lastWeek_end = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD')
			const lastWeekArr = compareArr(lastWeek_start, lastWeek_end)

      const weekArr = [[], []]
      thisWeekArr.forEach((item) => {
        weekArr[0].push(userCount(item))
      })
      lastWeekArr.forEach((item) => {
        weekArr[1].push(userCount(item))
      })
      const promiseArr = [...weekArr[0], ...weekArr[1]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[],[]]
        res.forEach((item, index) => {
          if (item.status === 1) {
            resArr[Math.floor(index/7)].push(item.count)
          }
        })
        const thisWeekRes = resArr[0].reduce((n, m) => n + m)
        const lastWeekRes = resArr[1].reduce((n, m) => n + m)
        const initWow = (thisWeekRes - lastWeekRes) / lastWeekRes
        if (initWow > 0) {
          this.weekCompare = true
          this.wow = Number(initWow * 100).toFixed(2) + '%'
        } else {
          this.weekCompare = false
          this.wow = Number(Math.abs(initWow) * 100).toFixed(2) + '%'
        }
      }).catch(err => {
        console.log(err)
      })
      
      // 上周
    },
    // 获取当天数据
    async getTodayData () {
      const today = dayjs().format('YYYY-MM-DD')
      // 当天数据
      Promise.all([userCount(today), orderCount(today), adminDayCount(today), apiCount(today), getUserCount(), getOrderCount(), adminCount(), apiAllCount()])
      .then(res => {
        this.userCount = res[0].count
        this.orderCount = res[1].count
        this.adminCount = res[2].count
        this.apiCount = res[3].count
        this.allUserCount = wrapperNumber(res[4], 'count')
        this.allOrderCount = wrapperNumber(res[5], 'count')
        this.allAdminCount = wrapperNumber(res[6], 'count')
        this.allApiCount = wrapperNumber(res[7], 'count')
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取七天数据
    async getSevenData () {
      for (let i = 6; i > -1; i--) {
        const date = dayjs(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
        this.sevenDay.push(date)
      }
      const apiArr = [[],[],[]]
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item))
        apiArr[1].push(orderCount(item))
        apiArr[2].push(adminDayCount(item))
      })
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[],[],[]]
        res.forEach((item, index) => {
          if (item.status === 1) {
            resArr[Math.floor(index/7)].push(item.count)
          }
        })
        this.sevenDate = resArr
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取三十天数据
    async getThirtyData() {
      for (let i = 29; i > -1; i--) {
        const date = dayjs(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
        this.thirtyDays.push(date)
      }
      const apiArr = [[],[],[],[]]
      this.thirtyDays.forEach(item => {
        apiArr[0].push(userCount(item))
        apiArr[1].push(orderCount(item))
        apiArr[2].push(adminDayCount(item))
        apiArr[3].push(apiCount(item))
      })
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2], ...apiArr[3]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[],[],[],[]]
        res.forEach((item, index) => {
          if (item.status === 1) {
            resArr[Math.floor(index/30)].push(item.count)
          }
        })
        this.thirtyDate = resArr
        // 前30天数组求和
        this.userMonth = resArr[0].reduce((n, m) => n + m)
        this.orderMonth = resArr[1].reduce((n, m) => n + m)
        this.adminMonth = thousandFormat(resArr[2].reduce((n, m) => n + m))
        this.apiMonth = resArr[3].reduce((n, m) => n + m)
        // 数据加载完成后隐藏loading图标
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>