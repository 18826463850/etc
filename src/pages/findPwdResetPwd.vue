<template>
  <div class="page page-passwordset">
    <div class="main">
      <div class="form-box">
        <div class="form-title">
         重置密码
        </div>
        <div class="form-group">
          <div class="form-item">
            <div class="item-tit">
              <i>密</i><i>码</i>
            </div>
            <div class="form-ipt">
                  <input type="password"  placeholder="密码至少6位" maxlength ="15" v-model="password"/>
            </div>
          </div>
          <div class="form-item item-code">
              <div class="item-tit">
                  <i>确</i><i>认</i><i>密</i><i>码</i>
                </div>
            <div class="form-ipt">
                <input type="password" placeholder="请再次输入密码" v-model="password_repeat"/>
            </div>
        
          </div>
        </div>
        <van-button type="primary" :loading="doing" class="btn-default"  :disabled="btnDisabled"  @click="submit"  >提交</van-button>

      
      </div>
    </div>
  </div>
</template>

<script>

import { Button} from '@/vant';
import {tip,checkMobile,showLoading,hideLoading,checkValidCode}from "@/utils"
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
 
            //密码
            password:"",

            //重复密码
            password_repeat:"",

            //验证码
            validCode:"",

            //手机号
            mobile:"",

            user:null
 

        };
    },

    watch:{

 

    },
    created(e) {

      let user = this.$store.state.user;
      this.validCode = this.$store.state.validCode;

      if(!user){
        tip("请先验证手机号码")
        this.go('/findPwdCheckMb');
        return;
      }

      if(user.mobile){
        this.mobile = user.mobile;
      }

      this.user = user;
 
    },
    computed:{

      btnDisabled(){
        
            return !(this.password.length > 5 && this.password_repeat.length > 0)
      }

    },
    methods: {
 
      //设置登录信息
      setLogin(user) {
        this.$store.commit('setUser', user);
        this.$store.commit('setToken', user.token);
        this.$router.push({ path: '/' });
      },
  
      //登录
      async submit(){

        let res,data;

        if(this.doing) return;

         if(this.password == ''){
           tip("请输入密码");
           return;
         }

         if(this.password.length < 6){
          tip("密码长度至少6位");
          return;
         }

         if(this.password.length > 15){
          tip("密码长度不能大于15位");
          return;
         }

         if(this.password_repeat == ''){
           tip("请输入确认密码");
           return;
         }

         if(this.password != this.password_repeat ){
           tip("两次密码不一致");
           return;
         }

         this.doing = true;
         showLoading('设置中');

         res = await this.$api.resetPass({
           mobile:this.mobile,
           loginPass: this.password
         });

         data = res && res.data;

         if(data && data.code == 200){
             hideLoading();
             this.setLogin(this.user);
      
         }else{
           tip(data.message || "重置失败");
           this.doing = false;
         }
      }
    }
};
</script>
<style lang="scss" scoped>
.page-passwordset{

    .main{
      padding: 40px 85px;
    }
    .form-title{
      color: #1C110F;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 42px;
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
        color: #6A7271;
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

