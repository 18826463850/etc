import http from '@/services/http'
import request from '@/services/request'   // 易行易停接口请求

/**
 * 保存申请信息 云南
 */
export const saveApplyInfoInYunNan = (data)=>  request.post("/api/dian/saveYnApplyInfo", data,true);


 /**
  * 微信登录 云南
  * @param {*} data 
  */
export const loginByWxInYunNan = (data)=>  request.post("/api/dian/loginByWx", data);


 /**
  * 获取obu id 云南
  * @param {*} data 
  */
 export const getObuIdInYunNan = (data)=>  request.get("/api/dian/obuapply", data);


 /**
  * 获取obu id 云南
  * @param {*} data 
  */
 export const saveBankInfoInYunNan = (data)=>  request.post("/api/dian/banksign", data);


/**
 * 添加收货地址 云南
 */
export const addShippingInfoInYunNan = (data) => request.post("/api/dian/addShippingInfo", data,true);

 
 /**
  * 修改绑定银行状态
  * @param {*} data 
  */
 export const changeStatusInYunNan = (data)=>  request.get("/api/dian/changeStatus/"+data.applyId,{});

 export const checkOrderYunnan = (data) => http.get("/api/dian/checkOrder" , data , true);









