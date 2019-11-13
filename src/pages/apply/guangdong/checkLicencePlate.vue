<template>
  <div class="page page-checklplate">
    <headNav></headNav>
    <div class="main">
      <div class="form-box">
        <div class="brick">
          <div class="tit">输入办理ETC的车牌号</div>
          <div class="ctc">
            <keyboard
              :licencePlate.sync="carInfo.licencePlate"
              :licencePlateArr.sync="carInfo.licencePlateArr"
              @change="onKbChange"
            ></keyboard>
            <div class="num-tip">交通部规定，1辆车仅允许办理1张ETC卡，专车专用</div>
          </div>
        </div>

        <div class="brick">
          <div class="tit">选择车牌类型</div>
          <div class="ctc">
            <div class="car-type">
              <div
                class="item t-blue"
                :class="{active:carInfo.licencePlateType=='0'}"
                @click="selectCarType('0')"
              >蓝牌</div>
              <div
                class="item t-green"
                :class="{active:carInfo.licencePlateType=='4'}"
                @click="selectCarType('4')"
              >绿牌</div>
            </div>
          </div>
        </div>

        <van-button
          type="primary"
          class="btn-default"
          :disabled="btnDisabled"
          @click="nextAction"
          :loading="doing"
        >一键办理</van-button>
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

    if (carInfo.licencePlateType == 3 || carInfo.licencePlateType == 11) {
      carInfo.licencePlateType = 4;
    }

    if (!carInfo.licencePlateArr) {
      carInfo.licencePlateArr = [];
    }

    if (carInfo.licencePlateArr) {
      //默认广东
      // if(carInfo.licencePlateArr.length == 0){
      //   carInfo.licencePlateArr[0] = '粤'
      // }
      carInfo.licencePlate = carInfo.licencePlateArr.join("");
    }

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
      this.carInfo.licencePlateType = v.length == 8 ? 4 : 0;
    },

    ["carInfo.licencePlate"](v) {
      this.licencePlate = v;
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

    this.checkIsSubmit();
  },
  methods: {
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

    //检查是否可以提交
    checkIsSubmit() {
      let disabled = true;
      let carInfo = this.carInfo;
      let licencePlate = carInfo.licencePlate;

      if (licencePlate) {
        disabled = !(licencePlate.length == 7 || licencePlate.length == 8);
      }

      this.btnDisabled = disabled;
    },

    selectCarType(carType) {
      if (this.carInfo.licencePlate.length == 8) {
        this.carInfo.licencePlateType = 4;
      } else {
        this.carInfo.licencePlateType = 0;
      }
    },

    async nextAction() {
      let res, data;
      let carInfo = this.carInfo;
      let cardInfo = this.$store.getx("cardInfo");
      let catId = cardInfo.id;

      if (!carInfo.licencePlate) {
        tip("请输入车牌号");
        return;
      }

      if (!checkLicencePlate(carInfo.licencePlate)) {
        tip("车牌号码格式不正确");
        return;
      }

      showLoading("请稍等");

      // res = await this.$api.queryIssue({
      //   plateColor: carInfo.licencePlateType,
      //   plateNo: carInfo.licencePlate
      // });

      // data = res && res.data;

      hideLoading();

      //if (data && data.code == 200 && data.status) {
      this.$store.commit("setCarInfo", carInfo);
      this.nextApplyStep();
      // } else {
      //   tip((data && data.message) || "检测失败");
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-checklplate {
  background: #fff;

  .main {
    padding: 30px;
  }

  .btn-default {
    margin-top: 100px;
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

  .brick {
    color: #384140;
    font-size: 30px;
    margin-bottom: 30px;

    .tit {
      margin-bottom: 20px;
      font-size: 30px;
    }

    .num-tip {
      display: flex;
      align-items: center;
      color: #cfd6d6;
      font-size: 24px;
      margin-top: 25px;
    }
  }
}

.form-box {
  padding: 20px 0 40px 0;
}
</style>