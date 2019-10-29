<template>
  <div class="page page-login">
    <div class="main">
      <div class="form-box">
        <div class="from-brick" v-if="mode==1">
          <div class="form-title">
            <div class="mb-login-title">手机号登录</div>
          </div>
          <div class="form-group">
            <div class="form-item">
              <div class="ui-icon icon-mb"></div>
              <div class="form-ipt">
                <input
                  type="tel"
                  placeholder="请输入您的手机号"
                  v-model="mobile"
                  @blur="onBlur"
                  @focus="onFocus"
                />
              </div>
            </div>
            <div class="form-item item-code">
              <div class="ui-icon icon-code"></div>
              <div class="form-ipt">
                <input
                  type="tel"
                  placeholder="请输入您的验证码"
                  v-model="validCode"
                  @blur="onBlur"
                  @focus="onFocus"
                />
              </div>
              <div class="form-code" :class="{disabled:sending}" @click="sendCode">{{codeTxt}}</div>
            </div>
          </div>
          <van-button
            type="primary"
            :loading="doing"
            class="btn-default"
            :disabled="btnDisabled"
            @click="login"
          >登 录</van-button>

          <!-- <div class="login-action one">
            <div class="act" @click="loginSwitch(2)">密码登录</div>
          </div> -->
        </div>

        <div class="from-brick" v-if="mode==2">
          <div class="form-title">
            <div class="pass-login-title">密码登录</div>
          </div>
          <div class="form-group">
            <div class="form-item">
              <div class="ui-icon icon-mb"></div>
              <div class="form-ipt">
                <input type="tel" placeholder="请输入您的手机号" v-model="mobile" />
              </div>
            </div>
            <div class="form-item item-code">
              <div class="ui-icon icon-code"></div>
              <div class="form-ipt">
                <input type="password" placeholder="请输入您的密码" v-model="password" maxlength="15" />
              </div>
            </div>
          </div>

          <van-button
            type="primary"
            :loading="doing"
            class="btn-default"
            :disabled="btnDisabled"
            @click="login"
          >登 录</van-button>

          <div class="login-action between">
            <div class="act" @click="loginSwitch(1)">免密登录</div>
            <div class="act" @click="go('/findPwdCheckMb')">忘记密码</div>
          </div>
        </div>

        <div class="from-brick" v-if="mode==3">
          <div class="form-title">
            <div class="wx-login-title">
              <div class="title-s">您的微信账号 {{nickName}} 通过验证</div>
              <div class="title-b">首次使用微信登录先绑定手机号</div>
            </div>
          </div>
          <div class="form-group">
            <div class="form-item">
              <div class="ui-icon icon-mb"></div>
              <div class="form-ipt">
                <input type="tel" placeholder="请输入您的手机号" v-model="mobile" />
              </div>
            </div>

            <div class="form-item item-code">
              <div class="ui-icon icon-code"></div>
              <div class="form-ipt">
                <input type="tel" placeholder="请输入您的验证码" v-model="validCode" />
              </div>
              <div class="form-code" :class="{disabled:sending}" @click="sendCode">{{codeTxt}}</div>
            </div>
          </div>

          <van-button
            type="primary"
            :loading="doing"
            class="btn-default"
            :disabled="btnDisabled"
            @click="login"
          >绑定手机号</van-button>
          <div class="login-action one">
            <div class="act" @click="loginSwitch(1)">免密登录</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" :class="{'focus':focus}">
      <div class="login-other" v-if="mode !=3">
        <div class="other-title">
          <div class="inner">其他登录方式</div>
        </div>
        <div class="other-content">
          <div class="item" @click="toWxLogin">
            <div class="ui-icon wx-icon"></div>
            <div class="tit">微信</div>
          </div>
          <!-- 
          <div class="item">
            <div class="ui-icon qq-icon"></div>
            <div class="tit">QQ</div>
          </div>

          <div class="item">
            <div class="ui-icon zfb-icon"></div>
            <div class="tit">支付宝</div>
          </div>

          <div class="item">
              <div class="ui-icon wb-icon"></div>
              <div class="tit">微博</div>
          </div>-->
        </div>
      </div>
      <!-- <div class="version">版本：{{appVersion}}</div> -->
    </div>
  </div>
</template>

