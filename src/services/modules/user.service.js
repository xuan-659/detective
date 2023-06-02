/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-30 23:06:23
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 13:34:42
 */
import BaseService from './../base.service';

export class userService extends BaseService {
  static async getUserInfoApi() {
    return BaseService.get('/user/getUserInfo');
  }

  static async getAllUserApi() {
    return BaseService.get('/user/getAllUser');
  }

  static async registerApi(postData) {
    return BaseService.post('/register', postData);
  }

  static async updateUserApi(postData) {
    return BaseService.post('/user/updateUser', postData);
  }

  static async deleteUserApi(postData) {
    return BaseService.post('/user/deleteUser', postData);
  }

  static async resetUserApi(postData) {
    return BaseService.get('/user/resetUser', postData);
  }

  static async changePwdApi(postData) {
    return BaseService.post('/user/changePwd', postData);
  }

  static async avatarApi(postData) {
    return BaseService.post('/user/avatar', postData);
  }
}
