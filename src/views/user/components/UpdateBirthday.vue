<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="cancel"
  />
</template>

<script>
import { updateUserInfo } from '@/api/User'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
    }
  },
  methods: {
    async onConfirm(value) {
      console.log('ok')
      const birthday = dayjs(value).format('YYYY-MM-DD')
      try {
        await updateUserInfo({
          birthday,
        })
        this.$emit('close')
        this.$emit('input', birthday)
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      console.log('ok')
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>
