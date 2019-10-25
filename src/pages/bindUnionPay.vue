<template>
  <div class="page page-bindUnionPay">
    <headNav headBgColor="#5CA3D9" title="业务开通" path="/yunnan_bindBank"> </headNav>
    <div class="main">
      <div class="form-box">

        <div class="form-item item-bankNo">
          <div class="form-label">
            工商银行 <span class="tip">储蓄卡</span>
          </div>
          <div class="form-input">
            <input type="text" class="ipt" placeholder="银行卡卡号" v-model="bank.bankNo" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">
            密码
          </div>
          <div class="form-input">
            <input type="password" maxlength="6" class="ipt" placeholder="银行卡取款密码" v-model="bank.password" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">
            手机号
          </div>
          <div class="form-input">
            <input type="tel" maxlength="11" class="ipt" placeholder="银行预留手机号" v-model="bank.mobile" />
          </div>
        </div>

        <div class="form-item">
          <div class="form-label">
            验证码
          </div>
          <div class="form-input">
            <input type="tel" class="ipt" maxlength="6" placeholder="短信验证码" v-model="bank.code" />
          </div>
          <div class="get-code code" :class="{disabled:sending}" @click="sendCode">{{codeTxt}}</div>
        </div>
        <div class="form-item item-agreement">
          <van-checkbox v-model="bank.agree" value="1">接受</van-checkbox>

          <a href="javascript:;">&nbsp;&nbsp;银联用户协议</a>
        </div>
      </div>

      <div class="form-submit">

        <van-button type="primary" class="btn-default" :disabled="disabled" @click="submit">确认开通</van-button>

      </div>
    </div>
  </div>
  </div>
</template>
<script>

  import { RadioGroup, Radio, Button, Checkbox } from '@/vant';
  import { tip, checkName, checkMobile, checkIdCard, showLoading, hideLoading, checkValidCode, checkBankNo, setTimer, deepClone } from "@/utils"


  export default {
    name: "login",
    components: {
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox
    },
    watch: {
      imgUrl(v) {
        console.log(v);
      },

      imgUrl2(v) {
        console.log(v);
      }
    },

    data() {

      var bankInfo = this.$store.getx('bankInfo');
      return {
        bank: {
          bankNo: "",
          password: "",
          mobile: bankInfo.userPhone,
          code: "",
          agree: 0
        },
        disabled: true,

        codeTxt: "免费获取",

        //是否正在请求中
        doing: false,

        //是否发送验证码中
        sending: false,

        //提交中
        submiting: false,

        //多少秒重新发送
        time: 60,
      }
    },

    watch: {

      bank: {
        //特别注意，不能用箭头函数，箭头函数，this指向全局
        handler: function (v) {
          var disabled = false;
          for (let o in v) {
            if (!v[o]) {
              disabled = true;
              console.log(o);
            }
          }
          console.log(v);
          this.disabled = disabled;
        },
        deep: true
      },


    },

    methods: {

      async sendCode() {

        let res, data;
        let mobile = this.bank.mobile;

        if (this.sending) return;

        if (mobile == '') {
          tip("请输入手机号码");
          return;
        }

        if (!checkMobile(mobile)) {
          tip("手机号码格式不正确");
          return;
        }

        this.sending = true;

        let setCodeTxt = () => {
          this.time--;
          this.codeTxt = "重发" + (this.time > 0 ? "(" + this.time + "s)" : "");
          if (this.time == 0) {
            clearInterval(timer);
            this.sending = false;
            this.time = 60;
          }
        };

        let timer = setInterval(() => {
          setCodeTxt()
        }, 1000);

        setCodeTxt();

        //发送验证码
        res = await this.$api.sendCodeInApply(mobile);
        data = res && res.data;

        if (data && data.code == 200) {
          if (data.data && /^\d{6}$/.test(data.data)) {
            this.shippingInfo.validCode = data.data;
          } else {
            tip("验证码已发送");
          }
        } else {
          tip(data && data.message || '验证码发送失败');
        }
      },

      submit() {

        var bank = this.bank;

        if (bank.bankNo == '') {
          tip('请输入银行卡卡号');
          return;
        }

        if (!checkBankNo(bank.bankNo)) {
          tip("银行卡号格式不正确");
          return;
        }

        if (bank.password == '') {
          tip('请输入银行卡取款密码');
          return;
        }

        if (bank.mobile == '') {
          tip('请输入银行预留手机号');
          return;
        }

        if (!checkMobile(bank.mobile)) {
          tip("手机格式不正确");
          return;
        }

        if (bank.code == '') {
          tip('请输入短信验证码');
          return;
        }

        if (bank.agree != 1) {
          tip('请同意银联用户协议');
          return;
        }

        showLoading('提交中');
        setTimeout(() => {
          hideLoading();
          this.$router.push({
            path: "/bindUnionPayResult"
          });
        }, 300);

      }


    }
  }
</script>
<style lang="scss" scoped>
  .page-bindUnionPay {
    background: #F1F1F3;

    .ipt::placeholder {
      color: #bbb
    }

    .main {
      margin: 25px 0 0 0;
      border-top: 1PX solid #bbb;
      border-bottom: 1PX solid #bbb;
      background: #fff;
      padding: 0 0 0px 0;
    }

    .get-code {
      width: 200px;
      color: #5CA3D9;
      text-align: right;
      margin-right: 40px;
      &.disabled {
         color: #999;
       }
    }

    .form-box {
      padding: 0 0 0 40px;
    }


    .form-item {
      display: flex;
      border-bottom: 1PX solid #ccc;
      padding: 20px 0;

      &.item-bankNo {

        margin-left: -40px;
        padding-left: 40px;

        .form-label {
          width: 270px;
        }

        .tip {
          color: #777;
        }
      }

      &.item-agreement {
        border-bottom: none;

        a:link {
          color: #5CA3D9
        }
      }

      .form-label {
        width: 200px;
      }

      .form-input {
        flex: 1;
        display: flex;

        input {
          flex: 1;
          border: none;
          width: 100%;
        }
      }
    }

    .form-submit {
      padding: 20px 40px;

      .btn-default {
        background: #5CA3D9 !important;
        font-size: 32px !important;
        box-shadow: none !important;

        &.van-button--disabled {
          background: #b2b2b2 !important;
        }
      }

    }



  }
</style>