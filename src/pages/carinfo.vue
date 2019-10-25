<template>
  <div class="page page-carinfo">
    <headNav> </headNav>
    <div class="main">
      <applySteps finishs="1" selected="2"></applySteps>

      <div class="form-box">
        <div class="brick brick-upload">
          <div class="tit">
            上传行驶证
          </div>
          <div class="tit-s">
            (上传图片自动识别填写信息)
          </div>

          <div class="ctc">
            <div class="upload-boxes">

              <uploadImg :imgUrl.sync="carInfo.drivingPermiRightImg" @change="changeRImg" title="上传行驶证正面"></uploadImg>
              <uploadImg :imgUrl.sync="carInfo.drivingPermiWrongImg" @change="changeWImg" title="上传行驶证反面"></uploadImg>
            </div>
          </div>
        </div>


        <div class="brick">
          <div class="tit">
            输入办理ETC的车牌号
          </div>
          <div class="ctc">
            <keyboard :licencePlate.sync="carInfo.licencePlate" :licencePlateArr.sync="carInfo.licencePlateArr"
              @change="onKbChange"></keyboard>
            <div class="num-tip">
              交通部规定，1辆车仅允许办理1张ETC卡，专车专用
            </div>
          </div>
        </div>

        <div class="brick">
          <div class="tit">
            选择车牌类型
          </div>
          <div class="ctc">
            <div class="car-type">
              <div class="item t-blue" :class="{active:carInfo.licencePlateType=='1'}" @click="selectCarType('1')">
                蓝牌
              </div>
              <div class="item t-green" :class="{active:carInfo.licencePlateType=='3'}" @click="selectCarType('3')">
                绿牌
              </div>
            </div>
          </div>
        </div>

        <div class="brick brick-driving-number">
          <div class="form-item">
            <div class="form-tit">
              车辆所有人
            </div>
            <div class="form-ipt">
              <input type="text" class="ipt" v-model="carInfo.carOwner" placeholder="请输入车辆所有人" />
            </div>
          </div>
        </div>


        <div class="brick">

          <div class="ctc">


            <div class="form-title form-title-un">
              虚线框内为非必填项
            </div>

            <div class="form-group form-car-group">
              <div class="form-item">
                <div class="form-tit">
                  车辆使用性质
                </div>
                <div class="form-ipt">
                  <van-radio-group v-model="carInfo.carUseType">
                    <van-radio name="1" value="1">运营</van-radio>
                    <van-radio name="0" value="0">非运营</van-radio>
                  </van-radio-group>

                </div>
              </div>


              <div class="form-item" style="display:none">
                <div class="form-tit">
                  车辆长度（cm）
                </div>
                <div class="form-ipt">
                  <input type="number" maxlength="5000" v-model="carInfo.carLength" class="ipt" placeholder="请输入" />
                </div>
              </div>

              <div class="form-item" style="display:none">
                <div class="form-tit">
                  车辆宽度（cm）
                </div>
                <div class="form-ipt">
                  <input type="number" maxlength="1000" v-model="carInfo.carWidth" class="ipt" placeholder="请输入" />
                </div>
              </div>


              <div class="form-item" style="display:none">
                <div class="form-tit">
                  车辆高度（cm）
                </div>
                <div class="form-ipt">
                  <input type="number" maxlength="1000" class="ipt" v-model="carInfo.carHeight" placeholder="请输入" />
                </div>
              </div>

              <div class="form-item" style="display:none">
                <div class="form-tit">
                  车轴数量（个）
                </div>
                <div class="form-ipt">
                  <input type="number" class="ipt" maxlength="10" v-model="carInfo.axleNumber" placeholder="请输入" />
                </div>
              </div>


              <div class="form-item">
                <div class="form-tit">
                  车辆型号
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="30" v-model="carInfo.carType" placeholder="请输入" />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">
                  品牌型号
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="30" v-model="carInfo.carBrand" placeholder="请输入" />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">
                  车辆识别代号
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="30" v-model="carInfo.vehicleFrameNo" placeholder="车辆识别代号" />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">
                  核定人数
                </div>
                <div class="form-ipt">
                  <input type="number" class="ipt" maxlength="100" v-model="carInfo.hostNumberApproved"
                    placeholder="请输入核定人数" />
                </div>
                <div class="form-unit">
                  个
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">
                  发动机号
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="16" v-model="carInfo.engineNo" placeholder="请输入发动机号" />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">
                  外廓尺寸
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="16" v-model="carInfo.overall_dimension"
                    placeholder="长 X 宽 X 高" />
                </div>
                <div class="form-unit unit-mm">
                  mm
                </div>
              </div>
            </div>

          </div>
        </div>

        <van-button type="primary" class="btn-default" @click="nextAction">下一步</van-button>

      </div>
    </div>
  </div>
</template>

