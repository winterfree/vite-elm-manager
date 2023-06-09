<template>
  <el-scrollbar>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#001529"
      style="min-height: 100%;"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="defaultActive"
      popper-effect="dark"
      router
    >
      <el-menu-item class="logo">
        <el-icon><img src="./../assets/vue.svg" alt="logo"></el-icon>
        <template #title><span class="logo_desc">Riya Pro</span></template>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Odometer /></el-icon>
          <span>仪表盘</span>
        </template>
        <el-menu-item index="manage">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="update">
          <el-icon><UploadFilled /></el-icon>
          <template #title>更新</template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="userList">用户列表</el-menu-item>
        <el-menu-item index="adminList">管理员列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Shop /></el-icon>
          <span>商家管理</span>
        </template>
        <el-menu-item index="shopList">商家列表</el-menu-item>
        <el-menu-item index="foodList">食品列表</el-menu-item>
        <el-menu-item index="orderList">订单列表</el-menu-item>
        
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><FolderAdd /></el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item index="addShop">添加商铺</el-menu-item>
        <el-menu-item index="addGoods">添加商品</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><PieChart /></el-icon>
          <span>可视化</span>
        </template>
        <el-menu-item index="visitor">用户分布</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon><Edit /></el-icon>
          <span>编辑器</span>
        </template>
        <el-menu-item index="markdown">Markdown</el-menu-item>
        <el-menu-item index="richtext">富文本</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="7">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>设置</span>
        </template>
        <el-menu-item index="adminSet">管理员设置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="8">
        <template #title>
          <el-icon><InfoFilled /></el-icon>
          <span>说明</span>
        </template>
        <el-menu-item index="introduce">项目介绍</el-menu-item>
        <el-menu-item index="apidoc">接口文档</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import {
  Odometer,
  HomeFilled,
  UploadFilled,
  UserFilled,
  Shop,
  PieChart,
  FolderAdd,
  Edit,
  Setting,
  InfoFilled
} from '@element-plus/icons-vue'
export default {
  components: {
    Odometer, HomeFilled, UploadFilled, UserFilled, Shop, PieChart, FolderAdd, Edit, Setting, InfoFilled
  },
  props: {
    isCollapse: Boolean
  },
  computed: {
    defaultActive: function(){
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 50px;
  color: #fff;
  img {
    margin: 0 16px;
    width: 32px;
    height: 32px;
  }
  .logo_desc {
    margin-left: 15px;
  }
}
.el-menu {
  border-right: none;
}
</style>