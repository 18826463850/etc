import http from './http'    // 赤兔易行接口请求
import request from './request'   // 易行易停接口请求

export * from './applyApi/yunnanApi'
 
export * from './applyApi/guangdongApi'


/**
 * 
 * 图像识别接口
 */
export {ocrIdcard,ocrVehicle,imgDriverLicense,imgIdCard } from './imgApi'

/**
 * 
 * 快递查询接口
 */
export { expressInfo } from './expressApi'

/**
 * 获取etc卡列表
 */
export const getEtcCardList = (data)=>  http.post("/api/etcCardCat/list", data,true);


/**
 * 获取单条etc卡记录
 */
export const getEtcCard = (data) => http.get(`/api/etcCardCat/details/${data.id}`, {});


/**
 * 登录
 */
export const login = (data)=>  request.post("/api/sso/login", data);

/**
 * 登录
 */
export const getPublicProfile = (data)=>  http.get("/api/sso/getPublicProfile", data);


/**
 * 退出登录
 */
export const outLogin = (data)=>  request.post("/api/sso/outlogin", data);


/**
 * 发送验证码
 */
export const sendCode = (data)=>  request.get("/api/sso/sendCode/"+data);


/**
 * 发送收货地址验证码
 */
export const sendCodeInApply = (data)=>  http.get("/api/applyInfo/sendCode/"+data);


/**
 * 保存车辆图片信息
 */
export const carInstallInfo = (data)=>  http.post("/api/carInstallInfo/save", data,true);

/**
 * 保存银行卡信息
 */
export const saveBankInfo = (data)=>  http.post("/api/bankInfo/saveBankInfo", data,true);


/**
 * 保存申请人所有信息
 */
export const saveApplyInfo = (data)=>  http.post("/api/applyInfo/saveApplyInfo", data,true);


/**
 * 查询申请记录
 */
export const selectApplyRecord = (data)=>  request.post("/api/applyInfo/selectApplyRecord", data,true );


/**
 * 验证用户登录是否过期
 */
export const validToken = (data) => http.post("/api/sso/validToken", data);


/**
 * 微信预支付    example {applyId:111,code:''}
 */
export const prePay = (data) => request.post("/wx/wechatpay/unifiedorder", data,true);


/**
 * 查询银行绑定是否成功
 */
export const queryBindCardStatus = (data) => http.get("/api/bankInfo/queryBindCardStatus", data);


/**
 * 添加收货地址
 */
export const addShippingInfo = (data) => http.post("/api/applyInfo/addShippingInfo", data,true);


/**
 * 获取申请记录
 */
export const getApplyInfo = (data) => http.get(`/api/applyInfo/getApplyInfo/${data.applyId}`, {});

 
/**
 * 退还押金
 */
export const wxRefund = (data) => http.get(`/api/etcWechatpay/wxRefund/${data.applyId}`, {});

/**
 * 微信分享
 */
export const wxShare = (data) => http.get(`/api/etcWechatShare/wechatShare`, data);

/**
 * 微信分享
 */
export const wxShare2 = (data) => http.get(`/api/etcWechatShare/getSignature`, data);


/**
 * 获取etc卡详情
 */
export const getEtcCardCat  = (id) => http.get(`/api/etcCardCat/details/${id}`, {});


/**
 * 添加问题咨询
 */
export const addEtcConsult = (data) => http.post(`/api/etcConsult/insert`,data,true);

/**
 * 获取问题咨询列表
 */
export const getConsult = (data) => http.post(`/api/etcConsult/getConsult`,data,true);


/**
 * 获取常见问题列表
 */
export const getFaq = (data) => http.post(`api/etcConsult/getFaq`, data,true);


 
/**
 * 获取了解更多问题列表
 */
export const getMoreQuestions = (data) => http.post(`api/etcConsult/getMoreQuestions`, data,true);



/**
 * 修改密码 根据手机号 验证码来修改
 */
export const modifyPass= (data) => http.post(`/api/etcUser/modifyPass`, data);


 
/**
 * 修改密码 根据手机号和旧密码来修改
 */
export const modifyPassByOldPass = (data) => http.post(`/api/etcUser/updatePass`, data);


/**
 * 重设密码
 * @param {object}  
 */
export const resetPass = (data) => http.post('/api/etcUser/forgetPass',data)


/**
 * 绑定手机号
 */
export const bindMobile = (data) => request.post(`/api/etcUser/bindMobile`, data,true);

/**
 * 修改用户信息
 */
export const updateUserInfo = (data) => http.post(`/api/etcUser/update`, data,true);

/**
 * 获取用户信息
 */
export const getUserInfo = (data) => http.get(`/api/etcUser/getUserInfo`, data,true);

/**
 * 获取交通银行信用卡网络发卡请求参数
 */
export const apicardparam = (data) => request.get(`/etc/ecard/apicardparam`, data);

/**
 * 登记信息，确认办理信用卡的姓名和身份证
 */
export const checkin = (data) => request.post(`/etc/ecard/checkin`, data,true);

/**
 * 获取当前用户是否登记过该信用卡的信息，如果有则直接返回登记的信息
 */
export const checkcreditcard = (data) => request.get(`/etc/ecard/checkcreditcard`, data);

/**
 * 获取该用户信用卡登记信息
 */
export const getcheckinfo = (data) => request.get(`/etc/ecard/getcheckinfo`, data);

/**
 * 跳转至信用卡信息填写页面
 */
export const submitinfo = (data) => request.get(`/etc/ecard/submitinfo`, data,true);


 





  







 


 


