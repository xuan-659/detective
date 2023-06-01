/**
 * 判断是否为外部资源
 */

import { ElMessage } from 'element-plus';
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const phonenumberValidate = [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  {
    pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
    message: '请输入合法手机号/电话号',
    trigger: 'blur',
  },
];

export const emailValidate = [
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  {
    pattern: /^([0-9A-Za-z\-_]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
    message: '请输入正确的邮箱',
    trigger: 'blur',
  },
];

export const passwordValidate = [
  { required: true, message: '请输入新密码', trigger: 'blur' },
  { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
];

export const nickNameValidate = [
  { required: true, message: '请输入昵称', trigger: 'blur' },
  { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' },
];

export const userNameValidate = [
  { required: true, message: '请输入用户名', trigger: 'blur' },
  { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' },
];

const validateuserType = (rule, value, callback) => {
  if (value == '管理员' || value == '用户') {
    callback();
  } else {
    callback(new Error('请输入管理员或用户'));
  }
};

export const userTypeValidate = [
  { required: true, message: '请输入用户类型', trigger: 'blur' },
  { required: true, validator: validateuserType, trigger: 'blur' },
];

export const validateImage = (rawFile) => {
  const accept = ['image/jpeg', 'image/jpg', 'image/png'];
  if (accept.indexOf(rawFile.type) === -1) {
    ElMessage.error('Avatar picture must be jpeg/jpg/png format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }

  return true;
};

export const validatePassword = (password) => {
  let message = undefined;
  if (password.length < 6 || password.length > 20) {
    message = 'Length should be 3 to 20';
  }
  return message;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  let message = undefined;
  if (password !== confirmPassword) {
    console.log(password, confirmPassword);
    message = '新密码与确认密码不一致';
  }
  return message;
};
