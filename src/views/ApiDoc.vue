<template>
  <v-md-editor :model-value="previewData" mode="preview"></v-md-editor>
</template>

<script>
import mdData from './../assets/doc/API.md?raw'
export default {
  data() {
    return {
      previewData: mdData,
    };
  },
};
</script>

<style lang="sass" scoped>

</style>