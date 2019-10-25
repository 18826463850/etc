<template>
  <div class="page page-mobilecheck">
      <headNav > </headNav>
    <div class="main">
      <div class="form-box">
        <div class="form-title">
          为了绑定账户安全，需要验证已绑定手机号
        </div>
        <div class="form-group">
          <div class="form-item">
            <div class="item-tit">
               手机号
            </div>
            <div class="form-ipt">
                {{mobileTxt}}
            </div>
          </div>
          <div class="form-item item-code">
              <div class="item-tit">
                 验证码
               </div>
              <div class="form-ipt">
                  <input type="tel" placeholder="请输入您的验证码" v-model="validCode"/>
              </div>
              <div class="form-code" :class="{disabled:sending}" @click="sendCode">
                   {{codeTxt}}
              </div>
            </div>
        </div>
        <van-button type="primary" :loading="doing" class="btn-default"  :disabled="btnDisabled"  @click="submit"  >提 交</van-button>

      
      </div>
    </div>
  </div>
</template>

<script>

import { Button} from '@/vant';
import {tip,checkMobile,showLoading,hideLoading,checkValidCode} from "@/utils"
import config from "@/config"


export default {
    name: "passwordset",
    mounted: function() {},
    components: {
      [Button.name]:Button,
    },
    data() {



        return {
            codeTxt:"获取验证码",

            //是否正在请求中
            doing:false,
            
            //是否发送验证码中
            sending:false,

            //多少秒重新发送
            time:60,

            //手机号
            mobile:"",

            mobileTxt:"",

            //验证码
            validCode:"",


        };
    },

    watch:{

 

    },
    created() {
   
      let user  = this.$store.state.user 

      if( user && user.mobile){
        this.mobile = user.mobile;
        this.mobileTxt =  this.mobile.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
      } 
       


    },
    computed:{

      btnDisabled(){
            return  !(this.mobile.length == 11 && this.validCode.length == 6)
      }

    },
    methods: {
 
         //发送验证码
         async sendCode(){
          

          if(this.sending) return;
 
          if(this.mobile == ''){
            tip("请输入手机号码");
            return;
          }
 
          if(!checkMobile(this.mobile)){
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
 
           let timer = setInterval(() => {
             setCodeTxt()
           }, 1000);
           setCodeTxt();
 
           //发送验证码
           let {data}  = await this.$api.sendCode(this.mobile);
 
           if (data && data.code == 200) {
             
             if(data.data && /^\d{6}$/.test(data.data)){
                this.validCode = data.data;
             }else{
               tip("验证码已发送");
             }
    
         
           }else{
             tip(data.message || '验证码发送失败');
           }  
       },
 
      //登录
      async submit(){


        if(this.doing) return;

         if(this.mobile == ''){
           tip("请输入您的手机号码");
           return;
         }

         if(!checkMobile(this.mobile)){
          tip("您输入的手机号码不正确");
          return;
         }

         if(this.validCode==''){
           tip("请输入您手机收到的验证码");
           return;
         }

         if(!checkValidCode(this.validCode)){
           tip("您输入的验证码不正确");
           return;
         }

         this.doing = true;

         this.$store.setx('validCode',this.validCode);

         this.go("/setPass");
         
        
      }
    }
};
</script>
<style lang="scss" scoped>

.page-mobilecheck{
    .main {
        padding:0 40px;
    }
    .form-title{
      color:#555;
      margin:0 -40px 0 -40px;
      background: #F9FBFA;
      padding:0px 40px;
      line-height:100px;
      height:100px;
      font-size:0.9em;
    }

    .btn-default{
      margin-top:100px;
      border-radius:50px;
    }
    .form-item{
      height:60px;
      font-size:30px;
      display:flex;
      align-items:center;

      border-bottom:1PX solid #F3EFEF;
      height:140px;
      padding:20px 0;

      .item-tit{
        width:150px;
        padding-right:30px;
        display:flex;
        justify-content:space-between;
        i{font-style:normal;}
      }
      .form-ipt{
        flex:1;
          input{
            font-size:30px;
            width:100%;
            border:none;
          }
      }
      .form-code{
        color:#EB5836;
        color:#35D4C7;
        min-width:160px;
        text-align:right;
        &.disabled{
          color:#999
        }
      }
 
      .ui-icon{
        width:32px;
        height:32px;
        margin-right:20px;
      }
    }
}

</style>

