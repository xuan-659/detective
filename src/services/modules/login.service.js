/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-12 14:07:44
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-05-30 23:02:04
 */
import BaseService from './../base.service';

export class LoginService extends BaseService {
  static async loginApi(postData) {
    console.log('postData', postData);
    // return BaseService.post('/admin/login', postData);
    return BaseService.post('/user/login', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
