<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" ref="inp" @change="inpChange" hidden />
    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="$refs.inp.click()"
    >
      <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 1 ? '女' : '男'"
      is-link
      @click="isUpdateSex = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isUpdateBirthday = true"
    />
    <!-- /个人信息 -->
    <van-popup position="bottom" v-model="isUpdatePhoto"></van-popup>
    <van-popup position="bottom" v-model="isUpdateName" style="height: 100vh">
      <update-name
        @close="isUpdateName = false"
        v-model="userInfo.name"
        v-if="isUpdateName"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isUpdateSex">
      <update-sex
        v-model="userInfo.gender"
        @close="isUpdateSex = false"
        v-if="isUpdateSex"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isUpdateBirthday"
      ><update-birthday
        v-model="userInfo.birthday"
        @close="isUpdateBirthday = false"
        v-if="isUpdateBirthday"
    /></van-popup>
    <van-popup position="bottom" style="height: 100vh" v-model="isUpdatePhoto"
      ><update-photo
        :img="imgUrl"
        @close="isUpdatePhoto = false"
        @updateImg="userInfo.photo = $event"
        >111</update-photo
      ></van-popup
    >
  </div>
</template>

<script>
import { getUserProfile, updatePhotoApi } from '@/api/User'
import UpdateName from '@/views/user/components/UpdateName.vue'
import UpdateSex from '@/views/user/components/UpdateSex.vue'
import UpdateBirthday from '@/views/user/components/UpdateBirthday.vue'
import UpdatePhoto from '@/views/user/components/UpdatePhoto.vue'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateSex, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      userInfo: '',
      isUpdatePhoto: false,
      isUpdateName: false,
      isUpdateSex: false,
      isUpdateBirthday: false,
      imgUrl: '',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async inpChange() {
      const imgFile = this.$refs.inp.files[0]
      const typeArr = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
      if (!typeArr.includes(imgFile.type))
        return this.$toast.fail('文件类型不正确')
      const maxSize = 1024 * 1024 * 3
      if (imgFile.size > maxSize)
        return this.$toast.fail('文件大小不允许超过3M')
      this.imgUrl = URL.createObjectURL(imgFile)
      this.isUpdatePhoto = true
      this.$refs.inp.files = null
    },
  },
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
