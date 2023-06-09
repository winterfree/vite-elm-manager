<template>
  <div class="adminlist_container">
    <!-- 搜索模块 -->
    <!-- 列表模块 -->
    <el-card class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="user_name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册日期"
          width="220">
        </el-table-column>
        <el-table-column
          prop="city"
          label="地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="admin"
          label="权限">
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
  adminList,
  adminCount
} from './../api'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
      },
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const countData = await adminCount()
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getAdmin()
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
      this.getAdmin()
    },
    async getAdmin() {
      try {
        const res = await adminList({offset: this.offset, limit: this.limit})
        if (res.status == 1) {
          this.tableData = []
          res.data.forEach(item => {
            const tableItem = {
              create_time: item.create_time,
              user_name: item.user_name,
              admin: item.admin,
              city: item.city,
            }
            this.tableData.push(tableItem)
          })
        } else {
          throw new Error(res.message)
        }
      } catch(err) {
        console.log('获取数据失败', err)
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
.adminlist_container {
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