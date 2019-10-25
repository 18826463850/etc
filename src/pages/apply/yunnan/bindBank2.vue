<template>
  <div class="page page-bindBank">
    <headNav> </headNav>
    <div class="main">
      <iframe id="frame" class="iframe-box" src="/bank.html"  frameborder="0">
       
      </iframe>

      <div class="btn-box">
      <van-button type="primary" class="btn-default" @click="submitForm">下一步
      </van-button>
      </div>
    </div>

  </div>
</template>

<script>

  import  store from 'store'
  import { Button } from '@/vant';

  export default {
    name: "bindBank2",
    components: {
      [Button.name]: Button
    },
    data() {


      return {

      };
    },

    created(){
   
 
    },

    mounted() {
        //  var bindBankFormHtml = store.get('bindBankFormHtml');
        //  console.log(123456);
        //  console.log(bindBankFormHtml );
        //   if(bindBankFormHtml){
        //     console.log(123456789);
        //     document.write(bindBankFormHtml);
        //   }

    },


    watch: {
      
    },


    methods: {
      submitForm(){
        let url = document.getElementById("frame").src;
        console.log(url)
        this.go("/yunnan_bindBank?resultInfo=1");
      },
    }
  };
</script>
<style lang="scss" scoped>

  .page-bindBank {
    height:100%;
    .main {
      height:100%;
      display:flex;
      flex-direction:column;
    
      .iframe-box{
        flex:1;
      }

      .btn-box {
        margin: 40px;
        .btn-default{
          text-align: center;
          color: #ffffff
        }
      }
      

    }

  }
</style>