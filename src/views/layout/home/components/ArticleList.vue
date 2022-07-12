<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :ArticleItem="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListApi } from '@/api/Home'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: Date.now(),
      isLoading: false,
      successText: 'successText',
    }
  },

  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleListApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
        })

        this.list.push(...data.data.results)
        this.loading = false

        if (data.data.results.length < 10) {
          this.finished = true
        } else {
          this.timestamp = data.data.pre_timestamp
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleListApi({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        })
        this.list.unshift(...data.data.results)
        this.successText = '更新了' + data.data.results.length + '数据'
      } catch (error) {
        this.$toast.fail('更新失败')
      }
      this.isLoading = false
    },
  },
  computed: {
    newList() {
      let map = new Map()
      for (let item of this.list) {
        if (!map.has(item.art_id)) {
          map.set(item.art_id, item)
        }
      }
      return [...map.values()]
    },
  },
}
</script>

<style>
</style>
