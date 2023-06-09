import axios from 'axios'
import env from './../config/env'
import { ElMessage } from 'element-plus'

const ERR = '数据请求异常'

export default function request(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise
    type = type.toUpperCase();
	  url = env.baseAPI + url
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then((response) => {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch((error) => {
      ElMessage.error(ERR)
      //失败了调用reject()
      reject(error)
    })
  })
}