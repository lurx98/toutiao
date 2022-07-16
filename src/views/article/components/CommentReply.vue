<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count ? '评论数量为' + comment.reply_count : '暂无评论'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <van-cell value="当前评论项"></van-cell>
      <comment-item :comment="comment"></comment-item>
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell value="评论列表"></van-cell>
      <comment-list
        :sourceId="comment.com_id"
        type="c"
        :list="list"
      ></comment-list>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->

    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        type="c"
        :article-id="comment.com_id"
        @postSuccess="postSuccess"
      ></comment-post>
    </van-popup>

    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/CommentItem.vue'
import CommentList from '@/views/article/components/CommentList.vue'
import CommentPost from '@/views/article/components/CommentPost.vue'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      require: true,
    },
  },
  components: { CommentItem, CommentList, CommentPost },
  data() {
    return {
      isPostShow: false,
      list: [],
    }
  },
  methods: {
    postSuccess(val) {
      this.list.unshift(val)
      this.isPostShow = false
      this.comment.reply_count++
    },
  },
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
