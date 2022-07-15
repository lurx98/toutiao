<template>
  <van-button
    v-if="value"
    :loading="isLoading"
    @click="followClick"
    class="follow-btn"
    round
    size="small"
    >已关注</van-button
  >
  <van-button
    v-else
    :loading="isLoading"
    @click="followClick"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >
</template>

<script>
import { followApi, cancelFollowApi } from '@/api/Article'

import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    authorId: {
      type: [String, Number],
      require: true,
    },
  },

  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async followClick() {
      if (!this.token) return this.$toast.fail('请登录')
      this.isLoading = true
      try {
        if (!this.value) {
          await followApi({
            target: this.authorId,
          })
        } else {
          await cancelFollowApi(this.authorId)
        }
        this.$toast.success(!this.value ? '关注成功' : '取消成功')
        this.$emit('input', !this.value)
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
  },
}
</script>

<style>
</style>
