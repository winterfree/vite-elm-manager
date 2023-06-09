import { App } from 'vue'
import VueMarkdownEditor from './mdEditor'

const pluginList = [
    VueMarkdownEditor,
    // 如果有使用到别的插件，引入放在这个位置就好
]

const plugins = {
  install (app: App<Element>) {
    // 批量注册插件  改用自动引入
    Object.entries(pluginList).forEach(([key, component]) => {
      app.use(component)
    })
  }
}

export default plugins