/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-19 15:08:20
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 01:10:32
 */
import BaseService from './../base.service';

export class UploadService extends BaseService {
  static async uploadApi(postData) {
    console.log('postData', postData);
    return BaseService.post('/value/upload', postData);
  }
}

export class AnalyseService extends BaseService {
  static async analyseApi(postData) {
    console.log('postData', postData);
    return BaseService.post('/analyse', postData);
  }
}

export class SelectMsgService extends BaseService {
  static async selectMsgApi(postData) {
    console.log('postData', postData);
    return BaseService.post('/selectMsg', postData);
  }
}
