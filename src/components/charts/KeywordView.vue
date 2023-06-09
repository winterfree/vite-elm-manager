<template>
  <el-card shadow="hover">
    <template #header>
      <div class="title-wrapper">关键词搜索</div>
    </template>
    <div class="container">
      <div class="chart-wrapper">
        <div class="chart-view" v-loading="loading">
          <div class="chart-title">搜索用户数</div>
          <div class="chart-data">{{search_total}}</div>
          <v-chart :option="usersOptions(this.search_user)"></v-chart>
        </div>
        <div class="chart-view" v-loading="loading">
          <div class="chart-title">搜索量</div>
          <div class="chart-data">{{search_vol}}</div>
          <v-chart :option="usersOptions(this.search_nums)"></v-chart>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table
          :data="categoriesDetailData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        >
          <el-table-column label="名称" name="名称" prop="name" width="260" />
          <el-table-column label="价格（元）" name="价格" prop="price" />
          <el-table-column label="总销量" name="总销量" prop="total_sales" />
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="->, prev, pager, next, jumper"
          :total="categoriesDetailData.length">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { kwSearch, getCategoryDetailData } from "./../../api/mock"
export default {
  data() {
    return {
      search_user: [],
      search_nums: [],
      search_total: '',
      search_vol: '',
      categoriesDetailData: [],
      currentPage: 1,
      pageSize: 5,
      loading: true
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let listRes = await getCategoryDetailData("/lk001.json")
      if (listRes.success) {
        this.categoriesDetailData = listRes.data.cate[0].products
      }
      let kwRes = await kwSearch()
      if (kwRes.success) {
        this.search_user = kwRes.data.search_user
        this.search_nums = kwRes.data.search_nums
        this.search_total = kwRes.data.search_total
        this.search_vol = kwRes.data.search_vol
      }
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    usersOptions(data) {
      return {
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          show: false,
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            data: data,
            type: "line",
            areaStyle: {},
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ],
                global: false // 缺省为 false
              },
              opacity: 0,
            },
            smooth: true,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  height: 452px;
  .chart-wrapper {
    display: flex;
    padding: 0 10px;
    margin-top: 20px;
    .chart-view {
      flex: 1;
      padding: 0 10px;
      .chart-title {
        color: #999;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .chart-data {
        font-size: 22px;
        color: #333;
        font-weight: 500;
        letter-spacing: 2px;
      }
      .echarts {
        height: 50px;
      }
    }
  }
  .table-wrapper {
    flex: 1;
    margin-top: 20px;
    padding: 0 20px 20px;
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
