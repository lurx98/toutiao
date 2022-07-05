<template>
  <div>
    layout
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="shouye" icon-prefix="toutiao">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="wenda" icon-prefix="toutiao">
        问答
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="shipin" icon-prefix="toutiao">
        视频
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="wode" icon-prefix="toutiao">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index.vue',
}
</script>

<style scoped>
</style>
