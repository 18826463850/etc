import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import localStore from 'store'

import {carInfo,applyInfo,shippingInfo,bankInfo} from './data/index';

Vue.use(Vuex);

let token = localStore.get('token') || '';
let unionId = localStore.get('unionId') || '';
let user = localStore.get('user') || null;
let userCache = localStore.get('user') || null;
let catId = localStore.get('catId') || "";
let wxData = localStore.get('wxData') || {};
let cardInfo  = localStore.get('cardInfo') || {};
let activeApplyItem = localStore.get('activeApplyItem') ;
let activeApplyId = localStore.get('activeApplyId') ;
let validCode = localStore.get('validCode');
let cardName = localStore.get('cardName');
let bankCardInfo = localStore.get('bankCardInfo') || null;

const state = {
  token,
  user,
  unionId,
  wxData:wxData,
  routes:null,
  isLogin: !!token,
  applyInfo,
  carInfo,
  cardInfo,
  shippingInfo,
  bankInfo,
  catId,
  activeApplyItem,
  activeApplyId,
  validCode,
  userCache,
  loginMode:'',
  cardName,
  bankCardInfo,
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

//扩展函数
Object.assign(store,{

  //快速获取缓存数据
  get(key) {
    return state[key];
  },

  //快速设置缓存数据
  set(key, data) {
    state[key] = data;
    return data;
  },

  //移除临时缓存
  remove(key) {
    if (state[key]) {
      delete state[key];
    }
    return true;
  },


  //获取本地缓存
  getx(key){
    let data = state[key];
    if (data === undefined) {
      data =  localStore.get(key);
      this.set(key,data);
    }
    return data;
  },

  //设置本地缓存
  setx(key,data){
    localStore.set(key,data);
      state[key] = data;
      return data;
  },

  //删除本地缓存
  removex(key){
    if(state[key]) {
      this.remove(key);
    }
    localStore.remove(key);
  }

})


export default store