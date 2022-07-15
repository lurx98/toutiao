<template>
  <van-cell class="article-item" :to="`/article/${ArticleItem.art_id}`">
    <template #title>
      <div class="title van-multi-ellipsis--l2">
        {{ ArticleItem.title }}
      </div>
    </template>
    <template #label>
      <div v-if="ArticleItem.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in ArticleItem.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ ArticleItem.aut_name }}</span>
        <span>{{ ArticleItem.comm_count }}评论</span>
        <span>{{ ArticleItem.pubdate | relativeTime }}</span>
      </div>
    </template>
    <van-image
      v-if="ArticleItem.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="ArticleItem.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  props: {
    ArticleItem: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang='less'>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
