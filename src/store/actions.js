import localStore from 'store'

import {getApplyInfoDefaultVal,getBankInfoDefaultVal,getCarInfoDefaultVal,getShippingInfoDefaultVal} from './data/index'

/**
 * 清除token 
 * @param {*} param0 
 */
export const outLogin = ({ commit }) => {
    commit('setToken',null);
    commit('setUser',null);
}


/**
 * 清除申请信息
 */
export const clearApplyInfo = function(){
     this.setx('applyInfo', getApplyInfoDefaultVal());
     this.setx('carInfo',getCarInfoDefaultVal());
     this.setx('shippingInfo',getShippingInfoDefaultVal());
     this.setx('bankInfo',getBankInfoDefaultVal());
}


/**
 * 缓存申请数据
 */
export const cacheApplyData = function(){

}


/**
 * 清除token 
 * @param {*} param0 
 */
export const clearActiveApplyItem = ({ commit,state }) => {
    
    if(state.activeApplyItem){
        commit('setActiveApplyItem',null);
    }

}

 