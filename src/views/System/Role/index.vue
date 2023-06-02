<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 16:36:35
-->
<template>
  <div>{{ $t('roleInfo.setting') }}</div>
  <div class="container">
    <div class="avatar-container">
      <el-upload
        class="avatar-uploader"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="onChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <div class="center"> {{ $t('roleInfo.myAvatar') }} </div>
      <div class="desc"> {{ $t('roleInfo.support') }} </div>
    </div>
    <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="120px">
      <el-form-item :label="$t('roleInfo.userNmae')">
        <el-input v-model="form.userName" disabled />
      </el-form-item>
      <el-form-item :label="$t('roleInfo.nickName')" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item :label="$t('roleInfo.sex')">
        <el-select v-model="form.sex" :placeholder="$t('roleInfo.sexPlaceholder')">
          <el-option :label="$t('roleInfo.man')" value="0" />
          <el-option :label="$t('roleInfo.woman')" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">{{
          $t('userInfo.saveBtn')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';
  const i18n = useI18n();
  const store = useStore();
  const userInfo = store.getters.userInfo;
  // do not use same name with ref
  const form = reactive({
    userName: userInfo.userName,
    nickName: userInfo.nickName,
    sex: userInfo.sex == '1' ? i18n.t('roleInfo.woman') : i18n.t('roleInfo.man'),
  });

  const ruleFormRef = ref();
  const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        userInfo.nickName = form.nickName;
        userInfo.sex = form.sex == i18n.t('roleInfo.man') ? '0' : '1';
        store.dispatch('user/updateUser', userInfo);
      } else {
        ElMessage.error(fields.nickName[0].message);
        return;
      }
    });
  };

  import { nickNameValidate } from '@/utils/validate';
  const rules = reactive({
    nickName: nickNameValidate,
  });

  import { ref } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';

  const imageUrl = ref('');
  imageUrl.value = store.getters.userInfo.avatar;

  // const handleAvatarSuccess = (response, uploadFile) => {};
  import { validateImage } from '@/utils/validate';
  const onChange = (uploadFile) => {
    console.log(uploadFile);
    if (!validateImage(uploadFile.raw)) return false;
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    store.dispatch('user/avatar', uploadFile);
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
