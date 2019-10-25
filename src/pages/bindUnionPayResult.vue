<template>
  <div class="page page-bindUnionPayResult">
      <headNav headBgColor="#5CA3D9" title="开通结果" path="/yunnan_bindBank" > </headNav>
      <div class="main">


      <div class="form-box">
          <div class="result-title">
            <div class="inner-title">
                <div class="icon-box">
                    <img src="../assets/images/yes_fill.png"/>
                  </div>
                  <h3>
                      您已开通银联在线支付
                  </h3>
            </div>
         
           
          </div>    
          <div class="form-submit">
            <van-button type="primary" class="btn-default"   @click="submit">返回商户</van-button>
          </div>
      </div>

    </div>
  </div>
</template>
<script>
 
 import { Button, Popup, Picker, Area } from '@/vant';
    export default {
      name: "bindUnionPayResult",
      components: {
        [Button.name]: Button,
      },
      watch:{
        imgUrl(v){
          console.log(v);
        },

        imgUrl2(v){
          console.log(v);
        }
      },
  
      data() {
        return {
           imgUrl:"",
           imgUrl2:"",
           imgUrl3:""
  
        }
      },
  
      methods: {


        submit(){
              this.$router.push({
                path:"/yunnan_bindBank"
              });
        }
 

      }
    }
  </script>
<style lang="scss" scoped>
  .page-bindUnionPayResult {

    background: #F0F0F2;
    height:100%;
    .main {
      padding: 50px 0 120px 0;
      background: #fff;
      border-bottom:1px solid #bbb;
    }

    .result-title{
      display:flex;
      justify-content: center;
      .inner-title{
        display: flex;
        line-height:88px;
        img{
          width:88px;
          height:88px;
        }
        h3{
          margin-left:30px;
          font-size:42px;
          font-weight: normal;
        }
      }

    }
    .form-submit{
      padding:20px 40px ;
      .btn-default{
          background:#5CA3D9!important;
          font-size:36px!important;
          box-shadow:none!important;
  
          &.van-button--disabled{
            background:#b2b2b2!important;
          }
      } 
  
    }
 
  }


</style>