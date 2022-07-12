<template>
  <div>
    <template>
      <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
          <van-button
            class="search-btn"
            slot="title"
            type="info"
            size="small"
            round
            icon="search"
            >搜索</van-button
          >
        </van-nav-bar>
        <!-- /导航栏 -->
        <van-tabs
          class="channel-tabs"
          v-model="active"
          swipeable
          animated
          border
        >
          <van-tab v-for="item in channels" :key="item.id" :title="item.name">
            <articles-list :channel="item"></articles-list>
          </van-tab>
          <!-- 右侧自定义内容 -->
          <!-- 占位元素 -->
          <template #nav-right>
            <div class="placeholder"></div>
            <!-- 右侧按钮 -->
            <div class="hamburger-btn" @click="isEditShow = true">
              <i class="toutiao toutiao-gengduo"></i>
            </div>
            <van-popup
              v-model="isEditShow"
              closeable
              close-icon-position="top-left"
              position="bottom"
              :style="{ height: '90%' }"
            >
              <channel-edit
                :active-index="active"
                :my-channels="channels"
                @changeTab="changeTab"
                @changeIndex="changeIndex"
              ></channel-edit>
            </van-popup>
          </template>
        </van-tabs>
      </div>
    </template>
  </div>
</template>

<script>
import { getChannelsApi } from '@/api/Home'
import ArticlesList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { getItem } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeIndex',
  components: { ArticlesList, ChannelEdit },
  props: {},
  data() {
    return {
      isEditShow: false,
      active: 2,
      channels: [],
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  watch: {},
  created() {
    this.initChannels()
  },
  mounted() {},
  methods: {
    async initChannels() {
      if (this.token) {
        try {
          const { data } = await getChannelsApi()
          this.channels = data.data.channels
        } catch (error) {
          console.log(error)
        }
      } else {
        const localUserChannels = getItem('TOUTIAO_USER_CHANNELS')
        if (localUserChannels) {
          this.channels = localUserChannels
        } else {
          try {
            const { data } = await getChannelsApi()
            this.channels = data.data.channels
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    changeTab(ind) {
      this.active = ind
      this.isEditShow = false
    },
    changeIndex(val) {
      this.active = val
    },
  },
}
</script>

<style  lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar {
    background-color: #3296fa;
  }
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
 