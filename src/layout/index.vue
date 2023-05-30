<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-05-30 23:15:04
-->
<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左边导航 -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></Sidebar>
    <!-- 右边内容区域 -->
    <div class="main-container">
      <!-- 头部导航 -->
      <div class="fixed-header">
        <Navbar />
        <TagsView />
      </div>
      <!-- 内容区域 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
  import Sidebar from './components/Sidebar';
  import AppMain from './components/AppMain.vue';
  import TagsView from '@/components/TagsView/index.vue';
  import { useStore } from 'vuex';

  const store = useStore();
  store.dispatch('user/getUserInfo');
  console.log('layout', store.getters.userInfo);
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';
  @import '~@/assets/styles/variables.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width #{$sideBarDuration};
  }

  .hideSidebar .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
</style>
