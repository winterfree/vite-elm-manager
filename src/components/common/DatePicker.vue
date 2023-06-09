<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        v-model="modelValue"
        :type="typeValue"
        placeholder="选择日期"
        range-separator="至"
        start-placeholder="Start date"
        end-placeholder="End date"
        unlink-panels
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="sizeValue"
      />
    </div>
  </div>
</template>

<script>
  export default {   
    props: {
      setType: String,
      setSize: String,
      setDateValue: Array,
    },
    data() {
      return {
        modelValue: this.setDateValue,
        typeValue: this.setType,
        sizeValue: this.setSize,
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: 'Last week',
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            },
          },
          {
            text: 'Last month',
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            },
          },
          {
            text: 'Last 3 months',
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            },
          },
        ],
      }
    },
    watch: {
      setDateValue() {
        this.modelValue = this.setDateValue
      },
    }
  }
</script>

<style>
/* .demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
} */
</style>
