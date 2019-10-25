<template>
  <div class="page page-oneprocessing">
    <headNav> </headNav>
    <div class="main">
      <div class="form-item">
      <div class="input-box">
      <div class="item-cardtype" @click="togglePopup">
          <span class="type-name">{{carInfo.carAddr}}</span>
          <span class="icon-down"> </span>
      </div>
       
       <div class="item-cardnum">
         <input type="text" class="input-style" v-model="carInfo.carNumber" placeholder="请输入车牌号">
       </div>
      </div>
        </div>
       <div class="brick">
        <div class="ctc">
          <div class="car-type">
            <div class="item  t-blue" :class="{active:carInfo.licencePlateType==1}" @click="selectCarType(1)">
              蓝牌
            </div>
            <div class="item t-green" :class="{active:carInfo.licencePlateType==3}" @click="selectCarType(3)" >
              绿牌
            </div>
          </div>
        </div>
      </div>

       <div class="btn-box">
          <van-button type="primary" class="btn-default"  :disabled="btnDisabled" @click="nextAction" >一键办理</van-button>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker  :default-index="carInfo.carAddrIndex"  show-toolbar :columns="carAddrListx" @cancel="onCancel"  @confirm="onConfirm"  />
    </van-popup>
  </div>
</template>
<script>


import { Button,  Popup, Picker, Area } from "@/vant";
import {checkCarBrand,tip} from '@/utils'
import carAddrListx from  '@/core/carAddrListx'

export default {
  name:"login",
  components:{
       [Button.name]:Button,
       [Popup.name]: Popup,
    [Picker.name]: Picker,
  },  
  
 data() {
    //this.$store.setx('carInfo',{})
    let localCarInfo = this.$store.getx('carInfo') || {};
    let carInfo = Object.assign({
      "carAddrIndex":0,

      //车归属地
      "carAddr": localCarInfo.carAddr || "",

      
      //车牌号码
      "carNumber": localCarInfo.carNumber || "",

      //车牌号
      "licencePlate": localCarInfo.licencePlate || "",

      //车牌类型
      "licencePlateType":localCarInfo.licencePlateType || 1,

   
    });

    let _carAddrListx = [];

    for(let d of carAddrListx){

      let item = {
         name:d,
         value:d,
         disabled:false,
         selected:false,
      };

      if(carInfo.carAddr && carInfo.carAddr == d){ 
         item.selected = "selected";
       }
      _carAddrListx.push( item );

    }

    if(!carInfo.carAddr){
      _carAddrListx[0].selected = "selected";
      carInfo.carAddr =_carAddrListx[0].name;
      //console.log(123456);
    }


  return {

       show:false,
       btnDisabled:true,
       carAddrListx:carAddrListx,

       //汽车信息
       "carInfo": carInfo
  }
},



 mounted(){
      let carInfo = this.carInfo;
      this.checkIsSubmit();
 },

 watch:{

  carInfo: {
      //特别注意，不能用箭头函数，箭头函数，this指向全局
      handler: function () {   
          setTimeout(() => {
            this.checkIsSubmit();
          }, 100)
      },
      deep: true
    },


    ["carInfo.carNumber"](v){
      this.carInfo.licencePlate = this.carInfo.carAddr +v;
    }

 },

 methods: {

  togglePopup() {
      this.show = !this.show;
    },

    //选择车牌类型
    selectCarType(licencePlateType) {
      this.carInfo.licencePlateType = licencePlateType
    },

    //选择车牌归属地
    selectCarAddr(carAddr) {
      this.carInfo.carAddr = carAddr;
    },

    onConfirm(value,index){
        this.carInfo.carAddr = value;
        this.carInfo.carAddrIndex= index;
        this.togglePopup();
    },
    onCancel(){
      this.togglePopup();
    },


    //检查是否可以提交
    checkIsSubmit(){
      let disabled = false;
      let carInfo = this.carInfo;
      for (let d in carInfo) {
        if ((carInfo[d] + "").replace(/\s/g, '') === '') {
          disabled = true;
          break;
        }
      }

      console.log(this.carInfo);
      console.log("disabled:"+disabled);
      this.btnDisabled = disabled;
    },

    //一键办理 下一步
    nextAction(){
        let carInfo = this.carInfo;

        if(!carInfo.carNumber){
          tip("请输入车牌号");
          return;
        }

        //绑定车牌
        carInfo.licencePlate = carInfo.carAddr + carInfo.carNumber;

        if(!checkCarBrand(carInfo.licencePlate)){
          tip("车牌号格式不正确");
          return;
        }

       
        let localCarInfo =  this.$store.getx('carInfo') ||{};
        
        Object.assign(localCarInfo,carInfo);
        this.$store.setx('carInfo',localCarInfo);

        console.log(localCarInfo);
        this.go("/applicant");

    },

 }
}
</script>
<style lang="scss" scoped>

.page-oneprocessing
{

  .input-style::-webkit-input-placeholder{
  color: #91B6AF;

  .main
{
  padding:36px;
  position: relative;
  .form-item
  {

   .input-box{
      display:flex;
      width:678px;
      height:98px;
      background-repeat:no-repeat;
      background-size:contain;
      background-image:url(../assets/images/input-bg.png);

    }
 
    .item-cardtype
    {

      width:132px;
      display:flex;
      align-items:center;
      padding:0 25px;
      .type-name{
        color:#192B28;
        font-size:40px;
        margin-right:0px;
      }
      .icon-down{
        width: 22px;
        height: 14px;
        margin: auto;
        background-repeat:no-repeat;
        background-size:contain;
        background-image:url(../assets/images/icon-down.png);
      }
 
    }
    .item-cardnum{
       display:flex;
       flex:1;
    }
    
    .input-style{
      height:98px;
      flex:1;
      border:none;
      padding:20px;
      background:transparent;
      font-size:34px;
    }

 

  }
  .btn-box{
      padding:40px 0;
      display:flex;
      button{
        flex:1;
      }
 
  }
  
}

 .brick {
    color: #382C2AFF;
    font-size: 30px;
    margin-bottom: 30px;
    &.brick-upload{
      margin-bottom:80px;
    }
    .tit {
      margin-bottom: 20px;
    }

    .car-num {
      display: flex;
      justify-content: space-between;

      .item {

        width: 76px;
        height: 98px;
        line-height: 98px;
        text-align: center;
      }
    }

    .num-tip {
      color: #C5BBB9FF;
      font-size: 24px;
      margin-top: 20px;
    }
  }

  .car-type {
      display: flex;
      justify-content: space-between;
       margin-top:48px;
      .item {

        flex:1px;
        height:88px;
        line-height: 88px;
        text-align: center;
        background: #E9F5F3;
        color: #91B6AF;
        font-size: 30px;
        &:last-child{
          margin-left:36px;
        }

        &.active {
          &.t-blue {
            // background: #568FF8FF;
            background:#1BDCBA;
            color: #fff;
          }

          &.t-green {
            background: #1BDCBA;
            color: #fff;
          }

        }
      }

    }

}

}


</style>


