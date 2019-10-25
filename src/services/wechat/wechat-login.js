import {wxLogin} from '../../server/mineServer';

function checkLogin(wx) {
    return new Promise((resolve,reject)=>{
        let code =''
        if (true) {
            let url = window.location.href;
            if (url.indexOf('code') >= 0) {
                var a = url.split("?")[1];
                var b = a.split('&')[0];
               code = b.split('=')[1];
            } else {
                code = '';
            }
            if (code) {
                //授权登录
                wxLogin({
                    code:code
                }).then(res=>{
                  if(res.data.code==200){
                    console.log(res.data,"code换回的token");
                    window.localStorage.setItem('userMsg',JSON.stringify(res.data.data));
                    window.localStorage.setItem('token',res.data.data.token);
                    resolve();
                  }else{
                    let thePath = window.location.hash;
                    thePath = thePath.split("/")[1];
                    let url = wx.redirectUrl + (thePath?thePath:'home');
                    // document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxData.appId}&redirect_uri=${url}&response_type=code&scope=${wxData.loginStyle}&state=${wxData.param}#wechat_redirect`;
                    document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}#wechat_redirect`;
                  }
                })
            } else {
              let thePath = window.location.hash;
              thePath = thePath.split("/")[1];
              let url = wx.redirectUrl + (thePath?thePath:'home');
             // document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxData.appId}&redirect_uri=${url}&response_type=code&scope=${wxData.loginStyle}&state=${wxData.param}#wechat_redirect`;
              document.location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appId}&redirect_uri=${url}&response_type=code&scope=${wx.loginStyle}&state=${wx.param}#wechat_redirect`;
            }
        }

    })
}

export default checkLogin
