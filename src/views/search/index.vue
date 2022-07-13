<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @focus="isResultShow = false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <search-history
      v-else
      :search-history="searchHistory"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/SearchHistory.vue'
import SearchResult from '@/views/search/components/SearchResult.vue'
import SearchSuggestion from '@/views/search/components/SearchSuggestion.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  name: 'Search',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || [],
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      this.isResultShow = true
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
    },
    onCancel() {
      this.$router.back()
    },
  },
  watch: {
    searchHistory(val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    },
  },
}
</script>

<style lang='less'>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
