<template>
  <div class="page page-passwordset">
    
    <div class="main">
      <div class="form-box">
        <div class="form-title">
          忘记密码
        </div>
        <div class="form-group">
          <div class="form-item">
            <div class="item-tit">
              手机号
            </div>
            <div class="form-ipt">
              <input type="tel" placeholder="请输入您的手机号" v-model="mobile" />
            </div>
          </div>
          <div class="form-item item-code">
            <div class="item-tit">
              验证码
            </div>
            <div class="form-ipt">
              <input type="tel" placeholder="请输入您的验证码" v-model="validCode" />
            </div>
            <div class="form-code" :class="{disabled:sending}" @click="sendCode">
              {{codeTxt}}
            </div>
          </div>
        </div>
        <van-button type="primary" :loading="doing" class="btn-default" :disabled="btnDisabled" @click="submit">下一步
        </van-button>


      </div>
    </div>
  </div>
</template>

<script>

  import { Button } from '@/vant';
  import { tip, checkMobile, showLoading, hideLoading, checkValidCode } from "@/utils"
  import config from "@/config"


  export default {
    name: "passwordset",
    mounted: function () { },
    components: {
      [Button.name]: Button,
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

        mobileTxt: "",

        //验证码
        validCode: "",


      };
    },

    watch: {



    },
    created() {

      let user = this.$store.state.user;

      console.log(user);

      if (user && user.mobile) {
        this.mobile = user.mobile;
        this.mobileTxt = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }

    },
    computed: {

      btnDisabled() {
        return !(this.mobile.length == 11 && this.validCode.length == 6)
      }

    },
    methods: {

      //发送验证码
      async sendCode() {


        let res, data, timer;

        if (this.sending) return;

        if (this.mobile == '') {
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
          this.codeTxt = "重新发送" + (this.time > 0 ? "(" + this.time + "s)" : "");

          if (this.time == 0) {
            clearInterval(timer);
            this.sending = false;
            this.time = 60;
          }

        };

        timer = setInterval(() => {
          setCodeTxt()
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
          tip(data && data.message || '验证码发送失败');
        }

      },

      //设置登录信息
      setLogin(user) {
        this.$store.commit('setUser', user);
        this.$store.commit('setToken', user.token);
      },


      //登录
      async submit() {


        let res,data;

        if (this.doing) return;

        if (this.mobile == '') {
          tip("请输入您的手机号码");
          return;
        }

        if (!checkMobile(this.mobile)) {
          tip("您输入的手机号码不正确");
          return;
        }

        if (this.validCode == '') {
          tip("请输入您手机收到的验证码");
          return;
        }

        if (!checkValidCode(this.validCode)) {
          tip("您输入的验证码不正确");
          return;
        }

        this.doing = true;

        showLoading('请稍等');




        res  = await this.$api.login({
          mobile:this.mobile,
          validCode:this.validCode
        });

        data  = res && res.data;


        hideLoading();

        if(data && data.code == 200){
           data.data.mobile = this.mobile;
           this.setLogin(data.data);
           this.go('/findPwdResetPwd');

        }else{
            tip(data && data.message || '操作失败');
        }

        this.go("/findPwdResetPwd");


      }
    }
  };
</script>
<style lang="scss" scoped>
  .page-passwordset {

    .main {
      padding: 40px 85px;
    }

    .form-title {
      color: #1C110F;
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 42px;
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
      border-bottom: 1PX solid #F3EFEF;
      height: 140px;
      padding: 20px 0;

      .item-tit {
        color: #6A7271;
        width: 150px;
        padding-right: 30px;
        display: flex;
        justify-content: space-between;

        i {
          font-style: normal;
        }
      }

      .form-ipt {
        flex: 1;

        input {
          font-size: 30px;
          width: 100%;
          border: none;
        }
      }

      .form-code {
        color: #EB5836;
        color: #35D4C7;
        min-width: 160px;
        text-align: right;

        &.disabled {
          color: #999
        }
      }

      .ui-icon {
        width: 32px;
        height: 32px;
        margin-right: 20px;
      }
    }
  }
</style>