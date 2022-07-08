<template>
  <div class="login-container">
    <!-- 头部导航 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        maxlength="11"
        icon-prefix="toutiao"
        left-icon="shouji"
        v-model="user.mobile"
        type="number"
        name="mobile"
        placeholder="请填写手机号"
        :rules="rules.mobile"
      />
      <van-field
        maxlength="6"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            native-type="button"
            v-if="isCountShow"
            disabled
          >
            <van-count-down :time="5000" format="ss 秒" @change="timeData" />
          </van-button>
          <van-button
            size="small"
            type="primary"
            native-type="button"
            v-else
            @click="sendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendSmsApi, userLoginApi } from '@/api/Login'
import { mapMutations } from 'vuex'
export default {
  name: 'index.vue',
  data() {
    return {
      isCountShow: false,
      user: {
        mobile: '',
        code: '',
      },
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号不正确' },
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' },
        ],
      },
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        const { data } = await userLoginApi(this.user)
        // this.$store.commit('setUser', data.data)
        this.setUser(data.data)
        this.$toast.success('登录成功')
        this.$router.replace('/my')
      } catch (error) {
        this.$toast(error.response.data.message)
      }
      this.$toast.clear()
    },
    async sendSms() {
      // this.$refs.form
      //   .validate('mobile')
      //   .then((res) => {
      //     this.isCountShow = true
      //   })
      //   .catch((err) => {
      //   })
      try {
        await this.$refs.form.validate('mobile')
      } catch (error) {
        return
      }
      this.isCountShow = true
      try {
        const data = await sendSmsApi(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        this.$toast.fail('发送失败')
      }
    },
    timeData(time) {
      const { seconds } = time
      if (seconds === 0) {
        this.isCountShow = false
      }
    },
  },
}
</script>

<style lang='less'>
.login-container {
  .van-nav-bar {
    background-color: #3296fa;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-field__control::placeholder {
    color: #c8c9cc;
  }
  .van-count-down {
    color: #fff;
  }
}
</style>
