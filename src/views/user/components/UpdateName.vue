<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-right="updateName"
      @click-left="$emit('close')"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/User'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      message: this.value,
    }
  },
  computed: {},
  methods: {
    async updateName() {
      console.log('ok')
      if (this.message.length === 0) return
      try {
        await updateUserInfo({
          name: this.message,
        })
        this.$emit('close')
        this.$emit('input', this.message)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
