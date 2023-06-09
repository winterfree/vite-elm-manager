<template>
  <div class="shoplist_container">
    <!-- 搜索模块 -->
    <el-card>
      <el-form :model="ruleForm" :inline="true" ref="ruleFormRef">
        <el-form-item label="店铺名称：" prop="name">
          <el-input placeholder="店铺名称" v-model="ruleForm.name"/>
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
        style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="店铺地址"
          prop="address">
        </el-table-column>
        <el-table-column
          label="店铺介绍"
          prop="description">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="Success"
              @click="addFood(scope.$index, scope.row)">添加食品</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
      <!-- 弹出编辑模块 -->
      <el-dialog title="修改店铺信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
            <el-form-item label="店铺名称" label-width="100px">
              <el-input v-model="selectTable.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" label-width="100px">
              <el-autocomplete
                v-model="address.address"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入地址"
                style="width: 100%;"
                @select="addressSelect"
              ></el-autocomplete>
              <span>当前城市：{{city.name}}</span>
            </el-form-item>
            <el-form-item label="店铺介绍" label-width="100px">
              <el-input v-model="selectTable.description"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" label-width="100px">
              <el-input v-model="selectTable.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类" label-width="100px">
              <el-cascader
                :options="categoryOptions"
                v-model="selectedCategory"
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商铺图片" label-width="100px">
              <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/v1/addimg/shop'"
                :show-file-list="false"
                :on-success="handleServiceAvatarScucess"
                :before-upload="beforeAvatarUpload">
                <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <slot name="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateShop">确 定</el-button>
          </slot>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import env from './../config/env'
import { 
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from './../api'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
      },
      baseUrl: env.baseAPI,
      baseImgPath: env.imgBaseAPI,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      categoryOptions: [],
      selectedCategory: [],
      address: {},
    }
  },
  created () {
    this.initData();
  },
  methods: {
    async initData(){
      try {
        this.city = await cityGuess();
        const countData = await getResturantsCount();
        if (countData.status == 1) {
          this.count = countData.count;
        }else{
          throw new Error('获取数据失败');
        }
        this.getResturants();
      } catch(err) {
        console.log('获取数据失败', err);
      }
    },
    async getCategory () {
      try {
        const categories = await foodCategory();
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                return
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name,
              })
            })
            this.categoryOptions.push(addnew)
          }
        })
      } catch(err) {
        console.log('获取商铺种类失败', err);
      }
    },
    async getResturants(){
      const {latitude, longitude} = this.city;
      const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
      this.tableData = [];
      restaurants.forEach(item => {
        const tableData = {};
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData);
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getResturants()
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogFormVisible = true;
      this.selectedCategory = row.category.split('/');
      if (!this.categoryOptions.length) {
          this.getCategory();
      }
    },
    addFood(index, row){
      this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteResturant(row.id);
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '删除店铺成功'
          });
          this.tableData.splice(index, 1);
        }else{
          throw new Error(res.message)
        }
      } catch(err) {
        this.$message({
          type: 'error',
          message: err.message
        });
        console.log('删除店铺失败')
      }
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try{
          const cityList = await searchplace(this.city.id, queryString);
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address;
              return item;
            })
            cb(cityList)
          }
        }catch(err){
          console.log(err)
        }
      }
    },
    addressSelect(vale){
      const {address, latitude, longitude} = vale;
      this.address = {address, latitude, longitude};
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      }else{
        this.$message.error('上传图片失败！');
      }
    },
    beforeAvatarUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    async updateShop() {
      this.dialogFormVisible = false;
      try {
        Object.assign(this.selectTable, this.address);
        this.selectTable.category = this.selectedCategory.join('/');
        const res = await updateResturant(this.selectTable)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          });
          this.getResturants();
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      } catch(err) {
        console.log('更新餐馆信息失败', err);
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
.shoplist_container {
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container{
  padding: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>