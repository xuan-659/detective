<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 04:10:12
-->
<template>
  <div style="height: 1000px"
    >用户管理
    <CustomTable :config="tableConfig" isShowTools isShowAction>
      <template #age="{ row }">年龄:{{ row.age }}</template>
    </CustomTable>
    <!-- {{ tableConfig.selection }} -->
    <div>
      <el-button class="flex-item" type="success" @click="openDialogFormHandler">
        注册用户
      </el-button>
      <el-button class="flex-item" type="primary" @click="openDialogFormHandler2">
        修改用户信息
      </el-button>
      <el-button class="flex-item" type="danger" @click="deleteUser"> 删除用户 </el-button>
      <el-button class="flex-item" type="danger" @click="resetUser"> 重置密码 </el-button>
    </div>

    <DialogForm
      ref="dialogFormRef"
      title="注册用户"
      confirmBtnText="确认"
      :formFields="formFields"
      :formData="formData"
      :rules="registrules"
      @confirm="confirm"
      width="700px"
    ></DialogForm>

    <DialogForm
      ref="dialogFormRef2"
      title="修改用户信息"
      confirmBtnText="修改"
      :formFields="formFields2"
      :formData="formData2"
      :rules="rules2"
      @confirm="confirm2"
      width="700px"
    ></DialogForm>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { useStore } from 'vuex';
  import CustomTable from '@/components/CustomTable';
  const store = useStore();
  const totalData = ref([]);
  const tableData = ref([]);
  store.dispatch('user/getAllUser').then((res) => {
    totalData.value = res;
    tableConfig.pagination.total = res.length || 0;
    updateInfo();
  });

  const updateInfo = () => {
    const startIndex = (tableConfig.pagination.pageNumber - 1) * tableConfig.pagination.pageSize;
    // const endIndex = tableConfig.pagination.pageNumber * tableConfig.pagination.pageSize
    // console.log('页码', startIndex, endIndex)
    tableData.value = [];
    for (
      let i = startIndex;
      i < totalData.value.length && i < startIndex + tableConfig.pagination.pageSize;
      i++
    ) {
      tableData.value.push(totalData.value[i]);
    }
    console.log(tableData.value);
  };
  const onChangePageHandler = (pageNumber, pageSize) => {
    console.log(pageNumber, pageSize);
    tableConfig.pagination.pageNumber = pageNumber;
    tableConfig.pagination.pageSize = pageSize;
    updateInfo();
  };
  const indexHandler = (index) => {
    return (tableConfig.pagination.pageNumber - 1) * tableConfig.pagination.pageSize + index + 1;
  };
  const tableConfig = reactive({
    loading: true,
    selectable: true, // 是否选择能力
    // multiple: true, // 是否单选
    rowKey: 'id', //表格数据主键
    indexable: true, // 是否有序列号
    selection: [],
    indexMethod: indexHandler, // 序号显示的方式
    indexLabel: '序号', // 序列号的表头名字
    // summary: true, // 表格底部汇总
    emptyText: '无数据', // 没有数据的时候显示
    tableFields: [
      {
        prop: 'id',
        label: 'id',
      },
      {
        prop: 'userName',
        label: '用户名',
        align: 'center',
      },
      {
        prop: 'nickName',
        label: '昵称',
        // type: 'slot',
        // slotName: 'age',
        // sortable: true,
      },
      {
        prop: 'email',
        label: '邮箱',
      },
      {
        prop: 'userName',
        label: '手机号',
      },
      {
        prop: 'sex',
        label: '性别',
      },
      {
        prop: 'userType',
        label: '账号类型',
      },
    ], // 表头
    tableData: tableData, // 表格数据
    pagination: {
      total: 200,
      pageSize: 10,
      pageNumber: 1,
      onChange: onChangePageHandler, // 分页事件
    },
    selectionChange: (selectList) => {
      // 单选多选回调
      console.log(selectList, '点击的单选/多选');
      tableConfig.selection = selectList;
    },
  });
  setTimeout(() => {
    tableConfig.loading = false;
  }, 1000);

  // 注册用户信息
  const registerUser = (userInfo) => {
    store.dispatch('user/register', userInfo);
  };

  // 修改用户信息
  const updateUser = (userInfo) => {
    console.log(userInfo);
    userInfo.id = tableConfig.selection[0].id;
    store.dispatch('user/updateUser', userInfo);
  };

  // 弹窗
  import DialogForm from '@/components/DialogForm';
  // 表单的数据
  const formFields = reactive([
    {
      prop: 'userName',
      label: '用户名',
    },
    {
      prop: 'password',
      label: '密码',
    },
    {
      prop: 'userType',
      label: '用户类型',
      type: 'select',
      options: [
        {
          label: '管理员',
          value: '0',
        },
        {
          label: '普通用户',
          value: '1',
        },
      ],
    },
  ]);

  const formData = reactive({
    userName: '',
    password: '',
    userType: '',
  });

  import {
    userNameValidate,
    passwordValidate,
    nickNameValidate,
    emailValidate,
    phonenumberValidate,
  } from '@/utils/validate';
  import { ElMessage } from 'element-plus';
  const registrules = reactive({
    userName: userNameValidate,
    password: passwordValidate,
  });

  const confirm = (userInfo) => {
    registerUser(userInfo);
  };
  const dialogFormRef = ref(null);
  const openDialogFormHandler = () => {
    console.log(dialogFormRef);
    dialogFormRef.value.openDialog();
  };

  // 修改用户表单数据
  const formFields2 = reactive([
    {
      prop: 'userName',
      label: '用户名',
    },
    {
      prop: 'nickName',
      label: '昵称',
    },
    {
      prop: 'email',
      label: '邮箱',
    },
    {
      prop: 'phonenumber',
      label: '手机号',
    },
    {
      prop: 'sex',
      label: '性别',
      type: 'select',
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
    {
      prop: 'userType',
      label: '账号类型',
      type: 'select',
      options: [
        {
          label: '管理员',
          value: 0,
        },
        {
          label: '普通用户',
          value: 1,
        },
      ],
    },
  ]);
  const formData2 = reactive({
    userName: '',
    nickName: '',
    email: '',
    phonenumber: '',
    sex: '',
    userType: '',
  });

  const rules2 = reactive({
    userName: userNameValidate,
    nickName: nickNameValidate,
    email: emailValidate,
    phonenumber: phonenumberValidate,
  });

  const confirm2 = (userInfo) => {
    if (userInfo.sex == '男') userInfo.sex = 0;
    if (userInfo.sex == '女') userInfo.sex = 1;
    if (userInfo.userType == '管理员') userInfo.userType = 0;
    if (userInfo.userType == '普通用户') userInfo.userType = 1;
    updateUser(userInfo);
  };
  const dialogFormRef2 = ref(null);
  const openDialogFormHandler2 = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error('请选中用户');
      return false;
    }
    const { userName, nickName, email, phonenumber, sex, userType } = tableConfig.selection[0];
    console.log(userName, nickName, email, phonenumber, sex, userType);
    formData2.userName = userName;
    formData2.nickName = nickName;
    formData2.email = email;
    formData2.phonenumber = phonenumber;
    formData2.sex = sex == 0 ? '男' : '女';
    formData2.userType = userType == 0 ? '管理员' : '普通用户';
    console.log(tableConfig.selection[0]);
    dialogFormRef2.value.openDialog();
  };

  // 删除用户
  const deleteUser = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error('请选中用户');
      return false;
    }
    store.dispatch('user/deleteUser', tableConfig.selection[0].id);
  };

  // 用户
  const resetUser = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error('请选中用户');
      return false;
    }
    store.dispatch('user/resetUser', tableConfig.selection[0].id);
  };
</script>

<style lang="scss" scoped></style>
