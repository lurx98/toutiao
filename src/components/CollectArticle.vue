<template>
  <van-loading v-if="isLoading" size="16" />
  <van-icon
    v-else
    :color="value ? '#0f0' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="collectHandle"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { collectArticleApi, cancelCollectArticleApi } from '@/api/Article'

export default {
  props: {
    value: {
      type: Boolean,
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
    async collectHandle() {
      if (!this.token) return this.$toast.fail('请登录')
      this.isLoading = true
      try {
        if (!this.value) {
          await collectArticleApi({
            target: this.articleId,
          })
        } else {
          await cancelCollectArticleApi(this.articleId)
        }
        this.$toast.success(!this.value ? '收藏成功' : '取消成功')

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
