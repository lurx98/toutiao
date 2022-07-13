<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isEdit">
        <span @click="searchHistory.splice(0)">全部删除 </span>
        <span @click="isEdit = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isEdit = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
      @click="clickHandle(item, index)"
    >
      <van-icon name="close" v-if="isEdit" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isEdit: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickHandle(item, idx) {
      if (this.isEdit) {
        this.searchHistory.splice(idx, 1)
      } else {
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>

