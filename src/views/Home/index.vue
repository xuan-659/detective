<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-01 22:53:05
-->
<template>
  <div class="container">
    <img :src="welcome" class="bgimage" />
    <div class="center">
      <el-card class="box-card" body-style="background-color:transparent" shadow="never">
        <h1 class="title box-card-item">软件缺陷报告评判系统</h1>
        <div class="welcome box-card-item">{{ userInfo.userName }}{{ sex }},欢迎使用本系统</div>
        <div class="box-card-item"> 您可能想使用： </div>
        <div class="box-card-item" style="color: blue">
          <router-link to="/user/user" v-if="!userInfo.userType">用户管理 </router-link>
          <router-link to="/system/role">个人资料 </router-link>
          <router-link to="/detection/detection">缺陷查询 </router-link>
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
  console.log(route);

  const sex = userInfo.sex == 0 ? '先生' : userInfo.sex == 1 ? '女士' : '';
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
</style>
