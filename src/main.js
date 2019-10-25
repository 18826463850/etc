import "./utils/rem"
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import mixin from '@/core/mixin'
import * as api from '@/services/api'
import VConsole from 'vconsole'
import headNav from '@/components/headNav'
import uploadImg from '@/components/uploadImg'
import config from '@/config'
// import wxShare from '@/services/wechat/wechat-share'
// import {isInWeiXin} from '@/utils'

Vue.prototype.$api = api;
Vue.config.productionTip = false;

Vue.mixin(mixin);
Vue.component(headNav.name,headNav);
Vue.component(uploadImg.name,uploadImg );

if (config.env != 1) {
    new VConsole();
}
 

const vue = new Vue({
    router:router,
    store:store,
    render: h => h(App),

    created:function(){

    },
    mounted:function(){

    }

}).$mount("#app");


