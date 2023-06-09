<template>
  <div class="orderlist_container">
    <!-- 搜索模块 -->
    <el-card>
      <el-form :model="ruleForm" :inline="true" ref="ruleFormRef">
        <el-form-item label="订单ID：" prop="id">
          <el-input placeholder="订单ID" v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset('ruleFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表模块 -->
    <el-card class="table_container">
      <el-table
        :data="tableData"
        @expand='expand'
        :expand-row-keys='expendRow'
        :row-key="row => row.index"
        style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="用户名" >
			            <span>{{ props.row.user_name }}</span>
			          </el-form-item>
			          <el-form-item label="店铺名称">
			            <span>{{ props.row.restaurant_name }}</span>
			          </el-form-item>
			          <el-form-item label="收货地址">
			            <span>{{ props.row.address }}</span>
			          </el-form-item>
			          <el-form-item label="店铺 ID">
			            <span>{{ props.row.restaurant_id }}</span>
			          </el-form-item>
			          <el-form-item label="店铺地址">
			            <span>{{ props.row.restaurant_address }}</span>
			          </el-form-item>
			        </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="订单 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="总价格"
          prop="total_amount">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status">
        </el-table-column>
			</el-table>
      <!-- 分页 -->
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="->, total, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getOrderList,
  getOrderCount,
  getResturantDetail,
  getUserInfo,
  getAddressById
} from './../api'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      ruleForm: {
        id: '',
      },
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      restaurant_id: null,
      expendRow: [],
    }
  },
  created () {
    this.restaurant_id = this.$route.query.restaurant_id
    this.initData()
  },
  methods: {
    async initData(){
      try{
        const countData = await getOrderCount({restaurant_id: this.restaurant_id})
        if (countData.status == 1) {
          this.count = countData.count
        }else{
          throw new Error('获取数据失败')
        }
        this.getOrders()
      }catch(err){
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1)*this.limit
      this.getOrders()
    },
    async getOrders(){
      const Orders = await getOrderList({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id})
      this.tableData = []
      Orders.forEach((item, index) => {
        const tableData = {}
        tableData.id = item.id
        tableData.total_amount = item.total_amount
        tableData.status = item.status_bar.title
        tableData.user_id = item.user_id
        tableData.restaurant_id = item.restaurant_id
        tableData.address_id = item.address_id
        tableData.index = index
        this.tableData.push(tableData)
      })
    },
    async expand(row, status){
      if (status) {
        const restaurant = await getResturantDetail(row.restaurant_id)
        const userInfo = await getUserInfo(row.user_id)
        const addressInfo = await getAddressById(row.address_id)
        this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}})
        this.$nextTick(() => {
            this.expendRow.push(row.index)
        })
      } else {
        const index = this.expendRow.indexOf(row.index)
        this.expendRow.splice(index, 1)
      }
    },
    onSubmit () {
      ElMessage({
        message: '该功能尚未实现，敬请期待！',
        type: 'warning',
      })
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.orderlist_container {
  .el-form-item {
    margin-right: 15px;
    margin-bottom: 0;
  }
  .table_container {
    margin-top: 20px;
    .Pagination {
      margin-top: 20px
    }
  }
}

.table_container{
  padding: 20px
}
.demo-table-expand {
  font-size: 0
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%
}
</style>