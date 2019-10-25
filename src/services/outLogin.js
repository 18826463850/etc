
import store from '@/store/index'
import router from '@/router'
import {hideLoading} from '@/utils'

/**
 * 退出登录
 */
const outLogin = () => {

    let redirectUri = "";
    let loginMode = store.get('loginMode');
    let thisUrl = window.location.href.replace(new RegExp("^"+window.location.origin,'g'),'');

    if (thisUrl && thisUrl.indexOf("/member") == -1) {
        redirectUri = '?redirect_uri=' + thisUrl;
        if(loginMode){
            redirectUri += '&mode='+loginMode;
            store.set('loginMode','')
       }
    }

 
    
    hideLoading();

    //清除登录信息
    store.dispatch('outLogin');
    router.replace({ path: '/login' + redirectUri });
};



export default outLogin;