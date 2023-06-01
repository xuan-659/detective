<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 04:17:55
-->
<template>
  <div>账号设置</div>
  <div class="container">
    <el-form :model="form" ref="ruleFormRef" label-width="120px" :rules="rules">
      <el-form-item label="手机号" prop="phonenumber">
        <el-input v-model="form.phonenumber" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="form.userType" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">保存修改</el-button>
        <el-button type="primary" @click="openDialogFormHandler">修改密码</el-button>
      </el-form-item>
    </el-form>

    <DialogForm
      ref="dialogFormRef"
      :rules="rules2"
      :validate-event="false"
      title="修改密码"
      confirmBtnText="确认"
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
  const store = useStore();
  const userInfo = store.getters.userInfo;
  // do not use same name with ref
  const form = reactive({
    phonenumber: userInfo.phonenumber,
    email: userInfo.email,
    userType: userInfo.userType == 1 ? '普通用户' : '管理员',
  });

  const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (!valid) {
        ElMessage.error('手机号或邮箱不正确');
        return false;
      } else {
        userInfo.phonenumber = form.phonenumber;
        userInfo.email = form.email;
        console.log('submit!');
        store.dispatch('user/updateUser', userInfo);
      }
    });
  };
  import DialogForm from '@/components/DialogForm';
  const dialogFormRef = ref(null);

  const formFields = reactive([
    {
      prop: 'oldPwd',
      label: '原密码',
    },
    {
      prop: 'newPwd',
      label: '新密码',
    },
    {
      prop: 'confirmPwd',
      label: '确认密码',
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
      callback(new Error('请再次输入密码'));
    } else if (value !== formData.newPwd) {
      callback(new Error('两次输入密码不一致!'));
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
