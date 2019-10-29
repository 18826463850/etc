import localStore from 'store'

export const  routes =(state, data) => {
  state.routes = data;
};

export const setUnionId = (state, data) => {
  state.unionId = data;
  localStore.set('unionId',data);
}

export const setToken = (state, data) => {
   state.token = data;
   state.isLogin = !!data;
   localStore.set('token',data);
}

export const setUser =(state, data) => {

  if(data == null){
    state.user = null;
    localStore.set('user',null);
    return;
  }

  let user = state.user || {};
  Object.assign(user,data);
  console.log('user',user,'user')
  state.user = user;
  localStore.set('user',user);
}

export const setApplyInfo =(state, data ={}) => {
  let applyInfo = state.applyInfo;
  Object.assign(state.applyInfo,data);
  state.applyInfo = applyInfo;
  localStore.set('applyInfo',applyInfo);
}

export const setBankInfo =(state, data = {}) => {
  let bankInfo = state.bankInfo;
  Object.assign(bankInfo,data);
  state.bankInfo = bankInfo;
  localStore.set('bankInfo',bankInfo);
}

export const setCarInfo =(state, data = {}) => {
  let carInfo = state.carInfo;
  Object.assign(carInfo,data);
  state.carInfo = carInfo;
  localStore.set('carInfo',carInfo);
}

export const setShippingInfo =(state, data = {}) => {
  let shippingInfo = state.shippingInfo;
  Object.assign(shippingInfo ,data);
  state.shippingInfo = shippingInfo;
  localStore.set('shippingInfo',shippingInfo);
}


export const setCardInfo =(state, data = {}) => {
  let cardInfo = state.cardInfo;
  Object.assign(cardInfo ,data);
  state.cardInfo = cardInfo;
  localStore.set('cardInfo',cardInfo);
}


export const setWxData = (state,data) => {
  let wxData = state.wxData;
  Object.assign(wxData,data);
  state.wxData = wxData;
  localStore.set('wxData',wxData);
}

export const setActiveApplyItem = (state,data)=>{
  state.activeApplyItem = data;
  localStore.set('activeApplyItem',data);
}