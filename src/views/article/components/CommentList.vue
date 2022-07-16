<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- 评论每一项 -->
    <comment-item
      v-for="item in list"
      :key="item.com_id"
      :comment="item"
      @replyHandle="$emit('replyHandle', $event)"
    />
  </van-list>
</template>
<script>
import { getCommentApi } from '@/api/Article'
import CommentItem from '@/views/article/components/CommentItem.vue'
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    sourceId: {
      type: [String, Number],
    },
    list: {
      type: Array,
      default: () => [],
      require: true,
    },
    type: {
      type: String,
      default: 'a',
    },
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      pageSize: 10,
      offset: null,
    }
  },
  created() {
    this.loading = false
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentApi({
          type: this.type,
          source: this.sourceId,
          offset: this.offset,
          limit: this.pageSize,
        })
        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length < this.pageSize) {
          this.finished = true
        } else {
          this.offset = data.data.last_id
        }
        this.$emit('totalCount', data.data.total_count)
      } catch (error) {
        this.loading = false
      }

      // 异步更新数据
    },
  },
}
</script>
