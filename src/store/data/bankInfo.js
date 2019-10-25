


import localStore from 'store'
let  bankInfo = localStore.get('bankInfo') || {};

export const  getBankInfoDefaultVal = (obj = {})=>{

  return Object.assign({

    //记录id （非必填字段）
    "id":"",

    //银行预留手机号
    "bankMobile": "",

    //银行卡号
    "bankNo": "",

    //银行用户姓名
    "userName": "",

    //银行账号
    "idCard": "",

    //绑定银行卡回调id （非必填字段）
    "requestId":"",

    //是否已经绑定成功 0 代表成功  1 代表失败 （非必填字段）
    "status":1,

    //申请人id
    "applyUserId":"",

    //申请人id
    "applyId":"",

    //银行预留手机号
    "userPhone":"",

     //银行签约id
    "bankId":""


  }, obj);
}

 bankInfo = getBankInfoDefaultVal(bankInfo);


export const getBankInfo = (obj) => {
  let data = {};
  for (let d in bankInfo) {
    data[d] = bankInfo[d];
    if (obj[d] !== undefined) {
      data[d] = obj[d];
    }
  }
  return data;
};

export { bankInfo}

export default bankInfo;

