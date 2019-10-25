<template>
  <div class="page page-testabc">
        <van-button  class="btn" type="primary" size="large" @click="driverLicenseTest"> 驾驶证识别 </van-button>

        <van-button    class="btn"  type="primary" size="large"  @click="idcardTest"> 身份证识别 </van-button>


 </div>
</template>

<script>
    import keyboard from "@/components/keyboard/index";
    import { RadioGroup, Radio, Button } from '@/vant';
     import axios from 'axios'
    export default {
        name: "keyboardDemo",
        mounted: function() {},
        components: {
            [Button.name]: Button,
            keyboard
        },
        data() {
            return {
            };
        },

        watch: {
        },
        created() {
        },
        methods: {

            driverLicenseTest(){ 
                axios({
                    method:'POST',
                    url:'http://dm-53.data.aliyun.com/rest/160601/ocr/ocr_vehicle.json',
                    headers: {
                   'authorization': 'APPCODE ddd44753e6a84f08832965a597d2c21a' ,
                     'Accept': 'application/json',
                    },
                    data: {
                         "AppMode": "AppSecret",
                        "AppKey": '203726835',
                        "AppSecret": 'x3fee1u9zkqt83t6yzq9et1a4ht7umhg',
                        "AppCode": 'ddd44753e6a84f08832965a597d2c21a',
                        "image": "http://sale.flnet.com/cdn/images/001.jpg",
                        "configure": "{\"side\":\"back\"}"     
                    },
                }).then(d=>{
                  console.log(d);
                })
           },

           idcardTest(){ 
               
                axios({
                    method:'POST',
                    url:'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
                    headers: {
                   'authorization': 'APPCODE ddd44753e6a84f08832965a597d2c21a' ,
                     'Accept': 'application/json',
                    },
                    data: {

                        "image": "http://sale.flnet.com/cdn/images/idcard-a.jpg",
                        // "image": "http://sale.flnet.com/cdn/images/idcard-b.jpg",
                        "configure": "{\"side\":\"face\"}"     
                    },
                }).then(d=>{
                  console.log(d);
                })
           },



        }
    };
</script>

<style lang="scss">
   .page-testabc{
       padding:20px;
       .btn{
           margin-bottom:20px;
       }
   }
</style>


