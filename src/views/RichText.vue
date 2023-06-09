<template>
  <el-card v-show="skeShow" v-loading="skeShow" style="width: 1109px; height: 450px;"></el-card>
  <main id="sample" v-show="!skeShow">
    <Editor
      api-key="no-api-key"
      :init="init"
    />
  </main>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    Editor
  },
  data () {
    return {
      //初始化配置
      init: {
        language: 'zh_CN',
        width: '100%',
        height: 450
      },
      skeShow: true
    }
  },
  mounted () {
    this.skeLoading()
  },
  methods: {
    skeLoading () {
      setTimeout(() => {
        this.skeShow = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>