/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseAPI: 域名地址
 * imgBaseAPI: 图片所在域名地址
 * mockAPI: mock数据测试接口
 */

 const ModeType = import.meta.env.MODE || 'production'
 const EnvConfig = {
   development: {
     baseAPI: '/api',
     imgBaseAPI: '/api/img/',
     mockAPI: ''
   },
   production: {
     baseAPI: '//elm.cangdu.org',
     imgBaseAPI: '//elm.cangdu.org/img/',
     mockAPI: ''
   },
   test: {
     baseAPI: '',
     imgBaseAPI: '',
     mockAPI: ''
   }
 }
 
 export default {
   ModeType,
   mock: false,
   namespace: 'manager',
   ...EnvConfig[ModeType]
 }