<script>


  import { RadioGroup, Radio, Button } from '@/vant';
  import { tip, setTimer, showLoading, hideLoading,checkName } from '@/utils'
  import keyboard from "@/components/keyboard/index";
  import applySteps from '@/components/applySteps'


  export default {
    name: "carinfo",

    components: {
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Button.name]: Button,
      keyboard,
      applySteps
    },
    data() {

      let carInfo = this.$store.state.carInfo;

      if (carInfo.licencePlateType == "") {
        carInfo.licencePlateType = "1"
      }

      if (carInfo.licencePlateArr) {
        carInfo.licencePlate = carInfo.licencePlateArr.join('');
      }

      return {

        applyId:"",
        btnDisabled: true,
        licencePlate: carInfo.licencePlate,
        carType: "blue",
        carProps: "1",
        carInfo: carInfo
      };
    },
 


    watch: {



      carInfo: {
        //特别注意，不能用箭头函数，箭头函数，this指向全局
        handler: function () {
          setTimeout(() => {
            this.checkIsSubmit();
          }, 100)

          this.saveCarInfo();
        },
        deep: true
      },


      licencePlate(v) {
        this.carInfo.licencePlate = v;
        this.carInfo.licencePlateType = v.length == 8 ? 3 : 1;
      },

      ["carInfo.licencePlate"](v) {
        this.licencePlate = v;
      },


      async ["carInfo.drivingPermiRightImg"](v) {
        if (v) {
          this.ocrVehicleFace(v);
        }
      },

      async ["carInfo.drivingPermiWrongImg"](v) {
        if (v) {
          this.ocrVehicleBack(v);
        }

      },
    },

    mounted() {
      if (this.carInfo.licencePlateArr) {
        this.carInfo.licencePlate = this.carInfo.licencePlateArr.join('');
      }

      this.licencePlate = this.carInfo.licencePlate;
 
    },
    methods: {

      //识别驾驶证正面
      async ocrVehicleFace(v) {

        let res, data;
        let carInfo = this.carInfo;

        showLoading('识别中');
        res = await this.$api.ocrVehicle({
          image: v,
          side: "face"
        });

        data = res && res.data;

        hideLoading();

        if (data && data.code == 200 &&  data.data && typeof data.data == 'object' ) {
          data = data.data;

          Object.assign(carInfo, {
            carOwner:data.owner,
            licencePlate: data.plate_num,
            vehicleFrameNo: data.vin,
            engineNo: data.engine_num,
            carBrand: data.model,
            licencePlateArr: data.plate_num.split(''),
            carUseType: +(data.use_character == '营运') + '',
            licencePlateType: data.plate_num.length == 8 ? 3 : 1,
            carType: data.model.replace(/[\u4e00-\u9fa5]/g, '')
          });

          this.setData({
            "licencePlateArr": data.plate_num.split(''),
            "carInfo": carInfo
          });

        }

      },

      //识别驾驶证反面
      async ocrVehicleBack(v) {

        let res, data,carSize,carSizes;
        let carInfo = this.carInfo;
        let carWidth = 0 ,carHeight = 0,carLength = 0;

        showLoading('识别中');
        res = await this.$api.ocrVehicle({
          image: v,
          side: "back"
        });

        data = res && res.data;

        hideLoading();

        if (data && data.code == 200 && data.data && typeof data.data == 'object') {

          data = data.data;

          carSize = data.overall_dimension.replace('mm', '');

          if(carSize){
            carSizes = carSize.split('X');
            if(carSizes.length == 3){
              carWidth = carSizes[0];
              carHeight = carSizes[1];
              carLength =  carSizes[2];
            }
          }

          Object.assign(carInfo, {
            "hostNumberApproved": data.appproved_passenger_capacity.replace('人', ''),
            "overall_dimension":  carSize,
            "drivingPermi": data.file_no,
            "carWidth":carWidth,
            "carHeight":carHeight,
            "carLength":carLength
          });

          this.setData({
            carInfo: carInfo
          });

          console.log(carInfo);

        }

      },


      //定时保存
      saveCarInfo() {
        setTimer("carInfoTimer", () => {
          this.$store.commit('setCarInfo', this.carInfo);
        }, 300);

      },

      onKbChange(v) {

        let carInfo = this.carInfo;
        carInfo.licencePlate = v.join('');
        carInfo.licencePlateArr = v;
        this.carInfo = carInfo;
 
      },

      changeRImg(v){
        console.log(v);
      },

      changeWImg(v){
        console.log(v);
      },

      //检查是否可以提交
      checkIsSubmit() {
        
        let disabled = false;
        let carInfo = this.carInfo;

        for (let d in carInfo) {
          if ((carInfo[d] + "").replace(/\s/g, '') === '') {
            disabled = true;
            break;
          }
        }

        this.btnDisabled = disabled;
      },

      selectCarType(carType) {
        if( this.carInfo.licencePlate.length == 8){
          this.carInfo.licencePlateType = 3
        }else{
          this.carInfo.licencePlateType = 1
        }
       
      },

      getLocalFormData() {

        let applyInfo = this.$store.getx('applyInfo');
        let carInfo = this.$store.getx('carInfo');
        let cardInfo = this.$store.getx('cardInfo');
        let catId = cardInfo.id;

        if(!this.applyId){
          delete applyInfo.id;
        }

        console.log(applyInfo);

        let datas = {
          catId,
          applyInfo,
          carInfo
        };

    

        return datas;
      },

      //保存申请人信息
      async saveApplyInfo() {

        let res,data;
        let datas = this.getLocalFormData();
        
        showLoading("保存中");
        res = await this.$api.saveApplyInfo(datas);
        data = res && res.data;
        
        if (data && data.code == 200 && data.data) {
          hideLoading();
          data = data.data;

          if(data)

            this.$store.commit("setApplyInfo",{id:data.applyId});
            this.$store.commit("setCarInfo",{id:data.carId});
            this.go("/bindBank");

        } else {
          this.doing = false;
          tip(data && data.data || "保存失败");
        }

      },


      nextAction() {

        let carInfo = this.carInfo;
        let cardInfo = this.$store.getx('cardInfo');
        let catId = cardInfo.id;

 

        if(!cardInfo.id){
          tip("请先选择卡类型");
          return;
        }

        if(!carInfo.carOwner){
          tip("请输入车辆所有人");
          return;
        }

        if(!checkName(carInfo.carOwner)){
          tip("车辆所有人格式不正确");
          return;
        }

        if (!carInfo.drivingPermiRightImg) {
          tip("请上传照行驶证正面照");
          return;
        }

        if (!carInfo.drivingPermiWrongImg) {
          tip("请上传照行驶证反面照");
          return;
        }

  

        this.$store.commit('setCarInfo', carInfo);
        this.saveApplyInfo();


      }


    }
  };
