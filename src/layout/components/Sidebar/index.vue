<template>
  <div class="sidebar">
    <router-link to="/home">
      <div class="logo-container">
        <el-avatar shape="square" :size="logoHeight" width="auto" :src="squareUrl"></el-avatar>
        <h1 class="logo-title" v-if="$store.getters.sidebarOpened">{{ $t('system.name') }}</h1>
      </div>
    </router-link>
    <!-- 加上有滚动条 -->
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
  import SidebarMenu from './components/SidebarMenu';
  import { useStore } from 'vuex';
  import { defaultImageUrl } from '@/constant/index';
  import { ref } from 'vue';
  const logoHeight = 34;
  const store = useStore();
  // const squareUrl = store.getters?.userInfo?.avatar || defaultImageUrl;
  const userInfo = ref({
    avatar: defaultImageUrl,
  });

  const squareUrl = ref();
  // squareUrl.value = defaultImageUrl;
  store.dispatch('user/getUserInfo').then((res) => {
    userInfo.value = res;
    squareUrl.value = userInfo.value.avatar;
  });
</script>

<style lang="scss" scoped>
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-title {
      margin-left: 10px;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
</style>
