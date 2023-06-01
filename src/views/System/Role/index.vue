<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-01 18:34:10
-->
<template>
  <div>个人资料</div>
  <div class="container">
    <div class="avatar-container">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <div class="center"> 我的头像 </div>
      <div class="desc"> 支持 jpg、png、jpeg 格式大小 5M 以内的图片 </div>
    </div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" disabled />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
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
    userName: store.getters.userInfo.userName,
    nickName: store.getters.userInfo.nickName,
    sex: store.getters.userInfo.sex == 1 ? '男' : '女',
  });

  const onSubmit = () => {
    console.log('submit!');
  };

  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';

  const imageUrl = ref('');
  imageUrl.value = store.getters.userInfo.avatar;

  // const handleAvatarSuccess = (response, uploadFile) => {};

  const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!');
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    imageUrl.value = URL.createObjectURL(rawFile);
    return true;
  };
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
