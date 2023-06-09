/*
 * @Author       : wzx 953579022@qq.com
 * @Date         : 2023-05-19 15:05:51
 * @LastEditors  : wzx 953579022@qq.com
 * @LastEditTime : 2023-06-02 12:48:59
 */
import { UploadService, AnalyseService, SelectMsgService } from '@/services/index';
import { toFromData } from '../../utils/fomdata';

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    upload(context, file) {
      return new Promise((resolve, reject) => {
        UploadService.uploadApi({
          file,
        })
          .then((data) => {
            console.log('data', data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    analyse(context, fileName) {
      return new Promise((resolve, reject) => {
        AnalyseService.analyseApi({
          fileName,
        })
          .then((data) => {
            console.log('data', data);
            const { result } = data;
            resolve(result[0]);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    selectMsg(context, selectInfo) {
      const { fileName, keyWords } = selectInfo;
      return new Promise((resolve, reject) => {
        SelectMsgService.selectMsgApi(
          toFromData({
            fileName,
            keyWords,
          })
        )
          .then((data) => {
            console.log('data', data);
            resolve(data.result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
