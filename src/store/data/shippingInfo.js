
import localStore from 'store'
let shippingInfo = localStore.get('shippingInfo') || {};


export const getShippingInfoDefaultVal = (obj = {})=>{
   return Object.assign({

    //记录id
    "id":"",

    //收货人姓名
    "shippingName": "",

    //收货人手机号
    "shippingMobile": "",

    //省份
    "shippingProvince": "",

    //城市
    "shippingCity": "",

    //收货人地区
    "shippingArea": "",

    //省市区的组合
    "shippingPCA":"",
    
    //收货人详细地址
    "shippingAddress": "",

    //车辆资料id
    "carInfoId": "",

    //车主资料id
    "applyId":""

    //短信验证码 废弃
    //"validCode": "",
}, obj)
}
shippingInfo = getShippingInfoDefaultVal(shippingInfo);

if(shippingInfo.shippingProvince && shippingInfo.shippingCity && shippingInfo.shippingArea){
  shippingInfo.shippingPCA = [shippingInfo.shippingProvince,shippingInfo.shippingCity,shippingInfo.shippingArea].join('/');
} 



export const  getShippingInfo = (obj)=>{

    let data = {};

    for(let d in shippingInfo){
      data[d] = shippingInfo[d];
      if(obj[d]!==undefined){
        data[d] = obj[d];
      }
    }

    if(data.shippingProvince && data.shippingCity && data.shippingArea){
      data.shippingPCA = [data.shippingProvince,data.shippingCity,data.shippingArea].join('/');
    }else{
      data.shippingPCA = ''
    }
 

    return data;
};

export {shippingInfo}

export default shippingInfo;

