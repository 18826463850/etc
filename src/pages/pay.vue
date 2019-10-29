<template>
  <div class="page page-pay">
    <headNav></headNav>
    <div class="main">
      <div class="content">
        <div class="steps-box">
          <applySteps finishs="1,2,3,4" selected="5"></applySteps>
        </div>

        <div class="goods-box">
          <div class="goods">
            <div class="img">
              <img src="../assets/images/goods-etc.jpg" />
            </div>
            <div class="tit">OBU设备</div>
          </div>
          <div class="price">¥ {{price}}</div>
        </div>
        <div class="goods-tip">需支付{{price}}元作为设备押金，在ETC激活正常使用后或审核不通过后退还押金。</div>
      </div>
      <div class="footer">
        <div class="total-box">
          应付 ：
          <span class="money">¥ {{price}}</span>
        </div>
        <div class="btn-box">
          <van-button type="primary" class="btn-submit" square @click="prePay">支付</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import keyboard from "@/components/keyboard/index";
import { RadioGroup, Radio, Button } from "@/vant";
import applySteps from "@/components/applySteps";
import axios from "axios";
import wxParam from "@/services/wechat/wechat-param";
import { isInWeiXin, getParam, tip, showLoading, hideLoading } from "@/utils";
import config from "@/config";
import wx from "weixin-js-sdk";
export default {
  name: "keyboardDemo",
  mounted: function() {},
  components: {
    [Button.name]: Button,
    keyboard,
    applySteps
  },
  data() {
    return {
      price: 0,
      applyId: "",
    };
  },

  watch: {},
  created() {
    let applyId = this.$route.query.applyId;

    if (applyId) {
      this.applyId = applyId;
    } else {
      this.setLocalData();
    }

    this.checkWxLogin();
  },
  destroyed() {},
  methods: {
    //设置本地数据
    setLocalData() {
      let cardInfo = this.$store.getx("cardInfo");
      let applyInfo = this.$store.getx("applyInfo");

      if (cardInfo && cardInfo.deposit !== undefined) {
        this.setPrice(cardInfo.deposit);
      }

      if (applyInfo && applyInfo.id) {
        this.applyId = applyInfo.id;
      }
    },

    //设置 price属性
    setPrice(v) {
      this.price = (v / 100).toFixed(2);
    },

    //检查微信登录
    checkWxLogin() {
      //判断当前浏览器环境
      let code = this.$route.query.code;
      let state = this.$route.query.state;
      console.log("appId:" + config.appId);
      console.log("code:" + code);
      if (state && state != "STATE") {
        this.applyId = state;
      }
      if (code) {
        this.$store.commit("setWxData", { code });
        this.loadData();
      } else {
        this.wxLogin();
      }

      if (!isInWeiXin()) {
        this.loadData();
      }
    },

    //微信登录
    wxLogin() {
      let url = window.location.href;
      let pathname = window.location.pathname;
      let redirect_uri = encodeURI(url);

      if (this.applyId) {
        wxParam.param = this.applyId;
      }

      if (isInWeiXin()) {
        document.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxParam.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${wxParam.loginStyle}&state=${wxParam.param}#wechat_redirect`;
      } else {
        tip("请在微信客户端打开");
      }
    },

    //加载数据
    async loadData() {
      let res, data;
      let applyId = this.$route.query.applyId || this.applyId;
      if (!applyId) return;

      console.log("applyId:" + applyId);
      showLoading("加载中");

      res = await this.$api.getApplyInfo({
        applyId: applyId
      });

      data = res && res.data;

      if (data && data.code == 200 && data.data) {
        data = data.data;
        this.$store.dispatch("clearApplyInfo");

        if (data.EtcApplyInfo) {
          this.getEtcCard(data.EtcApplyInfo.cardCatId);
        } else {
          hideLoading();
        }
      } else {
        hideLoading();
      }
    },

    //获取卡信息
    async getEtcCard(id) {
      let res = await this.$api.getEtcCard({ id });
      if (res && res.data && res.data.code == 200 && res.data.data) {
        this.setPrice(res.data.data.deposit);
      }
      hideLoading();
    },

    //预支付
    async prePay() {
      let res, data;
      let wxData = this.$store.getx("wxData");
      let user = this.$store.getx('user');  // 用户信息

      if (!wxData.code) {
        return this.wxLogin();
      }

      if (!this.applyId) {
        tip("请先填写车辆信息");
        return false;
      }

      showLoading("请稍等");

        res = await this.$api.prePay({
            order_id: this.applyId,
            loginUserId: user.id
        });

      data = res && res.data;

      hideLoading();

      if (data && data.errcode == 200) {
        this.wxPayx(data.data);
      }
    },

    /* 微信支付 V3版本
        appId: "wx5398aad200d1669b"
        nonceStr: "BNBB8q5MOaDhv8VC"
        package: "prepay_id=null"
        paySign: "FFE850F048AFB21B40AA68F3911EBD9A"
        signType: "MD5"
        timeStamp: 1564540352
    */
    //调起微信支付
    wxPay(data) {
      wx.config({
        debug: true,
        appId: data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: ["chooseWXPay"] //需要接口的列表项: 微信支付
      });

      //处理验证失败的信息
      wx.error(function(res) {
        console.log("验证失败返回的信息:", res);
      });

      //处理验证成功的信息
      wx.ready(function() {
        console.log("支付签名成功");
        console.log(data);
        wx.chooseWXPay({
          timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
          package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: data.paySign, // 支付签名
          success: function(res) {
            // 支付成功后的回调函数
            // fun('success');
            console.log(res);
          },
          cancel: function(res) {
            // 支付取消回调函数
            // fun('cancel');
          },
          fail: function(error) {
            console.log("错误支付信息:", error);
          }
        });
      });
    },

    /*
     *微信支付 V2版本
     */
    wxPayx(data) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp + "", // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: data.signType, // 微信签名方式：
          paySign: data.paySign // 微信签名
        },
        function(res) {
          //console.log(res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$store.dispatch("clearApplyInfo");
            // that.go("/submitsuccess");
            that.go("/bindBank");
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            tip("您已取消支付");
          } else {
            tip("支付失败");
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
.page-pay {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  .main {
    display: flex;
    flex-direction: column;
    font-size: 32px;
    flex: 1;
  }

  .content {
    flex: 1;
    box-sizing: border-box;

    .steps-box {
      padding: 36px;
      margin-bottom: 20px;
      background: #fff;
    }

    .goods-box {
      display: flex;
      height: 240px;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-bottom: 20px;

      .goods {
        display: flex;
        align-items: center;

        .img {
          width: 240px;
          height: 240px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .price {
        color: red;
        font-size: 40px;
        padding-right: 36px;
      }
    }

    .goods-tip {
      padding: 36px;
      background: #fff;
    }
  }

  .footer {
    display: flex;
    height: 100px;
    line-height: 100px;
    background: #fff;

    .total-box {
      flex: 1;
      font-size: 40px;
      padding: 0 0 0 36px;
      color: #333;

      .money {
        color: red;
      }
    }

    .btn-box {
      width: 300px;

      .btn-submit {
        width: 100%;
        height: 100%;
        font-size: 32px;
      }
    }
  }
}
</style>