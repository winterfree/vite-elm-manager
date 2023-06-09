<template>
  <pie-view :pie-data="pieData"></pie-view>
</template>

<script>
import PieView from './../components/charts/PieView.vue'
import { getUserCity } from './../api'
export default {
  components: {
    PieView
  },
  data () {
    return {
      pieData: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        const res = await getUserCity()
        if (res.status == 1) {
          this.pieData = res.user_city
        }else{
          throw new Error(res)
        }
      } catch(err) {
        console.log('获取用户分布信息失败',err)
      }
    }
  }
}
</script>

<style>

</style>