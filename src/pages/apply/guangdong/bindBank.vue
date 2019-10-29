<template>
  <div class="page page-validbank">
    <headNav></headNav>
    <div class="main">
      <applySteps finishs="1,2,3" selected="4" listType="guangdong"></applySteps>

      <div class="form-box">
        <div class="form-title">银行卡绑定</div>

        <div class="form-group">
          <div class="form-item">
            <label class="form-tit">用户姓名</label>
            <div class="form-ipt">
              <input
                type="text"
                class="ipt"
                v-model="bankInfo.userName"
                placeholder="姓名（必填）"
                readonly="readonly"
              />
            </div>
          </div>

          <div class="form-item">
            <div class="form-tit">证件类型</div>
            <div class="form-ipt ipt-card-type">
              <input type="text" class="ipt" v-model="idCardType" readonly="readonly" />
            </div>
          </div>

          <div class="form-item">
            <div class="form-tit">证件号</div>
            <div class="form-ipt">
              <input
                type="text"
                class="ipt"
                placeholder="请输入身份证号"
                v-model="bankInfo.idCard"
                readonly="readonly"
              />
            </div>
          </div>

          <div class="form-item">
            <div class="form-tit">开卡行</div>
            <div class="form-ipt ipt-bank-type">
              <input class="ipt" v-model="bankName" readonly="readonly" @click="toggleBankPopup" />
              <div class="bank-tip">
                <img src="../../../assets/images/icon-down.png" />
              </div>
            </div>
          </div>

          <div class="form-item">
            <label class="form-tit">银行卡号</label>
            <div class="form-ipt">
              <input
                type="number"
                class="ipt"
                placeholder="请输入您的银行卡"
                v-model="bankInfo.needOpenAccount === 0 ?bankInfo.bankAccount : bankInfo.bankNo"
                v-bind:readonly="bankInfo.needOpenAccount === 0"
              />
            </div>
          </div>

          <div class="form-item" v-if="bankInfo.needOpenAccount !== 0">
            <label class="form-tit">银行预留手机</label>
            <div class="form-ipt">
              <input
                type="tel"
                maxlength="11"
                class="ipt"
                v-model="bankInfo.bankMobile"
                placeholder="请输入您的手机号"
              />
            </div>
          </div>

          <div class="form-item" v-if="bankInfo.needOpenAccount !== 0">
            <div class="form-tit">短信验证码</div>
            <div class="form-ipt pnumber-ipt">
              <input type="text" v-model="bankInfo.smsSendNo" class="ipt" placeholder="请输入验证码" />
              <div class="code" :class="{disabled:sending}" @click="sendCode">{{codeTxt}}</div>
            </div>
          </div>
        </div>
        <van-button
          type="primary"
          :loading="doing"
          :disabled="btnDisabled"
          class="btn-default"
          @click="submitForm"
        >绑定</van-button>
      </div>
    </div>

    <van-popup v-model="showPopup" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :default-index="bankInfo.idTypeIndex"
        :columns="idCardTypeList"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>

    <van-popup v-model="showBankPopup" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="bankList"
        @cancel="onBankCancel"
        @confirm="onBankConfirm"
        @change="onBankChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { isObj } from "@/vant/utils";
import { Button, Popup, Picker, Area, Dialog } from "@/vant";
import {
  tip,
  checkName,
  checkMobile,
  checkIdCard,
  showLoading,
  hideLoading,
  checkValidCode,
  checkBankNo,
  setTimer,
  deepClone
} from "@/utils";
import credentialsList from "@/core/credentialsList";
import applySteps from "@/components/applySteps";
import { getBankInfo } from "@/store/data/index";
import Store from "store";

