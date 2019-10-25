import localStore from 'store'
let applyInfo = localStore.get('applyInfo') || {};


export const  getApplyInfoDefaultVal = (obj = {})=>{
 return Object.assign({
    
    "id":"",

    //申请人姓名
    "applyInfoName": "",

    //申请人证件号
    "idCard": "",
    
    //身份证号
    "idCardNo":"",

    //身份证正面
    "idCardRightImg": "" ,

    //身份证方面
    "idCardWrongImg":  "",

    //证件类型
    "idType": "",

    //证件名称
    "idTypeName": "",

    //证件索引
    "idTypeIndex": "",

    //手机号
    "mobile": "",

    //住址
    "address":"",

    // 云南申请id 
    "obuId":"",

    //身份证有效日期
    "idEffDate":"",

    //身份证失效日期
    "idExpDate":""

  },obj);
};

applyInfo =  getApplyInfoDefaultVal(applyInfo);

  applyInfo.idCardNo = applyInfo.idCard;

  if(applyInfo.idCardRightImg && applyInfo.idCardRightImg.indexOf('http')==-1){
    applyInfo.idCardRightImg ='';
  }
  
  if(applyInfo.idCardWrongImg && applyInfo.idCardWrongImg.indexOf('http')==-1){
    applyInfo.idCardWrongImg ='';
  }

export const getApplyInfo = (obj) => {
  let data = {};
  for (let d in applyInfo) {
    data[d] = applyInfo[d];
    if (obj[d] !== undefined) {
      data[d] = obj[d];
    }
  }
  return data;
};

//applyInfo.obuId = ''

export { applyInfo};
  
export default applyInfo;