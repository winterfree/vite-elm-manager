<h1 align="center">Welcome to vite-elm-manager 👋</h1>

<p align="center">
<img src="https://img.shields.io/badge/vite-%5E4.1.0-yellow" alt="vite">
<img src="https://img.shields.io/badge/vue-%5E3.2.45-brightgreen" alt="vue">
<img src="https://img.shields.io/badge/node-16.18.0-green" alt="node">
<img src="https://img.shields.io/badge/element--plus-%5E2.3.0-blue" alt="element-plus">
<img src="https://img.shields.io/badge/echarts-%5E5.4.2-red" alt="echarts">
<img src="https://img.shields.io/badge/license-MIT-orange" alt="License">
<p>

## 前言

这是一个仿饿了么 webapp 项目的后台管理系统，由 vite 构建，使用 vue3 + element plus 编写，绝大部分数据从后台项目[node-elm](https://github.com/bailicangdu/node-elm)中获取，少量没有对应 api 的则通过 Easy-Mock 生成下载在本地 mock 中。本项目参考了 bailicangdu 大佬[vue2-manage](https://github.com/bailicangdu/vue2-manage)项目的代码，页面样式和风格上趋近于 iview pro 和 antd pro，许多国外的后台管理系统界面都相当酷炫，但感觉这两者更符合国内的审美，功能性上也更实用。

项目使用选项式写法，在项目后续的完善升级中依然会沿用。如果之后使用 ts 重构的话，会全部改成 composition api。

最开始是先做的 react 版，但是实现过程中遇到了不少问题，反倒是 vue 版的先做出来了，等对 react hook 研究得更透彻一点的话会把 react 版的做完上传上来，敬请期待（最好也不要太期待了，本人懒\_(∠ ゝ з:)\_

> 项目还在完善中，后续会添加更多的功能

**注：后台数据接口会不定时崩溃，作者一般会自行修复，但时间不定，建议在本地搭建服务端。**

## 技术栈

vue3 + element plus + vite + echarts + axios + sass + skeleton + particles + ES6/7&#x20;

## 如何运行

> node 版本 `[16.18.0]`

```markdown
git clone https://github.com/winterfree/vite-elm-manager

cd vite-elm-manager

npm install 或 yarn

npm run dev
```

## 项目演示

[demo 地址](http://140.143.128.100:3000)（请在 PC 端预览）

## 部分截图

登录

![image](http://assets.riyahub.com/vue-manage/%E7%99%BB%E5%BD%95.gif)

首页

![image](http://assets.riyahub.com/vue-manage/%E9%A6%96%E9%A1%B5.gif)

商家列表

![image](http://assets.riyahub.com/vue-manage/%E5%95%86%E5%AE%B6%E5%88%97%E8%A1%A8.PNG)

添加商品

![image](http://assets.riyahub.com/vue-manage/%E6%B7%BB%E5%8A%A0%E5%95%86%E5%93%81.PNG)

管理员设置

![image](http://assets.riyahub.com/vue-manage/%E7%AE%A1%E7%90%86%E5%91%98%E8%AE%BE%E7%BD%AE.PNG)

编辑器

![image](http://assets.riyahub.com/vue-manage/%E7%BC%96%E8%BE%91%E5%99%A8.PNG)

说明

![image](http://assets.riyahub.com/vue-manage/%E8%AF%B4%E6%98%8E.PNG)

## 目录结构

```js
vite-elm-manager
├── src
│   ├── api
│   │   ├── mock
│   │   └── index.js
│   ├── assets
│   │   ├── doc
│   │   ├── style
│   │   └── vue.svg
│   ├── components
│   │   ├── card
│   │   ├── charts
│   │   ├── common
│   │   ├── skeleton
│   │   ├── NavFoot.vue
│   │   ├── NavHead.vue
│   │   └── NavLeft.vue
│   ├── config
│   │   ├── env.js
│   │   ├── getTimes.js
│   │   ├── options.js
│   │   └── particles.js
│   ├── mixins
│   │   └── baseCardMixin.js
│   ├── model
│   │   ├── fetch.js
│   │   ├── request.js
│   │   └── usemock.js
│   ├── plugins
│   │   ├── mdEditor
│   │   └── index.ts
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   ├── common.js
│   │   └── storage.js
│   ├── views
│   │   ├── AddGoods.vue
│   │   ├── AddShop.vue
│   │   ├── AdminList.vue
│   │   ├── AdminSet.vue
│   │   ├── ApiDoc.vue
│   │   ├── FoodList.vue
│   │   ├── Home.vue
│   │   ├── Introduce.vue
│   │   ├── Login.vue
│   │   ├── Manage.vue
│   │   ├── Markdown.vue
│   │   ├── OrderList.vue
│   │   ├── RichText.vue
│   │   ├── ShopList.vue
│   │   ├── Update.vue
│   │   ├── UserList.vue
│   │   └── Visitor.vue
│   ├── App.vue
│   └── main.js
├── LICENSE
├── README.en.md
├── README.md
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

> 如果项目对您有帮助，希望您能右上角点个 star 支持一下，谢谢
>
> 欢迎 issue，本项目会长期更新，欢迎大家指出问题，共同学习

## 作者

👤 **Richard Yan**
