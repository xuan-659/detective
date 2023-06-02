<!--
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 19:27:32
-->
<template>
  <div style="height: 1000px"
    >{{ $t('userManage.setting') }}
    <CustomTable :config="tableConfig" isShowTools isShowAction>
      <template #age="{ row }">{{ $t('userManage.age') }}:{{ row.age }}</template>
    </CustomTable>
    <!-- {{ tableConfig.selection }} -->
    <div style="margin-top: 30px">
      <el-button class="flex-item" type="success" @click="openDialogFormHandler">
        {{ $t('userManage.registUser') }}
      </el-button>
      <el-button class="flex-item" type="primary" @click="openDialogFormHandler2">
        {{ $t('userManage.changeUser') }}
      </el-button>
      <el-button class="flex-item" type="danger" @click="deleteUser">
        {{ $t('userManage.deleteUser') }}
      </el-button>
      <el-button class="flex-item" type="danger" @click="resetUser">
        {{ $t('userManage.resetUser') }}
      </el-button>
    </div>
    <div style="color: darkgray; font-size: 14px; margin-top: 20px">{{
      $t('userManage.resetInfo')
    }}</div>
    <DialogForm
      ref="dialogFormRef"
      :title="$t('userManage.registUser')"
      :confirmBtnText="$t('userInfo.confirm')"
      :formFields="formFields"
      :formData="formData"
      :rules="registrules"
      @confirm="confirm"
      width="700px"
    ></DialogForm>

    <DialogForm
      ref="dialogFormRef2"
      :title="$t('userManage.changeUser')"
      :confirmBtnText="$t('userManage.change')"
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
  import { useI18n } from 'vue-i18n';
  const i18n = useI18n();
  const store = useStore();
  const totalData = ref([]);
  const tableData = ref([]);

  const init = () => {
    store.dispatch('user/getAllUser').then((res) => {
      totalData.value = res;
      tableConfig.pagination.total = res.length || 0;
      updateInfo();
    });
  };

  init();

  const updateInfo = () => {
    const startIndex = (tableConfig.pagination.pageNumber - 1) * tableConfig.pagination.pageSize;
    tableData.value = [];
    for (
      let i = startIndex;
      i < totalData.value.length && i < startIndex + tableConfig.pagination.pageSize;
      i++
    ) {
      totalData.value[i].nickName = totalData.value[i].nickName ?? `user`;
      if (totalData.value[i].sex == '0') {
        totalData.value[i].sex = i18n.t('roleInfo.man');
      }
      if (totalData.value[i].sex == '1') {
        totalData.value[i].sex = i18n.t('roleInfo.woman');
      }
      if (totalData.value[i].userType == '0') {
        totalData.value[i].userType = i18n.t('userInfo.administrator');
      }
      if (totalData.value[i].userType == '1') {
        totalData.value[i].userType = i18n.t('userInfo.user');
      }

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
    indexLabel: i18n.t('userManage.serial'), // 序列号的表头名字
    // summary: true, // 表格底部汇总
    emptyText: i18n.t('userManage.emptyText'), // 没有数据的时候显示
    tableFields: [
      {
        prop: 'id',
        label: 'id',
      },
      {
        prop: 'userName',
        label: i18n.t('roleInfo.userNmae'),
      },
      {
        prop: 'nickName',
        label: i18n.t('roleInfo.nickName'),

        // type: 'slot',
        // slotName: 'age',
        // sortable: true,
      },
      {
        prop: 'email',
        label: i18n.t('userInfo.email'),
      },
      {
        prop: 'phonenumber',
        label: i18n.t('userInfo.phonenumber'),
      },
      {
        prop: 'sex',
        label: i18n.t('roleInfo.sex'),
      },
      {
        prop: 'userType',
        label: i18n.t('userInfo.userType'),
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
    store.dispatch('user/register', userInfo).then((res) => {
      console.log('res', res, totalData);
      totalData.value.push(res);
      updateInfo();
    });
  };

  // 修改用户信息
  const updateUser = (userInfo) => {
    console.log(userInfo);
    userInfo.id = tableConfig.selection[0].id;
    store.dispatch('user/updateUser', userInfo).then(() => {
      init();
      tableConfig.selection[0] = userInfo;
    });
  };

  // 弹窗
  import DialogForm from '@/components/DialogForm';
  // 表单的数据
  const formFields = reactive([
    {
      prop: 'userName',
      label: i18n.t('roleInfo.userName'),
    },
    {
      prop: 'password',
      label: i18n.t('userManage.password'),
    },
    {
      prop: 'userType',
      label: i18n.t('userInfo.userType'),
      type: 'select',
      options: [
        {
          label: i18n.t('userInfo.administrator'),
          value: '0',
        },
        {
          label: i18n.t('userInfo.user'),
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
      label: i18n.t('roleInfo.userNmae'),
    },
    {
      prop: 'nickName',
      label: i18n.t('roleInfo.nickName'),
    },
    {
      prop: 'email',
      label: i18n.t('userInfo.email'),
    },
    {
      prop: 'phonenumber',
      label: i18n.t('userInfo.phonenumber'),
    },
    {
      prop: 'sex',
      label: i18n.t('roleInfo.sex'),
      type: 'select',
      options: [
        {
          label: i18n.t('roleInfo.man'),
          value: 0,
        },
        {
          label: i18n.t('roleInfo.woman'),
          value: 1,
        },
      ],
    },
    {
      prop: 'userType',
      label: i18n.t('userInfo.userType'),
      type: 'select',
      options: [
        {
          label: i18n.t('userInfo.administrator'),
          value: '0',
        },
        {
          label: i18n.t('userInfo.user'),
          value: '1',
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
    if (userInfo.sex == i18n.t('roleInfo.man')) userInfo.sex = '0';
    if (userInfo.sex == i18n.t('roleInfo.woman')) userInfo.sex = '1';
    if (userInfo.userType == i18n.t('roleInfo.administrator')) userInfo.userType = '0';
    if (userInfo.userType == i18n.t('roleInfo.user')) userInfo.userType = '1';
    updateUser(userInfo);
  };
  const dialogFormRef2 = ref(null);
  const openDialogFormHandler2 = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error(i18n.t('userManage.selectMsg'));
      return false;
    }
    const { userName, nickName, email, phonenumber, sex, userType } = tableConfig.selection[0];
    console.log(userName, nickName, email, phonenumber, sex, userType);
    formData2.userName = userName;
    formData2.nickName = nickName;
    formData2.email = email;
    formData2.phonenumber = phonenumber;
    formData2.sex = sex;
    formData2.userType = userType;
    console.log(tableConfig.selection[0]);
    dialogFormRef2.value.openDialog();
  };

  // 删除用户
  const deleteUser = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error(i18n.t('userManage.selectMsg'));
      return false;
    }
    store.dispatch('user/deleteUser', tableConfig.selection[0].id).then(() => {
      init();
    });
  };

  // 用户
  const resetUser = () => {
    if (!tableConfig.selection.length) {
      ElMessage.error(i18n.t('userManage.selectMsg'));
      return false;
    }
    store.dispatch('user/resetUser', tableConfig.selection[0].id);
  };
</script>

<style lang="scss" scoped></style>
