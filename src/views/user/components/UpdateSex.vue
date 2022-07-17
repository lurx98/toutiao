<template>
  <van-picker
    title="标题"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="defaultIndex"
  />
</template>

<script>
import { updateUserInfo } from '@/api/User'

export default {
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value,
    }
  },
  methods: {
    async onConfirm(value, index) {
      try {
        await updateUserInfo({
          gender: index,
        })
        this.$emit('close')
        this.$emit('input', index)
      } catch (error) {
        console.log(error)
      }
    },

    onCancel() {
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>
