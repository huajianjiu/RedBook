import {request} from '../utils/request';
import {flow} from 'mobx';
import {save} from '../utils/Storage';
class UserStore {
  useInfo: any;
  // requestLogin = async (
  //   phone: string,
  //   password: string,
  //   callback: (success: boolean) => void,
  // ) => {
  //   try {
  //     const params = {
  //       name: phone,
  //       pwd: password,
  //     };
  //     const {data} = await request('login', params);
  //     if (data) {
  //       this.useInfo = data;
  //       callback?.(true);
  //     } else {
  //       this.useInfo = null;
  //       callback?.(false);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     this.useInfo = null;
  //     callback?.(false);
  //   }
  // };
  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    password: string,
    callback: (success: boolean) => void,
  ) {
    try {
      const params = {
        name: phone,
        pwd: password,
      };
      const {data} = yield request('login', params);
      if (data) {
        save('userInfo', JSON.stringify(data));
        this.useInfo = data;
        callback?.(true);
      } else {
        this.useInfo = null;
        callback?.(false);
      }
    } catch (e) {
      console.log(e);
      this.useInfo = null;
      callback?.(false);
    }
  });
}
// esm单例导出
export default new UserStore();
