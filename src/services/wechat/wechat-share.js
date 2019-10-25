 
 import wx from 'weixin-js-sdk'
 import wxData from './wechat-param'
 import {wxShare,wxShare2} from '@/services/api'
 let imgUrl  = require("../../assets/images/wxshare.jpg") ;


export default async function (){

    let res, data;
    let shareUrl = window.location.href.split('#')[0];
    //shareUrl ='http://wechat.sit.etc-cloud.com/share.html';
    res = await wxShare({
      shareUrl: shareUrl 
    }) 

    data = res && res.data && res.data.data;

    if(!data || res.data.code !=200) return;
  
    imgUrl =  wxData.link + imgUrl;

    console.log('分享配置');
    console.log(data);
    console.log({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr || data.noncestr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr || data.noncestr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    })

    //处理验证失败的信息
    wx.error(function (res) {
      console.log('验证失败返回的信息:', res);
    });

    console.log({
      // 分享标题
      title: wxData.title, 

      // 分享描述
      desc: wxData.desc, 

      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link: wxData.link, 

      // 分享图标
      imgUrl:  imgUrl, 

      success() {
        console.log('分享结果');
      },
      error() {
      }
    });

    //需在用户可能点击分享按钮前就先调用
    wx.ready(function () {   

      console.log({
        // 分享标题
        title: wxData.title, 

        // 分享描述
        desc: wxData.desc, 

        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        link: wxData.link, 

        // 分享图标
        imgUrl:  imgUrl, 

        success() {
          console.log('分享结果');
        },
        error() {
        }
      });
      wx.onMenuShareTimeline({
        // 分享标题
        title: wxData.title, 

        // 分享描述
        desc: wxData.desc, 

        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        link: wxData.link, 

        // 分享图标
        imgUrl:  imgUrl, 

        success() {
          console.log('分享结果');
        },
        error() {
        }
      });

      wx.onMenuShareAppMessage({
        title: wxData.title, // 分享标题
        desc: wxData.desc, // 分享描述
        link: wxData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:  imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          console.log('分享结果');
        },
        error() {

        }
      });


    });


 
}

 
