<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api/Search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      resultPage: {
        page: 1,
        per_page: 10,
      },
    }
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResultApi({
          ...this.resultPage,
          q: this.searchText,
        })
        this.list.push(...data.data.results)
        this.resultPage.page++
        this.loading = false
        if (data.data.results.length < 10) {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