<script>
import { Button } from "@/vant";
import {
  tip,
  checkMobile,
  showLoading,
  hideLoading,
  checkValidCode,
  isInWeiXin,
  delUrlParams
} from "@/utils";
import wxParam from "@/services/wechat/wechat-param";
import config from "@/config";
export default {
  name: "login",
  mounted: function() {},
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      codeTxt: "获取验证码",

      //是否正在请求中
      doing: false,

      //是否发送验证码中
      sending: false,

      //多少秒重新发送
      time: 60,

      //手机号
      mobile: "",

      //验证码
      validCode: "",

      //密码
      password: "",

      appVersion: config.appVersion,

      redirectUri: "",

      //登录模式 1 手机号登录 2密码登录 3微信登录
      mode: 1,

      //登录用户对象
      user: null,

      //昵称
      nickName: "",

      showPage: true,

      focus: false,

      isLogin: this.$store.state.isLogin
    };
  },

  watch: {},
  created(e) {
    let user = this.$store.state.user;
    let mode = this.$route.query.mode;
    let code = this.$route.query.code;
    if (this.$route.query.redirect_uri) {
      this.redirectUri = this.$route.query.redirect_uri;
    }

    if (code) {
      return this.checkWxLogin();
    }

    if (this.isLogin) {
      if (!this.$store.getters.isWxLogin && mode == 3) {
        this.toWxLogin();
      } else {
        this.goBack();
      }
    } else {
      if (isInWeiXin() && mode) {
        this.toWxLogin();
      }
    }
  },

  computed: {
    btnDisabled() {
      let disabled = true;
      let mode = this.mode;

      if (mode == 1 || mode == 3) {
        disabled = !(
          checkMobile(this.mobile) && checkValidCode(this.validCode)
        );
      } else if (mode == 2) {
        disabled = !(checkMobile(this.mobile) && this.password.length > 0);
      }

      return disabled;
    }
  },
  methods: {
    //切换登录方式
    loginSwitch(mode) {
      this.mode = mode;
    },

    //检查微信登录
    async checkWxLogin() {
      //判断当前浏览器环境
      let code = this.$route.query.code;

      if (code) {
        this.showPage = false;
        this.wxLogin(code);
      }
    },

    //微信登录
    async wxLogin(code) {
      let res, data;
      showLoading("登录中");
      res = await this.$api.login({ code });
      data = res && res.data;

      if (data && data.code == 200 && data.data) {
        hideLoading();
        data = data.data;
        data.code = code;

        if (data.token && data.mobile) {
          this.setLogin(data);
        } else {
          this.user = data;
          this.mode = 3;
          this.nickName = data.nickname;
          this.showPage = true;
        }
      } else {
        tip((data && data.message) || "微信登录失败");
        this.showPage = true;
      }
    },

    //微信登录
    toWxLogin() {
      let url = window.location.href;
      let redirect_uri = encodeURI(delUrlParams(url, ["code", "state"]));
      if (isInWeiXin()) {
        document.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxParam.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${wxParam.loginStyle}&state=${wxParam.param}#wechat_redirect`;
      } else {
        tip("请在微信客户端打开");
      }
    },

    //设置登录信息
    setLogin(user) {
      this.$store.commit("setUser", user);
      this.$store.commit("setToken", user.token);
      this.goBack();
    },

    goBack() {
      if (this.redirectUri) {
        this.$router.push({ path: this.redirectUri });
      } else {
        this.$router.push({ path: "/" });
      }
    },

    //获取焦点
    onFocus() {
      this.focus = true;
    },

    //失去焦点
    onBlur() {
      this.focus = false;
    },

    //发送验证码
    async sendCode() {
      let res, data, timer;

      if (this.sending) return;

      if (this.mobile == "") {
        tip("请输入手机号码");
        return;
      }

      if (!checkMobile(this.mobile)) {
        tip("手机号码格式不正确");
        return;
      }

      this.sending = true;

      let setCodeTxt = () => {
        this.time--;
        this.codeTxt =
          "重新发送" + (this.time > 0 ? "(" + this.time + "s)" : "");
        if (this.time == 0) {
          clearInterval(timer);
          this.sending = false;
          this.time = 60;
        }
      };

      timer = setInterval(() => {
        setCodeTxt();
      }, 1000);
      setCodeTxt();

      //发送验证码
      res = await this.$api.sendCode(this.mobile);
      data = res && res.data;

      if (data && data.code == 200) {
        if (data.data && /^\d{6}$/.test(data.data)) {
          this.validCode = data.data;
        } else {
          tip("验证码已发送");
        }
      } else {
        tip((data && data.message) || "验证码发送失败");
      }
    },

    //登录
    async login() {
      let res, data, datas;
      let mode = this.mode;

      if (this.doing) return;

      if (this.mobile == "") {
        tip("请输入您的手机号码");
        return;
      }

      if (!checkMobile(this.mobile)) {
        tip("您输入的手机号码不正确");
        return;
      }

      //手机号登录 和绑定手机号
      if (mode == 1 || mode == 3) {
        if (this.validCode == "") {
          tip("请输入您手机收到的验证码");
          return;
        }

        if (!checkValidCode(this.validCode)) {
          tip("您输入的验证码不正确");
          return;
        }
      }

      //密码登录
      else if (mode == 2) {
        if (this.password == "") {
          tip("请输入您的登录密码");
          return;
        }

        if (this.password.length < 6 || this.password.length > 15) {
          tip("您输入的登录密码格式不正确");
          return;
        }
      }

      this.doing = true;
      let unionId = this.$store.state.unionId;
      console.log(unionId);

      //绑定手机号
      if (this.mode == 3) {
        Object.assign(this.user, {
          mobile: this.mobile,
          validCode: this.validCode
        });

        datas = this.user;
        datas.unionId = unionId;

        showLoading("绑定中");
        res = await this.$api.bindMobile(datas);
      }

      //登录
      else {
        if (this.mode == 2) {
          datas = {
            mobile: this.mobile,
            loginPass: this.password
          };
        } else {
          datas = {
            mobile: this.mobile,
            validCode: this.validCode
          };
        }

        showLoading("登录中");

        if (unionId) {
          datas.unionId = unionId;
        }
        res = await this.$api.login(datas);
      }

      data = res && res.data;
      this.doing = false;

      if (data && data.code == 200 && data.data && data.data.token) {
        hideLoading();
        this.setLogin(data.data);
        this.$store.commit("setUnionId", null);
      } else {
        tip(
          (data && data.message) || (this.mode == 3 ? "绑定失败" : "登录失败")
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-login {
  .main {
    padding: 40px 85px;

    .login-action {
      padding: 0 20px;
      display: flex;
      text-align: center;
      margin-top: 60px;
      color: #8ba09e;
      font-size: 14px;

      &.one {
        .act {
          flex: 1;
        }
      }
      &.between {
        justify-content: space-between;
      }
    }

    .form-title {
      color: #1c110f;
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 42px;

      .title-s {
        color: #989898;
        margin-bottom: 24px;
        font-size: 30px;
      }

      .title-b {
        font-size: 34px;
      }
    }

    .btn-default {
      margin-top: 100px;
      border-radius: 50px;
    }

    .form-item {
      height: 60px;
      font-size: 30px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid #f3efef;
      height: 100px;
      margin-top: 50px;

      .form-ipt {
        flex: 1;

        input {
          font-size: 30px;
          width: 100%;
          border: none;
        }
      }

      .form-code {
        color: #eb5836;
        color: #35d4c7;
        min-width: 160px;
        text-align: right;

        &.disabled {
          color: #999;
        }
      }

      .icon-mb {
        background-image: url(../assets/images/icon-mb.png);
      }

      .icon-code {
        background-image: url(../assets/images/icon-code.png);
      }

      .ui-icon {
        width: 32px;
        height: 32px;
        margin-right: 20px;
      }
    }
  }
  .footer {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40px 85px;
    &.focus {
      position: static;
      bottom: 0;
    }
    .version {
      color: #c5ccd7;
      font-size: 15px;
      text-align: center;
    }

    .login-other {
      color: #6a7271;
      font-size: 14px;
      text-align: center;
      padding: 0 40px;

      .other-title {
        height: 40px;
        margin: 30px auto;
        text-align: center;
        position: relative;

        &:before {
          content: "";
          top: 20px;
          left: 0;
          right: 0;
          position: absolute;
          border-bottom: 1px solid #ccc;
        }

        .inner {
          background: #fff;
          padding: 0 40px;
          height: 40px;
          line-height: 40px;
          position: relative;
          z-index: 1;
          display: inline-block;
        }
      }
    }

    .other-content {
      text-align: center;

      .item {
        width: 84px;
        display: inline-block;
        margin-right: 30px;

        &:last-child {
          margin-right: 0;
        }

        .ui-icon {
          height: 84px;

          &.wx-icon {
            background-image: url(../assets/images/icon_weichat.png);
          }

          &.qq-icon {
            background-image: url(../assets/images/icon_QQ.png);
          }

          &.zfb-icon {
            background-image: url(../assets/images/icon_zhifubao_d.png);
          }
          &.wb-icon {
            background-image: url(../assets/images/icon_xinlang.png);
          }
        }

        .tit {
          padding: 15px 0 0;
          font-size: 0.9em;
          color: #6a7271;
        }
      }
    }
  }
}
</style>

