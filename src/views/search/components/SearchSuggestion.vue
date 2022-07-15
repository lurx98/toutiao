<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <div v-html="height(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { hightLight } from '@/utils/height'
import { getSearchSuggestionApi } from '@/api/Search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
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
      timer: null,
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function () {
        this.initDate()
      }, 200),

      immediate: true,
    },
  },

  mounted() {},
  methods: {
    async initDate() {
      try {
        const { data } = await getSearchSuggestionApi({
          q: this.searchText,
        })
        if (data.data.options[0] === null) {
          this.list = []
        } else {
          this.list = data.data.options
        }
        // this.list = data.data.options
      } catch (error) {}
    },
    height(val) {
      return hightLight(this.searchText, val)
    },
  },
}
</script>

<style scoped lang="less"></style>
