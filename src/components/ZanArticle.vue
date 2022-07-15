<template>
  <van-loading v-if="isLoading" size="16" />
  <van-icon
    v-else
    :color="value === 1 ? '#0f0' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="zanHandle"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { zanArticleApi, cancelZanArticleApi } from '@/api/Article'

export default {
  props: {
    value: {
      type: Number,
      require: true,
    },
    articleId: {
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
    async zanHandle() {
      if (!this.token) return this.$toast.fail('请登录')
      this.isLoading = true
      console.log(this.value)
      try {
        if (this.value === 1) {
          await cancelZanArticleApi(this.articleId)
        } else {
          await zanArticleApi({
            target: this.articleId,
          })
        }
        this.$toast.success(this.value === 1 ? '取消成功' : '收藏成功')
        const newZan = this.value === 1 ? 0 : 1
        console.log(newZan)
        this.$emit('input', newZan)
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