export default {
  name: "bindBank",

  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    applySteps
  },
  data() {
    let idCardTypeList = [];
    let localBankInfo = this.$store.getx("bankInfo");
    let applyInfo = this.$store.getx("applyInfo");
    for (let d of credentialsList) {
      idCardTypeList.push(d.name);
    }

    let bankList = [
      "中国工商银行",
      "中国农业银行",
      "中国银行",
      "中国建设银行",
      "中国交通银行",
      "中国邮政储蓄银行"
    ];

    return {
      showPopup: false,
      showBankPopup: false,
      cardType: "",
      bankType: "ICBC",
      bankName: "中国工商银行",
      idCardTypeList: idCardTypeList,
      bankList: bankList,
      bankCodeList: ["ICBC", "ABC", "BOC", "CCB", "BCOM", "PSBC"],
      bankInfo: localBankInfo,
      bankInfo_bk: {},
      doing: false,
      btnDisabled: true,
      loading: false,
      idCardType: "身份证",
      codeTxt: "获取验证码",
      applyInfo: applyInfo,
      //是否正在请求中
      doing: false,
      //是否发送验证码中
      sending: false,
      //提交中
      submiting: false,
      //多少秒重新发送
      time: 60
    };
  },

  created() {
    let applyInfo = this.$store.getx("applyInfo");
    let bankInfo = this.$store.getx("bankInfo");
    this.applyId = this.$route.query.applyId;

    if (this.applyId) {
      this.loadData();
    } else {
      this.loadDataByStore();
    }
  },

  mounted() {
    this.checkIsSubmit();
  },

  watch: {
    bankInfo: {
      //特别注意，不能用箭头函数，箭头函数，this指向全局
      handler: function() {
        setTimeout(() => {
          this.checkIsSubmit();
        }, 100);

        this.saveBankInfo();
      },
      deep: true
    }
  },

  methods: {
    //判断银行信息是否已经更改
    checkBankInfoIsUpdate() {
      let hadUpdate = false;
      let bankInfo = this.bankInfo;
      let bankInfo_kb = this.bankInfo_kb;

      for (let d in bankInfo) {
        if (bankInfo_kb[d] != bankInfo[d]) {
          hadUpdate = true;
          break;
        }
      }
      return hadUpadte;
    },

    //加载数据回调函数
    loadDataCallback() {
      //判断当前是否有id 有id则拷贝一个副部
      if (this.bankInfo.id) {
        this.bankInfo_bk = deepClone(this.bankInfo);
      }
    },

    //通过缓存加载数据
    loadDataByStore() {
      let localBankInfo = this.$store.getx("bankInfo");
      let applyInfo = this.$store.getx("applyInfo");
      this.bankInfo = Object.assign(localBankInfo, {
        applyId: applyInfo.id,
        bankMobile: localBankInfo.bankMobile || applyInfo.mobile,
        userName: localBankInfo.userName || applyInfo.applyInfoName,
        idAddress: applyInfo.address,
        idCard: applyInfo.idCard,
        idCardType: applyInfo.idType,
        idEffDate: applyInfo.idEffDate,
        idExpDate: applyInfo.idExpDate
      });

      this.bankInfo.idCardType = applyInfo.idType;
      console.log("====================================");
      console.log(applyInfo.idType);
      console.log("====================================");

      console.log(localBankInfo.bankMobile || applyInfo.mobile);
      this.loadDataCallback();
    },

    //加载数据
    async loadData() {
      let res, data, applyInfo;

      let bankInfo = {};

      //清除本地数据
      this.$store.dispatch("clearApplyInfo");
      showLoading("加载中");

      res = await this.$api.getApplyInfo({
        applyId: this.applyId
      });
      data = res && res.data;

      hideLoading();
      console.log(data);
      if (data && data.code == 200 && data.data) {
        data = data.data;

        if (data.EtcBankCardInfo) {
          bankInfo = getBankInfo(data.EtcBankCardInfo);
        }

        if (data.EtcApplyInfo) {
          applyInfo = data.EtcApplyInfo;
          Object.assign(bankInfo, {
            applyUserId: applyInfo.id
          });
        }

        if (data.EtcApplyInfo) {
          applyInfo = data.EtcApplyInfo;

          Object.assign(bankInfo, {
            applyId: applyInfo.id,
            bankMobile: bankInfo.bankMobile || applyInfo.mobile,
            userName: bankInfo.userName || applyInfo.applyInfoName,
            idAddress: applyInfo.address,
            idCard: applyInfo.idCard,
            idCardType: applyInfo.idType,
            idEffDate: applyInfo.idEffDate,
            idExpDate: applyInfo.idExpDate
          });

          bankInfo.idCardType = applyInfo.idCardType;
        }

        this.bankInfo = bankInfo;
        this.loadDataCallback();
      }
    },

    //提交表单
    async submitForm() {
      let res, data, code, bankInfo;
      let user = this.$store.getx("user"); // 用户信息
      if (this.doing) return;

      bankInfo = this.bankInfo;
      bankInfo.otherApplyId = this.applyInfo.otherApplyId;
      bankInfo.applyId = this.applyInfo.niurunApplyId;
      bankInfo.loginUserId = user.id;

      if (!bankInfo.applyId) {
        tip("请先填写车主资料");
        return;
      }

      // if (!bankInfo.userName) {
      //   tip("请输入用户姓名");
      //   return;
      // }

      // if (!checkName(bankInfo.userName)) {
      //   tip('您的姓名格式不正确');
      //   return;
      // }

      // if (!bankInfo.idCard) {
      //   tip("请输入身份证号");
      //   return;
      // }

      // if (!checkIdCard(bankInfo.idCard)) {
      //   tip("您的身份证号码格式不正确");
      //   return;
      // }

      if (!bankInfo.bankMobile) {
        tip("请输入银行预留手机号");
        return;
      }

      if (!checkMobile(bankInfo.bankMobile)) {
        tip("手机格式不正确");
        return;
      }

      if (bankInfo.needOpenAccount !== 0) {
        if (!bankInfo.bankNo) {
          tip("请输入您的银行卡号");
          return;
        }
        if (!checkBankNo(bankInfo.bankNo)) {
          tip("银行卡号格式不正确");
          return;
        }
      }

      //工商银行id
      bankInfo.bankCode = this.bankType;
      bankInfo.bankName = this.bankName;

      this.doing = true;
      this.$store.commit("setBankInfo", bankInfo);

      showLoading("绑定中");
      res = await this.$api.bindAccountGuangDong(bankInfo);
      data = res && res.data;
      code = res && data && data.code;
      this.doing = false;
      hideLoading();
      if (code == 200 && data.data) {
        //this.nextApplyStep(data.data.url ? '?protocol='+data.data.url:"");
        this.$store.dispatch("clearApplyInfo");
        // this.go('/pay'  +(this.applyId ? '?applyId='+this.applyId:""));
        this.go("/submitsuccess");
        console.log(data);
      } else {
        tip((data && data.message) || "绑定失败");
      }
    },

    //缓存
    saveBankInfo() {
      setTimer("bankInfoTimer", () => {
        let applyInfo = this.$store.getx("applyInfo");

        if (applyInfo.idCardNo != this.bankInfo.idCard) {
          applyInfo.idCardNo = this.bankInfo.idCard;
          this.$store.commit("setApplyInfo", applyInfo);
        }
        this.$store.commit("setBankInfo", this.bankInfo);
      });
    },

    //检查是否可以提交
    checkIsSubmit() {
      let disabled = false;
      let bankInfo = this.bankInfo;
      let required = ["bankMobile"];

      for (let d in bankInfo) {
        if (
          required.indexOf(d) > -1 &&
          (bankInfo[d] + "").replace(/\s/g, "") === ""
        ) {
          disabled = true;
          break;
        }
      }
      this.btnDisabled = disabled;
    },

    togglePopup() {
      this.showPopup = !this.showPopup;
    },

    toggleBankPopup() {
      if (this.bankInfo.needOpenAccount !== 0) {
        this.showBankPopup = !this.showBankPopup;
      }
    },

    onCancel() {
      this.togglePopup();
    },

    onBankCancel() {
      this.toggleBankPopup();
    },

    onConfirm(val) {
      this.cardType = val;
      this.togglePopup();
    },

    onBankConfirm(picker, val) {
      this.bankName = this.bankList[val];
      this.bankType = this.bankCodeList[val];
      this.toggleBankPopup();
    },

    onChange(com, val) {
      console.log("当前变化值：" + val);
    },

    onBankChange(com, val) {
      console.log("当前变化值：" + val);
    },

    async sendCode() {
      let res, data, code, bankInfo;

      if (this.sending) return;

      bankInfo = this.bankInfo;

      if (!bankInfo.applyId) {
        tip("请先填写车主资料");
        return;
      }

      // if (!bankInfo.userName) {
      //   tip("请输入用户姓名");
      //   return;
      // }

      // if (!checkName(bankInfo.userName)) {
      //   tip('您的姓名格式不正确');
      //   return;
      // }

      // if (!bankInfo.idCard) {
      //   tip("请输入身份证号");
      //   return;
      // }

      // if (!checkIdCard(bankInfo.idCard)) {
      //   tip("您的身份证号码格式不正确");
      //   return;
      // }

      if (!bankInfo.bankMobile) {
        tip("请输入银行预留手机号");
        return;
      }

      if (!checkMobile(bankInfo.bankMobile)) {
        tip("手机格式不正确");
        return;
      }

      if (!bankInfo.bankNo) {
        tip("请输入您的银行卡号");
        return;
      }

      if (!checkBankNo(bankInfo.bankNo)) {
        tip("银行卡号格式不正确");
        return;
      }

      //工商银行id
      bankInfo.bankCode = this.bankType;
      bankInfo.bankName = this.bankName;
      bankInfo.applyId = this.applyInfo.niurunApplyId;
      bankInfo.idAddress = this.applyInfo.idAddress;

      this.sending = true;
      let setCodeTxt = () => {
        this.time--;
        this.codeTxt =
          "重新发送" + (this.time > 0 ? "(" + this.time + "s)" : "");
        if (this.time == 0) {
          clearInterval(timer);
          this.sending = false;
          this.time = 60;
        }
      };

      let timer = setInterval(() => {
        setCodeTxt();
      }, 1000);

      setCodeTxt();

      //发送验证码
      res = await this.$api.openAccountGuangDong(bankInfo);
      data = res && res.data;
      code = res && data && data.code;
      this.doing = false;

      if (code == 200 && data.data) {
        if (data.data && /^\d{6}$/.test(data.data)) {
          this.bankInfo.smsSendNo = data.data;
        } else {
          this.bankInfo.id = data.data.bankCardId;
          if (data.data.corpSerno) {
            this.bankInfo.corpSerno = data.data.corpSerno;
          }
          tip("验证码已发送");
        }
        this.$store.commit("setBankInfo", this.bankInfo);
        console.log(data);
      } else {
        this.$store.commit("setBankInfo", this.bankInfo);
        tip((data && data.message) || "验证码发送失败");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-validbank {
  .main {
    padding: 40px;
  }

  .form-title {
    font-size: 36px;
    color: #1c110fff;
    margin-bottom: 20px;
  }

  .form-box {
    padding: 40px 0 0 0;

    .btn-default {
      margin-top: 50px;
    }

    .form-item {
      display: flex;
      font-size: 30px;
      color: #382c2aff;
      padding: 35px 0;
      margin-right: -40px;
      border-bottom: 1px solid #f3efefff;

      .form-tit {
        width: 200px;
        min-width: 200px;
      }

      .form-ipt {
        flex: 1;
        display: flex;
        margin-right: 40px;

        &.ipt-bank-type {
          position: relative;
          display: flex;
          justify-content: space-between;

          .bank-tip {
            width: 22px;
            height: 14px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        &.ipt-card-type {
          .icon-box {
            width: 40px;
            display: flex;

            .icon-down {
              width: 0;
              height: 0;
              border-left: 16px solid transparent;
              border-right: 16px solid transparent;
              border-top: 16px solid #dae3e1;
              margin: auto;
            }
          }
        }

        .ipt {
          flex: 1;
          font-size: 30px;
          padding: 0 20px;
          border: none;
        }

        &.pnumber-ipt {
          display: flex;

          .ipt {
            width: 100%;
          }

          .code {
            height: 100%;
            color: #ef7a49;
            min-width: 2.5rem;
            text-align: right;

            &.disabled {
              color: #999;
            }
          }
        }
      }

      &.item-wrap {
        flex-direction: column;

        .form-tit {
          width: 100%;
          margin-bottom: 16px;
        }

        .form-ipt {
          .ipt {
            padding: 0 0px;
          }
        }
      }
    }
  }
}
</style>