</script>
<style lang="scss" scoped>
  .page-carinfo {

    background: #fff;

    .main {
      padding: 30px;
    }

    .car-type {
      display: flex;
      justify-content: space-between;

      .item {

        flex: 1px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        background: #E9F5F3;
        color: #91B6AF;
        font-size: 30px;

        &:last-child {
          margin-left: 36px;
        }

        &.active {
          &.t-blue {
            // background: #568FF8FF;
            background: #1BDCBA;
            color: #fff;
          }

          &.t-green {
            background: #1BDCBA;
            color: #fff;
          }

        }
      }

    }



    .car-num {
      display: flex;
      justify-content: space-between;

      .item {
        width: 76px;
        height: 98px;
        line-height: 98px;
        text-align: center;
        background-image: url("../assets/images/car-num.png");

      }

      .item-new-energy {
        background-image: url("../assets/images/car-num-add.png");
        background-size: 100% 100%;

        .txt {
          font-size: 24px;
          line-height: 1.2em;
          display: inline-block;
          padding-top: 40%;
        }
      }

      .car-number-input {
        input {
          width: 100%;
          height: 100%;
          border: none;
        }

      }
    }

    .brick {
      color: #384140;
      font-size: 30px;
      margin-bottom: 30px;

      .tit {
        margin-bottom: 20px;
        font-size: 30px;
      }

      &.brick-upload {
        margin-bottom: 40px;

        .tit {
          font-size: 40px;
          margin-bottom: 15px;
        }

        .tit-s {
          font-size: 28px;
          margin-bottom: 30px;
          color: #777E7D;
        }

      }


      .num-tip {
        display: flex;
        align-items: center;

        &::before {
          content: " ";
          display: inline-block;
          border: 1PX solid #ddd;
          width: 16px;
          height: 16px;
          border-radius: 10px;
          margin-right: 10px;

        }

        color: #CFD6D6;
        font-size: 24px;
        margin-top: 25px;
      }
    }

    .brick-driving-number {
      margin: 0 -30px;
      margin-bottom: 30px;

      background: #fff;

      .form-item {
        padding: 0 30px;
        display: flex;
        font-size: 30px;
        flex-direction: column;


        .form-tit {
          color: #382C2AFF;
          flex: 1;
        }

        .form-ipt {
          flex: 1;
          padding: 15px 0;
          border-bottom: 2PX solid #1BDCBA;

          .ipt {
            width: 100%;
            font-size: 30px;
            border: none;
          }
        }

      }

    }

    .upload-boxes {
      display: flex;
      justify-content: space-between;
    }
  }

  .form-group {
    margin-bottom: 40px;

    .form-item {
      display: flex;
      font-size: 28px;
      justify-content: space-between;
      margin-bottom: 30px;

      .form-tit {
        color: #777E7D;
        width: 130px;
        display: flex;
        justify-content: space-between;
        text-align: justify;

        i {
          font-style: normal
        }
      }

      .form-ipt {
        flex: 1;


        .ipt {
          font-size: 28px;
          width: 100%;
          border: none;

        }
      }
    }
  }

  .form-title-un {
    margin-bottom: 20px;
  }

  .form-car-group {
    border: 2PX dashed #E2E5E5;
    padding: 30px 20px 20px 20px;

    .form-item {
      .form-tit {
        width: 210px;
      }

      .form-unit {
        width: 50px;
        text-align: right;
        color: #777E7D;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &.unit-mm {
          margin-left: 15px;
        }
      }

      .form-ipt {

        input {
          text-align: right;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .van-radio-group {
      display: flex;
      justify-content: flex-end;

      .van-radio {
        margin-left: 20px;
      }
    }
  }

  .form-box {
    padding: 20px 0 40px 0;
  }
</style>