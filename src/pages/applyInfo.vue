<template>
  <div class="page page-applyInfo">
    <headNav></headNav>
    <div class="main">
      <div class="brick">
        <div class="tit">申请人资料</div>
        <div class="box">
          <p>姓名：{{applyInfo.applyInfoName}}</p>
          <p>证件类型：身份证</p>
          <p>证件号码：{{applyInfo.idCard}}</p>
          <p>手机号：{{applyInfo.mobile}}</p>
        </div>
      </div>

      <div class="brick">
        <div class="tit">车辆资料</div>
        <div class="box">
          <p>车牌号码：{{carInfo.licencePlate}}</p>
          <p>车牌类型：{{carInfo.carUseType == '0'? '蓝牌':'绿牌'}}</p>

          <p>车辆所有人：{{carInfo.carOwner}}</p>
        </div>
      </div>

      <div class="brick" v-if="bankInfo">
        <div class="tit">银行卡信息</div>
        <div class="box">
          <p>所有人姓名：{{bankInfo.userName}}</p>
          <p>证件类型：身份证</p>
          <p>证件号码：{{bankInfo.idCard}}</p>
          <p>银行卡号：{{bankInfo.bankNo}}</p>

          <p>银行预留手机号：{{bankInfo.bankMobile}}</p>
          <!-- <p>
            状态：已绑定
          </p>-->
        </div>
      </div>

      <div class="brick">
        <div class="tit">收货地址</div>
        <div class="box">
          <p>收货人姓名：{{shippingInfo.shippingName}}</p>
          <p>手机号：{{shippingInfo.shippingMobile}}</p>
          <p>地区：{{shippingInfo.shippingProvince}}{{shippingInfo.shippingCity}}{{shippingInfo.shippingArea}}</p>
          <p>详细地址：{{shippingInfo.shippingAddress}}</p>
        </div>
      </div>

      <div class="brick">
        <div class="tit">支付押金</div>
        <div class="box">
          <p>金额：{{orderAmount}}元</p>
          <p>状态：{{applyInfo.depositStatusTxt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Popup } from "@/vant";
import { tip, showLoading, hideLoading } from "@/utils";
import {
  getApplyInfoDefaultVal,
  getBankInfoDefaultVal,
  getCarInfoDefaultVal,
  getShippingInfoDefaultVal
} from "@/store/data/index";

export default {
  name: "login",
  components: {},
  data() {
    return {
      applyInfo: {},
      carInfo: {},
      bankInfo: null,
      shippingInfo: {},
      orderAmount: 0
    };
  },

  created() {
    this.applyId = this.$route.query.applyId;
    if (this.applyId) {
      this.loadData();
    }
  },

  mounted() {},

  methods: {
    //加载数据
    async loadData() {
      let res, data, applyInfo, status;

      let statusList = {
        "0": "已支付",
        "1": "已退还",
        "2": "退还中"
      };

      showLoading("加载中");

      res = await this.$api.getApplyInfo({
        applyId: this.applyId
      });
      data = res && res.data;

      hideLoading();
      console.log(data);

      if (data && data.code == 200 && data.data) {
        data = data.data;
        applyInfo = data.EtcApplyInfo;

        if (data.EtcApplyInfo) {
          status = applyInfo.depositStatus;
          applyInfo.depositStatusTxt = statusList[status]
            ? statusList[status]
            : "未支付";
          this.applyInfo = data.EtcApplyInfo;
          this.carInfo = data.EtcCarInfo;
          this.bankInfo = data.EtcBankCardInfo;
          this.shippingInfo = data.EtcShippingInfo;

          if (data.orderAmount) {
            this.orderAmount = data.orderAmount / 100;
          }
        } else {
          tip((data && data.message) || "数据加载失败");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-applyInfo {
  color: #384140;

  .main {
    padding: 40px;
  }

  .brick {
    margin-bottom: 50px;

    .tit {
      margin-bottom: 20px;
      font-weight: bold;
    }

    .box {
      border: 2px dashed #ccc;
      padding: 30px 20px 20px 20px;
      line-height: 1.75em;
    }
  }
}
</style>