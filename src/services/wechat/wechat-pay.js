import {instance as axios} from '../HttpRequest'

function wxPay(data,fun){
    console.log(data);
    let aUrl = window.location.href.split('#')[0];
    axios({
        url: `member/getSignature`,
        method: 'POST',
        data:{'url':aUrl}
    }).then((res) => {
        wx.config({
            debug: false,
            appId: res.data.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1
            jsApiList: ['chooseWXPay']//需要接口的列表项: 微信支付
        })
        //处理验证失败的信息
        wx.error(function (res) {
            console.log('验证失败返回的信息:', res);
        });
        //处理验证成功的信息
        wx.ready(function () {
            console.log('支付签名成功');
            console.log(data);
            wx.chooseWXPay({
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr,  // 支付签名随机串，不长于 32 位
                package: data.package,   // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    fun('success');
                },
                cancel:function(res){
                　　// 支付取消回调函数
                    fun('cancel');
                },
                fail:function(error){
                    console.log('错误支付信息:',error);
                }
            });
        })
    })
}

export default wxPay

