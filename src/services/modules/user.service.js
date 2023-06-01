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
    return BaseService.post('/user/resetUser', postData);
  }

  static async changePwdApi(postData) {
    return BaseService.post('/user/changePwd', postData);
  }

  static async avatarApi(postData) {
    return BaseService.post('/user/avatar', postData);
  }
}
