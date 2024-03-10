import axios, {AxiosResponse} from 'axios';
import Apis from '../api/index';
const instance = axios.create({
  baseURL: 'http://192.168.124.2:8080',
  timeout: 10000,
});
// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    console.log(error);
    if (response) {
      const {status} = response;
      if (status >= 500) {
        //   服务端错误
      } else if (status === 400) {
        //   接口参数异常
      } else if (status === 401) {
        //   登录信息过期
      } else {
        //   其他错误，统一按接口报错处理
      }
    } else {
      //   网络错误
      console.log(error);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export const request = (
  name: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (Apis as any)[name];
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};
const get = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {
    params,
  });
};
const post = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, {
    params,
  });
};
