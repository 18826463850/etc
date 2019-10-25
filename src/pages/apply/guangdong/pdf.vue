<template>
  <div class="page page-pdf">
    <headNav showBack="false"> </headNav>
    <div class="main">
         <applySteps finishs="1,2,3,4" listType = "guangdong"></applySteps>
         <div class="content">
           <v-pdf :pdfUrl="protocol"></v-pdf>
         </div>

         <div class="footer">
          <van-button type="primary" class="btn-default btn-agree" @click="nextAction">下一步</van-button>
         </div>
    </div>
  </div>
</template>

<script>

  import { Button } from '@/vant';
  import { tip } from "@/utils";
  import * as applyRouter from '@/router/applyRouter';
  import pdf from './pdfjs';
  import applySteps from '@/components/applySteps';

  export default {
    name: "pdf",
    components: {
      [Button.name]: Button,
      'v-pdf': pdf,
      applySteps
    },
    data() {
      return {
        protocol:"",
      };
    },

    created() {
      this.protocol = this.$route.query.protocol ;
    },

    mounted() {
    },

    methods: {
      nextAction(){
        this.$store.dispatch("clearApplyInfo");
        this.go('/submitsuccess');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .page-pdf {
    color: #384140;
    height: 100%;

    display:flex;
      flex-direction:column;

    .main {
      padding: 40px;
      display:flex;
      flex-direction:column;
      flex:1;

      .content{
        flex:1;
        overflow:auto;
        p{
          margin-bottom:2em;
        }
      }

      .footer{
        padding-top: 40px;
        border-top:1px solid #ddd;
      }

      
    }


  }
</style>