<template>
  <div class="page page-carinfo">
    <headNav></headNav>
    <div class="main">
      <applySteps finishs="1" selected="2" listType="guangdong"></applySteps>

      <div class="form-box">
        <div class="brick brick-upload">
          <div class="tit">上传行驶证</div>
          <div class="tit-s">(上传图片自动识别填写信息)</div>

          <div class="ctc">
            <div class="upload-boxes">
              <uploadImg
                :imgUrl.sync="carInfo.drivingPermiRightImg"
                @change="changeRImg"
                title="上传行驶证正面"
              ></uploadImg>
              <uploadImg
                :imgUrl.sync="carInfo.drivingPermiWrongImg"
                @change="changeWImg"
                title="上传行驶证反面"
              ></uploadImg>
            </div>
          </div>
        </div>

        <div class="brick">
          <div class="ctc">
            <div class="form-title form-title-un">信息核对</div>
            <div class="form-group form-car-group">
              <div class="form-item">
                <div class="form-tit">使用性质</div>
                <div class="form-ipt">
                  <van-radio-group v-model="carInfo.carUseType">
                    <van-radio name="2" value="2">营运</van-radio>
                    <van-radio name="1" value="1">非营运</van-radio>
                  </van-radio-group>
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">车牌号</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="8"
                    v-model="carInfo.licencePlate"
                    placeholder="请输入"
                    readonly="readonly"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">车牌颜色</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    placeholder="请输入"
                    v-model="carInfo.licencePlateColor"
                    readonly="readonly"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">车主姓名</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.carOwner"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">车辆类型</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.carVehicleType"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">载荷/座位</div>
                <div class="form-ipt">
                  <input
                    type="tel"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.hostNumberApproved"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">车牌识别代号</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.vin"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <!-- <div class="form-item">
                <div class="form-tit">
                  使用性质
                </div>
                <div class="form-ipt">
                  <input type="text" class="ipt" maxlength="30"   placeholder="请输入" />
                </div>
              </div>-->

              <div class="form-item">
                <div class="form-tit">品牌型号</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="100"
                    v-model="carInfo.carBrand"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">发动机号</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.engineNo"
                    placeholder="请输入"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">注册日期</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.registerDate"
                    placeholder="请输入 (例如：2018-07-12)"
                  />
                </div>
              </div>

              <div class="form-item">
                <div class="form-tit">发证日期</div>
                <div class="form-ipt">
                  <input
                    type="text"
                    class="ipt"
                    maxlength="30"
                    v-model="carInfo.issueDate"
                    placeholder="请输入 (例如：2018-07-12)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <van-button type="primary" class="btn-default" @click="nextAction" :loading="doing">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio, Button } from "@/vant";
