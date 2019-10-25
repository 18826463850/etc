<template>
  <div class="page page-passwordset">
      <headNav > </headNav>
    <div class="main">
      <div class="form-box">
        <div class="form-title">
          设置密码后，可以使用手机号和密码登录
        </div>
        <div class="form-group">
          <div class="form-item">
            <div class="item-tit">
              <i>密</i><i>码</i>
            </div>
            <div class="form-ipt">
                  <input type="password"  placeholder="密码至少6位" maxlength="15" v-model="password"/>
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
        <van-button type="primary" :loading="doing" class="btn-default"  :disabled="btnDisabled"  @click="submit"  >设 置</van-button>
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
            mobile:""
 

        };
    },

    watch:{

 

    },
    created(e) {

      let user = this.$store.state.user;
      this.validCode = this.$store.state.validCode;
  
      if(user.mobile){
        this.mobile = user.mobile;
      }

      if(!this.validCode){
        tip("请先获取手机验证码")
        this.go('/mobileCheck');
      }
   
    },
    computed:{

      btnDisabled(){
        
            return !(this.password.length > 5 && this.password_repeat.length > 0)
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

         data = await this.$api.modifyPass({
           mobile:this.mobile,
           validCode:this.validCode,
           loginPass:this.password
         });
              

         data = data && data.data;

         if(data && data.code == 200){

             tip({
               title:"设置成功"
             });
             this.$router.replace({path:'/member' });
             this.$store.commit('setUser',{ whetherSetPass:0});

         }else{
           tip(data.message || "设置失败");
           this.doing = false;
         }


      }
    }
};
</script>
<style lang="scss" scoped>
.page-passwordset{

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

