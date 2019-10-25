import axios from 'axios'
import utils from '@/utils';
import config from '@/config';
import store from '@/store';
import qs from 'qs';
import outLogin from '@/services/outLogin'

let baseURL = config.baseUrl;

// 创建axios实例
let service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 1000 * 60 ,// 请求超时时间
  headers:{
    'Authorization': store.state.token,
  },
})



// 请求拦截器
service.interceptors.request.use(config => {
  if(!service.headers){
    service.headers = {};
  }

  Object.assign( service.headers ,{
    'Authorization': store.state.token,
  });

  return config;
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 回传拦截器
service.interceptors.response.use(
  response => {
    const data = response.data;
    if ((data && data.code == 403) ||
      (data.message && data.message.toUpperCase() == "INVALID_TOKEN")) {
      return outLogin();
    }
    return response;
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error)
  }
)


//设置默认参数
const setDefaultParams = (data) => {
  return data;
};

//获取请求头
const getRequestHeader = (useJSON) => {
  return Object.assign({
    'Authorization': store.state.token,
  }, (useJSON ? config.requestHeader : {}));
};

//获取一个请求promise回调
const  getRqPromise=(res)=>{
  return new Promise((resolve, reject) => {
    if (res && res.status === 200) {
      resolve(res)
    } else {
      reject(res);
    }
  })
};

export const get = async (url, data = {}, useJSON) => {
  try {

    let res = await service.get(url, {
      headers: getRequestHeader(useJSON),
      params: setDefaultParams(data)
    });

    return getRqPromise(res);
  }

  catch (err) {
    console.log(err)
  }
};

export const post = async (url, data = {}, useJSON) => {
  try {

    setDefaultParams(data);

    if (!useJSON) {
      data = qs.stringify(data);
    }

    let res = await service.post(url,  data, {
        headers: getRequestHeader(useJSON)
      })

    return getRqPromise(res);

  } catch (err) {
    console.log(err)
  }
};


export default {
  get, post
}