import {
  tip,
  setTimer,
  showLoading,
  hideLoading,
  checkName,
  checkLicencePlate,
  stringToDate
} from "@/utils";
import keyboard from "@/components/keyboard/index";
import applySteps from "@/components/applySteps";

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
    let carInfo = this.$store.getx("carInfo");
    if (carInfo.licencePlateType == "" || carInfo.licencePlateType == 1) {
      carInfo.licencePlateType = "0";
    }

    if (carInfo.licencePlateType == 3) {
      carInfo.licencePlateType = 11;
    }

    if (!carInfo.licencePlateArr) {
      carInfo.licencePlateArr = [];
    }

    if (carInfo.licencePlateArr) {
      carInfo.licencePlate = carInfo.licencePlateArr.join("");
    }

    if (carInfo.licencePlateType) {
      carInfo.licencePlateColor =
        carInfo.licencePlateType == 4 ? "绿牌" : "蓝牌";
    }

    console.log(carInfo);

    return {
      applyId: "",
      btnDisabled: true,
      licencePlate: carInfo.licencePlate,
      carType: "blue",
      carProps: "1",
      carInfo: carInfo,
      doing: false
    };
  },

  watch: {
    carInfo: {
      //特别注意，不能用箭头函数，箭头函数，this指向全局
      handler: function() {
        setTimeout(() => {
          this.checkIsSubmit();
        }, 100);

        this.saveCarInfo();
      },
      deep: true
    },

    licencePlate(v) {
      this.carInfo.licencePlate = v;
      this.carInfo.licencePlateType = v.length == 8 ? 11 : 0;
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
    }
  },

  mounted() {
    let bindBankStatus = this.$store.getx("bindBankStatus");
    if (bindBankStatus) {
      this.$store.removex("bindBankStatus");
    }

    if (this.carInfo.licencePlateArr) {
      this.carInfo.licencePlate = this.carInfo.licencePlateArr.join("");
    }
    this.licencePlate = this.carInfo.licencePlate;
  },
  methods: {
    //识别驾驶证正面
    async ocrVehicleFace(v) {
      let res, data;
      let carInfo = this.carInfo;

      showLoading("识别中");
      res = await this.$api.ocrVehicle({
        image: v,
        side: "face"
      });

      data = res && res.data;

      hideLoading();

      console.log(
        data && data.code == 200 && data.data && typeof data.data == "object"
      );
      if (
        data &&
        data.code == 200 &&
        data.data &&
        typeof data.data == "object"
      ) {
        data = data.data;

        console.log(data);

        if (carInfo.licencePlate == data.plate_num) {
          Object.assign(carInfo, {
            carOwner: data.owner,
            licencePlate: data.plate_num,
            vehicleFrameNo: data.vin,
            vin: data.vin,
            issueDate: stringToDate(data.issue_date),
            registerDate: stringToDate(data.register_date),
            engineNo: data.engine_num,
            carBrand: data.model,
            carVehicleType: data.vehicle_type,
            licencePlateArr: data.plate_num.split(""),
            carUseType: data.use_character == "营运" ? "2" : "1",
            licencePlateType: data.plate_num.length == 8 ? 11 : 0,
            type: ""
          });

          this.setData({
            licencePlateArr: data.plate_num.split(""),
            carInfo: carInfo
          });
        } else {
          tip("识别出车牌与之前不同,请上传正确行驶证");
        }
      } else {
        tip("图片识别失败");
      }
    },

    //识别驾驶证反面
    async ocrVehicleBack(v) {
      let res, data, carSize, carSizes;
      let carInfo = this.carInfo;
      let carWidth = 0,
        carHeight = 0,
        carLength = 0;

      showLoading("识别中");
      res = await this.$api.ocrVehicle({
        image: v,
        side: "back"
      });

      data = res && res.data;

      hideLoading();

      if (
        data &&
        data.code == 200 &&
        data.data &&
        typeof data.data == "object"
      ) {
        data = data.data;

        carSize = data.overall_dimension.replace("mm", "");

        if (carSize) {
          carSizes = carSize.split("X");
          if (carSizes.length == 3) {
            carWidth = carSizes[0];
            carHeight = carSizes[1];
            carLength = carSizes[2];
          }
        }

        Object.assign(carInfo, {
          hostNumberApproved: data.appproved_passenger_capacity,
          overall_dimension: carSize,
          drivingPermi: data.file_no,
          carWidth: carWidth,
          carHeight: carHeight,
          carLength: carLength,
          totalWeight: data.unladen_mass
        });

        this.setData({
          carInfo: carInfo
        });

        console.log(carInfo);
      } else {
        tip("图片识别失败");
      }
    },

    //定时保存
    saveCarInfo() {
      setTimer(
        "carInfoTimer",
        () => {
          this.$store.commit("setCarInfo", this.carInfo);
        },
        300
      );
    },

    onKbChange(v) {
      let carInfo = this.carInfo;
      carInfo.licencePlate = v.join("");
      carInfo.licencePlateArr = v;
      this.carInfo = carInfo;
    },

    changeRImg(v) {
      console.log(v);
    },

    changeWImg(v) {
      console.log(v);
    },

    //检查是否可以提交
    checkIsSubmit() {
      let disabled = false;
      let carInfo = this.carInfo;
      let required = "drivingPermiRightImg,idCardWrongImg,licencePlate,carOwner,carUseType,vin,engineNo,issueDate,registerDate,hostNumberApproved,overall_dimension".split(
        ","
      );

      for (let d in carInfo) {
        if (
          required.indexOf(d) > -1 &&
          (carInfo[d] + "").replace(/\s/g, "") === ""
        ) {
          disabled = true;
          break;
        }
      }
      this.btnDisabled = disabled;
    },

    selectCarType(carType) {
      if (this.carInfo.licencePlate.length == 8) {
        this.carInfo.licencePlateType = 11;
      } else {
        this.carInfo.licencePlateType = 0;
      }
    },

    getLocalFormData() {
      let applyInfo = this.$store.getx("applyInfo");
      let carInfo = this.$store.getx("carInfo");
      let cardInfo = this.$store.getx("cardInfo");
      let user = this.$store.getx("user");
      let bankCardInfo = this.$store.getx("bankCardInfo");  // 信用卡申请信息
      let catId = cardInfo.id;
      carInfo.hostNumberApproved = parseInt(carInfo.hostNumberApproved);
      carInfo.carType = "2"; //目前只发客车
      if (!this.applyId) {
        delete applyInfo.id;
      }
      applyInfo.loginUserId = user.id;
      applyInfo.cardCatId = catId;
      // 申办渠道 ：1传统渠道，2信用卡渠道
      applyInfo.apply_channel = 2;
      // 申办的信用卡：1交通银行信用卡，2表示***银行卡信用卡
      applyInfo.apply_creditcard = 1;
      // 申请信用卡流水账号
     // applyInfo.serialnum = bankCardInfo.serialnum;
      let datas = {
        applyInfo: applyInfo,
        carInfo: carInfo
      };
      return datas;
    },

    //保存申请人信息
    async saveApplyInfo() {
      let res, data, message;
      let datas = this.getLocalFormData();
      if (datas.applyInfo.applyInfoName != datas.carInfo.carOwner) {
        tip("身份证姓名与车主姓名不相同");
        return;
      }

      showLoading("保存中");
      res = await this.$api.saveApplyInfoInGuangDong(datas);
      data = res && res.data;
      if (data && data.code == 200 && data.data) {
        hideLoading();
        data = data.data;
        console.log(data);
        // if(data)
        this.$store.commit("setApplyInfo", {
          id: data.applyId,
          niurunApplyId: data.niurunApplyId,
          otherApplyId: data.applyId
        });
        this.$store.commit("setCarInfo", { id: data.carId });
        this.nextApplyStep();
      } else {
        this.doing = false;

        if (data.message) {
          message = data.message;
        }

        if (data.code == 400 && data.data && typeof data.data == "string") {
          message = data.data;
        }

        if (data.code == 400 && data.data && data.data.info) {
          message = data.data.info;
        }

        if (!message) {
          message = "保存失败";
        }
        if (data.errmsg) message = data.errmsg;

        tip(message);
      }
    },

    nextAction() {
      let carInfo = this.carInfo;
      let cardInfo = this.$store.getx("cardInfo");
      let catId = cardInfo.id;

      if (!cardInfo.id) {
        tip("请先选择卡类型");
        return;
      }

      if (!carInfo.licencePlate) {
        tip("请输入车牌号");
      }

      if (!checkLicencePlate(carInfo.licencePlate)) {
        tip("车牌号码格式不正确");
      }

      if (!carInfo.drivingPermiRightImg) {
        tip("请上传照行驶证正面照");
        return;
      }

      if (!carInfo.drivingPermiWrongImg) {
        tip("请上传照行驶证反面照");
        return;
      }

      if (!carInfo.carOwner) {
        tip("请输入车辆所有人");
        return;
      }

      if (!checkName(carInfo.carOwner)) {
        tip("车辆所有人格式不正确");
        return;
      }

      if (!carInfo.vin) {
        tip("请输入车架号");
        return;
      }

      if (!carInfo.engineNo) {
        tip("请输入发动机号");
        return;
      }

      if (!carInfo.issueDate) {
        tip("请输入发证日期");
        return;
      }

      if (!carInfo.registerDate) {
        tip("请输入注册日期");
        return;
      }

      if (!carInfo.hostNumberApproved) {
        tip("请正确输入核定人数");
        return;
      }

      if (carInfo.carUseType == 2 && !carInfo.type) {
        tip("请输入收费车型");
        return;
      }

      this.$store.commit("setCarInfo", carInfo);
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
      background: #e9f5f3;
      color: #91b6af;
      font-size: 30px;

      &:last-child {
        margin-left: 36px;
      }

      &.active {
        &.t-blue {
          // background: #568FF8FF;
          background: #1bdcba;
          color: #fff;
        }

        &.t-green {
          background: #1bdcba;
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
      background-image: url("/assets/images/car-num.png");
    }

    .item-new-energy {
      background-image: url("/assets/images/car-num-add.png");
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
        color: #777e7d;
      }
    }

    .num-tip {
      display: flex;
      align-items: center;

      &::before {
        content: " ";
        display: inline-block;
        border: 1px solid #ddd;
        width: 16px;
        height: 16px;
        border-radius: 10px;
        margin-right: 10px;
      }

      color: #cfd6d6;
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
        color: #382c2aff;
        flex: 1;
      }

      .form-ipt {
        flex: 1;
        padding: 15px 0;
        border-bottom: 2px solid #1bdcba;

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
      color: #777e7d;
      width: 130px;
      display: flex;
      justify-content: space-between;
      text-align: justify;

      i {
        font-style: normal;
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
  border: 2px dashed #e2e5e5;
  padding: 30px 20px 20px 20px;
  margin-top: 40px;

  .form-item {
    .form-tit {
      width: 210px;
    }

    .form-unit {
      width: 50px;
      text-align: right;
      color: #777e7d;
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