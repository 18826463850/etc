import http from '@/services/http'


/**
 * 保存申请信息 广东
 */
export const saveApplyInfoInGuangDong = (data)=>  http.post("/api/yue/saveApplyInfo", data,true);


/**
 * 查询车辆是否已办理粤通卡 广东
 */
export const queryIssue = (data)=>  http.get("/api/yue/queryIssue", data,true);

 
/**
 * 查询车辆是否已办理粤通卡 广东
 */
export const querySignType = (data)=>  http.get("/api/yue/querySignType", data,true);

/**
 * 添加收货地址 广东
 */
export const addShippingInfoInGuangDong = (data) => http.post("/api/yue/addShippingInfo", data,true);

export const bindAccountGuangDong = (data) => http.post("/api/yue/bindAccount" , data , true);

export const openAccountGuangDong = (data) => http.post("/api/yue/openAccount" , data , true);

export const checkOrderGuangDong = (data) => http.get("/api/yue/checkOrder" , data , true);
 
 
 
 


