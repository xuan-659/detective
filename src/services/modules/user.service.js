import BaseService from './../base.service';

export class userService extends BaseService {
  static async getUserInfoApi() {
    // return BaseService.post('/admin/login', postData);
    return BaseService.get('/user/getUserInfo');
  }
}
