
import store from 'store';
import testConfig from './test'
import devConfig from './dev'
import prodConfig from './prod'

/**
 * 运行环境 
 * 0 测试环境
 * 1 正式环境
 * 2 SIT环境 
 */
let env = 1;

//缓存中的环境 设置为 "" 可清除缓存
let envs = "";//store.get('env');
let baseUrl = "";
let webUrl = ""

//testHost = "http://9zwk85.natappfree.cc";

 
//配置
let config = {

    //请求网址
    baseUrl,

    //前端网址
    webUrl,

    //默认版本号
    appVersion:"1.0.2",

    
    webTitle:"易行易停",

    //微信公众号appid wx5398aad200d1669b wx1c2c5188fd27b150
    appId:"wx86dc02afc38155b2",
 
    //设置环境
    setEnv (env){

        this.env = env;

        console.log(this.env);

        if (env == 0) {
            Object.assign(this,testConfig);
        }
        else if (env == 1) {
            Object.assign(this,prodConfig);

        } else if (env == 2) {
            Object.assign(this,devConfig);
        }

        store.set('env', env);
    },

  
    //请求头部
    requestHeader: {
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
    }


};



//读取缓存配置
if(envs !='' && envs !=null ){
    env = envs;
}

//读取webpack配置
//测试环境
if (process.env.NODE_ENV == 'testing') {
    env = 0;
}

else if (process.env.NODE_ENV == 'production') {
    env = 1;
}

//开发环境
else if (process.env.NODE_ENV == 'development') {
    env = 2;
}

console.log(process.env.NODE_ENV);

//切换设置的环境
config.setEnv(env);


export default config;




