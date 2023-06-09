/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-03 00:29:29
 */
import { setTimeStamp } from '@/utils/auth';
import { LoginService, userService } from '@/services';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    // token：初次获取本地token实现自动登录效果，获取不到才赋值为空字符串
    token: '',
    userInfo: {},
  }),
  mutations: {
    // 保存token：保存在vuex和本地localStorage
    setToken(state, token) {
      state.token = token;
      console.log('token', state.token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = Object.assign(state.userInfo, userInfo);
    },
    setAvatar(state, url) {
      state.userInfo.avatar = url;
    },
  },
  actions: {
    // 登录逻辑
    login(context, userInfo) {
      const { commit } = context;
      const { username: userName, password } = userInfo;
      // console.log("userInfo", username, password)
      return new Promise((resolve, reject) => {
        LoginService.loginApi({
          userName,
          password,
        })
          .then((data) => {
            console.log('data', data);
            const { result } = data;
            commit('setToken', result.token);
            // commit('setUserInfo', result);
            // 保存登录时间(用于做主动退出)
            setTimeStamp();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出登录逻辑
    logout({ commit }) {
      // 清除token
      commit('setToken', '');
      commit('setUserInfo', {});
      // 清楚本地所有缓存数据
      window.localStorage.clear();
      window.sessionStorage.clear();
      // 退回到登录页面
      router.push('/login');
    },
    // 注册用户
    register(context, userInfo) {
      const { userName, password, userType } = userInfo;
      return new Promise((resolve, reject) => {
        userService
          .registerApi({
            userName,
            password,
            userType,
          })
          .then((data) => {
            console.log('data', data);
            resolve(data.result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((reslove) => {
        userService.getUserInfoApi().then((data) => {
          const { userInfo } = data?.result;
          const prefix = process.env.VUE_APP_API_URL;
          userInfo.avatar = prefix + userInfo.avatar;
          console.log('===', userInfo);
          commit('setUserInfo', userInfo);
          reslove(userInfo);
        });
      });
      // commit('setUserInfo', {});
    },

    // 获取用户信息
    getAllUser() {
      return new Promise((resolve) => {
        userService.getAllUserApi().then((data) => {
          const { result } = data;
          resolve(result);
        });
      });
      // commit('setUserInfo', {});
    },

    updateUser({ commit }, userInfo) {
      const { id, userName, nickName, email, phonenumber, sex, userType } = userInfo;
      commit('updateUserInfo', userInfo);
      return new Promise((resolve) => {
        userService
          .updateUserApi({
            id,
            userName,
            nickName,
            email,
            phonenumber,
            sex,
            userType,
          })
          .then((data) => {
            const { result } = data;
            resolve(result);
          });
      });
      // commit('setUserInfo', {});
    },

    deleteUser(commit, id) {
      return new Promise((resolve) => {
        userService
          .deleteUserApi({
            id,
          })
          .then((data) => {
            const { result } = data;
            resolve(result);
          });
      });
      // commit('setUserInfo', {});
    },

    resetUser(commit, id) {
      return new Promise((resolve) => {
        userService
          .resetUserApi({
            id,
          })
          .then((data) => {
            const { result } = data;
            resolve(result);
          });
      });
      // commit('setUserInfo', {});
    },

    changePwd(commit, passInfo) {
      const { oldPwd, newPwd } = passInfo;
      return new Promise((resolve) => {
        userService
          .changePwdApi({
            oldPwd,
            newPwd,
          })
          .then((data) => {
            const { result } = data;
            resolve(result);
          });
      });
      // commit('setUserInfo', {});
    },

    avatar({ commit }, data) {
      const { avatar, url } = data;
      return new Promise((resolve) => {
        userService
          .avatarApi({
            avatar,
          })
          .then((data) => {
            commit('setAvatar', url);
            const { result } = data;
            resolve(result);
          });
      });
      // commit('setUserInfo', {});
    },
  },
};
