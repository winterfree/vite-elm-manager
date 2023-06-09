<template>
  <div class="wrap">
    <!--默认使用-->
    <elui-china-area-dht v-model="value" clearable @change="onChange" placeholder="选择城市"></elui-china-area-dht>
    <!--带isall参数和leave参数示例-->
    <!-- <elui-china-area-dht isall :leave="2" @change="onChange"></elui-china-area-dht> -->
  </div>
</template>

<script>
import { EluiChinaAreaDht } from 'elui-china-area-dht'
export default {
  components: {
    EluiChinaAreaDht,
  },
  data () {
    return {
      value: []
    }
  },
  methods: {
    onChange(e) {
      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const one = chinaData[e[0]]
      const two = chinaData[e[1]]
      console.log(one, two)
    },
    onReset() {
      this.value = []
    }
  }
}
</script>



<style>

</style>