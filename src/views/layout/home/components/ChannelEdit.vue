<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="index"
        @click="checkHandle(item, index)"
      >
        <van-icon
          v-if="isEditShow && item.name !== '推荐'"
          slot="icon"
          name="clear"
        ></van-icon>
        <span
          class="text"
          :class="{ active: index === activeIndex }"
          slot="text"
          >{{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="addChannel(item)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannelApi,
  setUserChannels,
  delUserChannelsApi,
} from '@/api/Home'
import { mapGetters } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    activeIndex: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEditShow: false,
    }
  },
  computed: {
    ...mapGetters(['token']),
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((val) => val.id === item.id)
      })
    },
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    async initData() {
      try {
        const { data } = await getAllChannelApi()
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async addChannel(val) {
      this.myChannels.push(val)
      if (this.token) {
        console.log(this.token)
        try {
          await setUserChannels({
            channels: [
              {
                id: val.id,
                seq: this.myChannels.length - 1,
              },
            ],
          })
        } catch (error) {}
      } else {
        console.log('未登录')
        setItem('TOUTIAO_USER_CHANNELS', this.myChannels)
      }
    },
    checkHandle(item, inx) {
      if (this.isEditShow) {
        if (item.name === '推荐') return
        if (inx <= this.activeIndex) {
          this.$emit('changeIndex', this.activeIndex - 1)
        }
        this.myChannels.splice(inx, 1)
        this.delHandle(item)
      } else {
        this.$emit('changeTab', inx)
      }
    },
    async delHandle(item) {
      if (this.token) {
        try {
          await delUserChannelsApi(item.id)
        } catch (error) {}
      } else {
        setItem('TOUTIAO_USER_CHANNELS', this.myChannels)
      }
    },
  },
}
</script>

<style  lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
