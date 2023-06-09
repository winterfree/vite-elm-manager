import { createStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getAdminInfo } from './../api'

const ERR = '获取用户信息失败！'

const state = {
	adminInfo: {
    user_name: 'Admin',
		avatar: 'default.jpg'
	},
}

const mutations = {
  saveAdminInfo(state, adminInfo) {
    state.adminInfo = adminInfo
  }
}

const actions = {
  async getAdminData({commit}) {
    try {
      const res = await getAdminInfo()
      if (res.status === 1) {
        commit('saveAdminInfo', res.data)
      } else {
        // ElMessage.error(res.type)
        throw new Error(res.type)
      }
    } catch(err) {
      // ElMessage.error(ERR)
    }
  }
}

export default createStore({
	state,
	actions,
	mutations,
})