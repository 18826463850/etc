import http from '@/services/http'   // 赤兔易行接口请求
import request from '@/services/request'   // 易行易停接口请求

/**
 * 保存申请信息 广东
 */
export const saveApplyInfoInGuangDong = (data)=>  request.post("/api/yue/saveApplyInfo", data,true);

/**
 * 查询车辆是否已办理粤通卡 广东
 */
export const queryIssue = (data)=>  request.get("/api/yue/queryIssue", data,true);

/**
 * 查询车辆是否已办理粤通卡 广东
 */
export const querySignType = (data)=>  request.get("/api/yue/querySignType", data,true);

/**
 * 添加收货地址 广东
 */
export const addShippingInfoInGuangDong = (data) => request.post("/api/yue/addShippingInfo", data,true);

export const bindAccountGuangDong = (data) => request.post("/api/yue/bindAccount" , data , true);

export const openAccountGuangDong = (data) => http.post("/api/yue/openAccount" , data , true);

export const checkOrderGuangDong = (data) => request.get("/api/yue/checkOrder" , data , true);
 
 
 
 


