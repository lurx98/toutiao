<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="message.length === 0"
      @click="postComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postCommentApi } from '@/api/Article'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentPost',
  props: {
    articleId: {
      type: [String, Number],
      require: true,
    },
    type: {
      type: String,
      require: 'a',
    },
  },
  data() {
    return {
      message: '',
      artId: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters(['token']),
  },

  methods: {
    async postComment() {
      if (!this.token) return this.$toast('请登入')
      try {
        const { data } = await postCommentApi({
          target: this.articleId,
          content: this.message,
          art_id: this.type === 'a' ? null : this.artId,
        })
        this.message = ''
        this.$emit('postSuccess', data.data.new_obj)
      } catch (error) {
        console.log(error)
        this.$toast.fail(error.response.data.message)
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
