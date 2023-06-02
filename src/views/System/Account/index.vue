<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 16:22:49
-->
<template>
  <div>{{ $t('userInfo.setting') }}</div>
  <div class="container">
    <el-form :model="form" ref="ruleFormRef" label-width="120px" :rules="rules">
      <el-form-item :label="$t('userInfo.phonenumber')" prop="phonenumber">
        <el-input v-model="form.phonenumber" />
      </el-form-item>
      <el-form-item :label="$t('userInfo.email')" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item :label="$t('userInfo.userType')">
        <el-input v-model="form.userType" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">{{
          $t('userInfo.saveBtn')
        }}</el-button>
        <el-button type="primary" @click="openDialogFormHandler">{{
          $t('userInfo.changePwd')
        }}</el-button>
      </el-form-item>
    </el-form>

    <DialogForm
      ref="dialogFormRef"
      :rules="rules2"
      :validate-event="false"
      :title="$t('userInfo.changePwd')"
      :confirmBtnText="$t('userInfo.confirm')"
      :formFields="formFields"
      :formData="formData"
      @valid="valid"
      @confirm="confirm"
      width="700px"
    ></DialogForm>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  const i18n = useI18n();
  const store = useStore();
  const userInfo = store.getters.userInfo;
  // do not use same name with ref
  const form = reactive({
    phonenumber: userInfo.phonenumber,
    email: userInfo.email,
    userType: userInfo.userType == 1 ? i18n.t('userInfo.user') : i18n.t('userInfo.administrator'),
  });

  const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (!valid) {
        ElMessage.error(i18n.t('userInfo.infoError'));
        return false;
      } else {
        userInfo.phonenumber = form.phonenumber;
        userInfo.email = form.email;
        store.dispatch('user/updateUser', userInfo);
      }
    });
  };
  import DialogForm from '@/components/DialogForm';
  const dialogFormRef = ref(null);

  const formFields = reactive([
    {
      prop: 'oldPwd',
      label: i18n.t('userInfo.oldPwd'),
    },
    {
      prop: 'newPwd',
      label: i18n.t('userInfo.newPwd'),
      type: 'password',
    },
    {
      prop: 'confirmPwd',
      label: i18n.t('userInfo.confirmPwd'),
      type: 'password',
    },
  ]);

  const formData = reactive({
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
  });

  const valid = (formdata) => {
    formData.oldPwd = formdata.oldPwd;
    formData.newPwd = formdata.newPwd;
    formData.confirmPwd = formdata.confirmPwd;
  };
  const validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(i18n.t('userInfp.pwdError')));
    } else if (value !== formData.newPwd) {
      callback(new Error(i18n.t('userInfp.repeatError')));
    } else {
      callback();
    }
  };

  const ruleFormRef = ref();

  import { phonenumberValidate, emailValidate, passwordValidate } from '@/utils/validate';

  const rules = reactive({
    phonenumber: phonenumberValidate,
    email: emailValidate,
  });

  const rules2 = reactive({
    newPwd: passwordValidate,
    confirmPwd: [{ required: true, validator: validatePass2, trigger: 'fake trigger' }],
  });

  const openDialogFormHandler = () => {
    console.log(dialogFormRef);
    dialogFormRef.value.openDialog();
  };

  const changePassword = (passInfo) => {
    store.dispatch('user/changePwd', passInfo);
  };

  const confirm = (passInfo) => {
    formData.oldPwd = '';
    formData.newPwd = '';
    formData.confirmPwd = '';
    changePassword(passInfo);
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
