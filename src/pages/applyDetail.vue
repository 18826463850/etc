<template>
  <div class="page page-applyDetail">
    <headNav></headNav>
    <div class="main">

      <exaMineSteps finishs="1,2,3" selected="4"></exaMineSteps>

      <div class="form-box">
        <div class="card-box">
              <div class="item">
                     <div class="tit">
                      OBU
                     </div>
                     <div class="val">
                      25466541
                     </div>
              </div>
              <div class="item">
                <div class="tit">
                  发卡方卡号
                </div>
                <div class="val">
                 54584112265299872
                </div>
         </div>
        </div>

        <div class="img-box">
               <div class="item">
                    <img :src="imgUrl1" alt="">
               </div>
                <div class="item">
                    <img :src="imgUrl2" alt="">
                </div>
                <div class="item">
                <img :src="imgUrl3" alt="">
                </div>
        </div>
        
      </div>


    </div>

  </div>

</template>

<script>

  import { Button, Popup } from '@/vant';
  import exaMineSteps from '@/components/examineSteps'
  export default {
    name: "login",
    components: {
      [Button.name]: Button,
      [Popup.name]: Popup,
      exaMineSteps

    },
    data() {
      return {
        showPopup: false,
        token: "dfdfd877878",
        imgUrl1: "",
        imgUrl2: "",
        imgUrl3: "",
      };
    },

    mounted() {
        this.imgUrl1 = localStorage.getItem('imgUrl1')
        this.imgUrl2 = localStorage.getItem('imgUrl2')
        this.imgUrl3 = localStorage.getItem('imgUrl3')
    },
    methods: {
    }
  };
</script>
<style lang="scss" scoped>
  .page-applyDetail {

    .main {
      padding: 40px;
    }

    .card-box{
      color:#726664;
      font-size:34px;
      margin:0 -40px;
      background:#FBF8F8;
      margin-bottom:40px;
      .item{
        margin:0 40px;
        display:flex;
        justify-content:space-between;
        border-bottom:1PX solid #EAE2E1;
        height:120px;
        line-height:120px;
         &:last-child{
           border-bottom:none;
         }
        
      }
    }

    .img-box{
        display:flex;
        flex-wrap:wrap;
         margin:0 -15px;
        .item{
           width:328px;
           height:200px;
           display:flex;
           justify-content:center;
           align-items:center;
          
           width:calc(100%/2 - 30px);
           margin-left:15px;
           margin-right:15px;
           margin-bottom:30px;
           .pic-icon{
              width:52px;
              height:40px;
              background-image:url(../assets/images/car-pic.png);
           }
            img {
                width: 100%;
                height: 100%;
                border:1PX solid #E8E2E1;
                border-radius:10px;
            }
        }

    }
   


  }
</style>