<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-01 18:37:14
-->
<template>
  <div>账号设置</div>
  <div class="container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="手机号">
        <el-input v-model="form.phonenumber" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="form.userType" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();

  // do not use same name with ref
  const form = reactive({
    phonenumber: store.getters.userInfo.phonenumber,
    email: store.getters.userInfo.email,
    userType: store.getters.userInfo.userType == 1 ? '普通用户' : '管理员',
  });

  const onSubmit = () => {
    console.log('submit!');
  };

  import { ref } from 'vue';

  const imageUrl = ref('');
  imageUrl.value = store.getters.userInfo.avatar;

  // const handleAvatarSuccess = (response, uploadFile) => { };

  // const beforeAvatarUpload = (rawFile) => {
  //   if (rawFile.type !== 'image/jpeg') {
  //     ElMessage.error('Avatar picture must be JPG format!');
  //     return false;
  //   } else if (rawFile.size / 1024 / 1024 > 2) {
  //     ElMessage.error('Avatar picture size can not exceed 2MB!');
  //     return false;
  //   }
  //   imageUrl.value = URL.createObjectURL(rawFile);
  //   return true;
  // };
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 50px;
    position: relative;
  }

  .el-form {
    width: 600px;
  }

  .avatar-container {
    position: absolute;
    left: 750px;
    top: 50px;
  }

  .avatar {
    height: 120px;
    width: 120px;
  }

  .desc {
    text-align: center;
    padding-left: 15px;
    color: #8a919f;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    width: 110px;
  }

  .center {
    text-align: center;
  }
</style>
