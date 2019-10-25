//const appId = 'wxabbff7161e20da01';

import config from '@/config'

const appId = config.appId;

//返回路径
const redirectUrl =  config.webUrl;


//snsapi_base 静默授权  snsapi_userinfo 用户手动授权
const loginStyle = 'snsapi_userinfo';

//携带参数，默认不变
let param = 'STATE';

//分享链接
let link =  config.webUrl;

//项目的回调的项目所在路径
let fileName = '';

//分享的标题
let title = config.webTitle;

//分享的描述
let desc = '免费申请etc';

//分享的图片
let imgUrl = config.webUrl +"/images/wxhare.jpg";



export default {
    appId,
    link,
    redirectUrl,
    loginStyle,
    param,
    fileName,
    title,
    desc,
    imgUrl
}
