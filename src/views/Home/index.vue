<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 16:01:48
-->
<template>
  <div class="container">
    <img :src="welcome" class="bgimage" />
    <div class="center">
      <el-card class="box-card" body-style="background-color:transparent" shadow="never">
        <h1 class="title box-card-item">{{ $t('system.name') }}</h1>
        <div class="welcome box-card-item"
          >{{ userInfo.userName }}{{ sex }},{{ $t('home.welcome') }}</div
        >
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
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import welcome from '@/assets/images/welcome.png';
  const store = useStore();
  const route = useRouter();
  const { userInfo } = store.getters;
  import { useI18n } from 'vue-i18n';
  const i18n = useI18n();
  console.log(route);

  const sex =
    userInfo.sex == '0' ? i18n.t('home.man') : userInfo.sex == '1' ? i18n.t('home.woman') : '';
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
