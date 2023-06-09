<template>
  <div class="userlist_container">
    <el-card>
      <el-form :model="ruleForm" :inline="true" ref="ruleFormRef">
        <el-form-item label="用户姓名：" prop="name">
          <el-input placeholder="用户姓名" v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item label="注册城市：" prop="city">
          <city-cascader ref="allCity"></city-cascader>
        </el-form-item>
        <el-form-item label="注册日期：" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset('ruleFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="registe_time" label="注册日期" width="220"></el-table-column>
        <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
        <el-table-column property="city" label="注册地址"></el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          background
          layout="->, total, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import CityCascader from './../components/common/CityCascader.vue'
import DatePicker from './../components/common/DatePicker.vue'
import { ElMessage } from 'element-plus'
import { getUserList, getUserCount } from './../api'
export default {
  components: {
    CityCascader,
    DatePicker,
  },
  data () {
    return {
      ruleForm: {
        name: '',
        city: '',
        date: ''
      },
      tableData: [{
        registe_time: '2016-05-02',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1518 弄'
      }, {
        registe_time: '2016-05-04',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1517 弄'
      }, {
        registe_time: '2016-05-01',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1519 弄'
      }, {
        registe_time: '2016-05-03',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1516 弄'
      }],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData(){
      try{
        const countData = await getUserCount()
        if (countData.status == 1) {
          this.count = countData.count
        }else{
          throw new Error('获取数据失败')
        }
        this.getUsers()
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
      this.getUsers()
    },
    async getUsers(){
      const Users = await getUserList({offset: this.offset, limit: this.limit})
      this.tableData = []
      Users.forEach(item => {
        const tableData = {}
        tableData.username = item.username
        tableData.registe_time = item.registe_time
        tableData.city = item.city
        this.tableData.push(tableData)
      })
    },
    handleDateData () {
      this.ruleForm.date = ''
    },
    onSubmit () {
      ElMessage({
        message: '该功能尚未实现，敬请期待！',
        type: 'warning',
      })
      console.log(this.ruleForm.date)
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      // 控制子组件的onReset方法
      this.$refs.allCity.onReset()
    }
  }
}
</script>

<style lang="scss" scoped>
.userlist_container {
  position: relative;
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
</style>