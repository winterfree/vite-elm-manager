import { createRouter, createWebHashHistory } from "vue-router"

import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import Home from '../views/Home.vue'
import Update from '../views/Update.vue'
import UserList from '../views/UserList.vue'
import AdminList from '../views/AdminList.vue'
import ShopList from '../views/ShopList.vue'
import FoodList from '../views/FoodList.vue'
import OrderList from '../views/OrderList.vue'
import AddShop from '../views/AddShop.vue'
import AddGoods from '../views/AddGoods.vue'
import Visitor from '../views/Visitor.vue'
import Markdown from '../views/Markdown.vue'
import RichText from '../views/RichText.vue'
import AdminSet from '../views/AdminSet.vue'
import Introduce from '../views/Introduce.vue'
import ApiDoc from '../views/ApiDoc.vue'

const routes = [
  {
    path: '/',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/manage',
    component: Manage,
    children: [
      {
        path: '',
        component: Home,
        meta: []
      },
      {
        path: '/update',
        component: Update,
        meta: ['仪表盘', '更新']
      },
      {
        path: '/addShop',
        component: AddShop,
        meta: ['数据管理', '添加商铺']
      },
      {
        path: '/addGoods',
        component: AddGoods,
        meta: ['数据管理', '添加商品']
      },
      {
        path: '/userList',
        component: UserList,
        meta: ['用户管理', '用户列表']
      },
      {
        path: '/adminList',
        component: AdminList,
        meta: ['用户管理', '管理员列表']
      },
      {
        path: '/shopList',
        component: ShopList,
        meta: ['商家管理', '商家列表']
      },
      {
        path: '/foodList',
        component: FoodList,
        meta: ['商家管理', '食品列表']
      },
      {
        path: '/orderList',
        component: OrderList,
        meta: ['商家管理', '订单列表']
      },
      {
        path: '/visitor',
        component: Visitor,
        meta: ['可视化', '用户分布']
      },
      {
        path: '/markdown',
        component: Markdown,
        meta: ['编辑器', 'MarkDown']
      },
      {
        path: '/richtext',
        component: RichText,
        meta: ['编辑器', '富文本']
      },
      {
        path: '/adminSet',
        component: AdminSet,
        meta: ['设置', '管理员设置']
      },
      {
        path: '/introduce',
        component: Introduce,
        meta: ['说明', '项目介绍']
      },
      {
        path: '/apidoc',
        component: ApiDoc,
        meta: ['说明', '接口文档']
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router