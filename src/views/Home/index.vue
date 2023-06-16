<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-16 17:19:15
-->
<template>
  <div class="container" v-loading="loading">
    <img :src="welcome" class="bgimage" />
    <div class="center">
      <el-card class="box-card" body-style="background-color:transparent" shadow="never">
        <h1 class="title box-card-item">{{ $t('system.name') }}</h1>
        <div class="welcome box-card-item">{{ userInfo.userName }} {{ $t('home.welcome') }}</div>
        <div class="box-card-item"> {{ $t('home.mayUse') }}： </div>
        <div class="box-card-item" style="color: blue">
          <router-link to="/user/user" class="item" v-if="userInfo.userType == '0'"
            >{{ $t('route.user') }}
          </router-link>
          <router-link to="/system/role" class="item">{{ $t('route.role') }} </router-link>
          <router-link to="/detection/detection" class="item"
            >{{ $t('route.detection') }}
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import welcome from '@/assets/images/welcome.png';
  const store = useStore();
  const loading = ref(true);
  const userInfo = ref({
    userName: '',
    userType: '0',
  });

  if (location.href.indexOf('#reloaded') == -1) {
    location.href = location.href + '#reloaded';
    setTimeout(() => {
      location.reload();
    }, 100);
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 100);
  }
  store.dispatch('user/getUserInfo').then((res) => {
    userInfo.value = res;
    console.log('======', userInfo);
  });
  // userInfo.value  = store.getters.userInfo;
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 85vh;
    width: 100%;
  }

  .bgimage {
    height: fit-content;
    width: 1280px;
    height: 780px;
    margin: -40px;
    position: absolute;
    user-select: none;
  }

  ::v-deep .el-card {
    background-color: transparent;
    border: 0;
  }

  .center {
    position: absolute;
    top: 30%;
    left: 30%;
  }

  .box-card-item {
    padding: 10px;
  }

  .item {
    padding: 10px;
  }
</style>
