<template>
  <div class="page page-applicant">
    <headNav></headNav>
    <div class="main">
      <applySteps finishs selected="1"></applySteps>

      <div class="form-upload">
        <div class="tit">申请人用户信息详情</div>
        <div class="tit-s">上传身份证（上传图片自动识别填写信息）</div>
        <div class="upload-boxes">
          <uploadImg :imgUrl.sync="applyInfo.idCardRightImg" title="上传身份证正面" class="upload-photo"></uploadImg>
          <uploadImg :imgUrl.sync="applyInfo.idCardWrongImg" title="上传身份证反面" class="upload-photo"></uploadImg>
        </div>
      </div>

      <div class="form-box">
        <div class="form-item">
          <div class="form-tit">用户姓名</div>
          <div class="form-ipt">
            <input type="text" placeholder="请输入用户姓名" v-model="applyInfo.applyInfoName" />
          </div>
        </div>

        <div class="form-item">
          <div class="form-tit">证件类型</div>
          <div class="form-ipt ipt-card-type">
            <input
              type="text"
              readonly="readonly"
              v-model="applyInfo.idTypeName"
              placeholder="请选择证件类型"
            />
            <div class="icon-box">
              <!-- <div class="icon-down"></div> -->
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="form-tit">证件号码</div>
          <div class="form-ipt">
            <input type="text" placeholder="请输入证件号码" v-model="applyInfo.idCard" />
          </div>
        </div>

        <div class="form-item">
          <div class="form-tit">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</div>
          <div class="form-ipt">
            <input type="text" placeholder="请输入地址" v-model="applyInfo.address" />
          </div>
        </div>

        <div class="form-item">
          <div class="form-tit">手机号码</div>
          <div class="form-ipt">
            <input type="tel" placeholder="请输入手机号码" v-model="applyInfo.mobile" />
          </div>
        </div>
      </div>

      <div class="btn-box">
        <van-button
          type="primary"
          class="btn-default"
          :disabled="btnDisabled"
          @click="nextAction"
        >下一步</van-button>
      </div>
    </div>

    <van-popup v-model="showIdCardPopup" position="bottom" :overlay="true">
      <van-picker
        :default-index="applyInfo.idTypeIndex"
        show-toolbar
        :columns="idCardTypeList"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onIdCardTypeChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { Button, Popup, Picker, Area, addressEdit } from "@/vant";
import {
  checkName,
  checkMobile,
  checkIdCard,
  checkPassport,
  checkValidCode,
  tip,
  showLoading,
  hideLoading,
  setTimer
} from "@/utils";
import credentialsList from "@/core/credentialsList";
import applySteps from "@/components/applySteps";
import { isObj } from "@/vant/utils";
import areaList from "@/vant/area/demo/area";

export default {
  name: "applicant",
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Area.name]: Area,
    applySteps
  },

  computed: {
    areaListLoaded() {
      return isObj(this.areaList) && Object.keys(this.areaList).length;
    }
  },

  data() {
    let idCardTypeList = [];
    let localApplyInfo = this.$store.getx("applyInfo") || {};
    let localShippingInfo = this.$store.getx("shippingInfo") || {};
    let mobile = this.$store.state.user.mobile;
    let applyInfo = Object.assign(
      {
        applyInfoName: "",
        idCard: "",
        idCardRightImg: "",
        idCardWrongImg: "",
        idType: "",
        idTypeName: "",
        idTypeIndex: "",
        mobile: ""
      },
      localApplyInfo
    );

    if (!applyInfo.idTypeName) {
      applyInfo.idTypeName = "身份证";
    }

    if (!applyInfo.mobile) {
      applyInfo.mobile = mobile;
    }

    for (let d of credentialsList) {
      idCardTypeList.push(d.name);
    }

    this.setIdCardInfo(applyInfo);

    console.log(applyInfo);

    return {
      cardType: "",

      showIdCardPopup: false,

      idCardTypeList: idCardTypeList,

      //提交是否可以
      btnDisabled: true,

      applyInfo: applyInfo,

      areaList: areaList,

      data: {
        country: "",
        province: "",
        city: "",
        county: "",
        areaCode: ""
      },
      showAreaPopup: false,
      showPopup: false,
      btnDisabled: true,

      codeTxt: "获取验证码",

      //是否正在请求中
      doing: false,

      //是否发送验证码中
      sending: false,

      //多少秒重新发送
      time: 60,

      //云南服务端是否已登录
      yunnanServerLogin: false,

      //卡id
      catId: ""
    };
  },
  watch: {
    applyInfo: {
      //特别注意，不能用箭头函数，箭头函数，this指向全局
      handler: function() {
        setTimeout(() => {
          this.checkIsSubmit();
        }, 100);

        this.saveApplyInfo();
      },

      deep: true
    },

    cardType(v) {
      if (v == "身份证") {
        this.applyInfo.idType = 0;
      } else if (v == "护照") {
        this.applyInfo.idType = 1;
      }
    },

    ["applyInfo.idCard"](v) {
      this.applyInfo.idCardNo = v;
    },

    async ["applyInfo.idCardRightImg"](v) {
      console.log(v);

      if (v) {
        this.ocrIdCard(v);
      }
    }
  },

  mounted: function() {
    this.goYunnanServerLogin();
    this.checkIsSubmit();

    console.log("obuId:" + this.applyInfo.obuId);
  },

  methods: {
    //身份证识别
    async ocrIdCard(image) {
      let res, data;
      let applyInfo = this.applyInfo;

      showLoading("识别中");

      res = await this.$api.ocrIdcard({
        image: image,
        side: "face"
      });

      hideLoading();

      if (
        res &&
        res.data &&
        typeof res.data.data == "object" &&
        res.data.data != null
      ) {
        data = res.data.data;

        Object.assign(applyInfo, {
          applyInfoName: data.name,
          idTypeName: "身份证",
          idCard: data.num,
          idCardNo: data.num,
          address: data.address
        });

        this.setIdCardInfo(applyInfo);
      } else {
        tip("图片识别失败");
      }
    },

    //云南服务端登录
    async goYunnanServerLogin() {
      let data;
      let user = this.$store.state.user;
      let openId = user.openid;
      // openId = "ogu3M1UlIzEXQG-y4ivPcuLai5Xs";
      if (this.yunnanServerLogin) return;

      if (!openId) {
        tip({
          title: "云南申请必须微信登录",
          time: 2000,
          close: () => {
            let redirectUri =
              "?redirect_uri=" +
              window.location.href.replace(
                new RegExp("^" + window.location.origin, "g"),
                ""
              );
            redirectUri += "&mode=3";
            this.$router.replace({ path: "/login" + redirectUri });
          }
        });
        return;
      }

      data = await this.$api.loginByWxInYunNan({ openId: user.mobile });
      data = data && data.data;

      if (data && data.code == 200 && data.data && data.data.code == "000000") {
        this.yunnanServerLogin = true;
        this.$store.commit("setUser", {
          yunnanServerLogin: true
        });

        this.getObuId();
      }
    },

    // 获取obuId
    async getObuId() {
      if (this.applyInfo.obuId) return;

      showLoading("正在连接...");

      let data = await this.$api.getObuIdInYunNan();

      hideLoading();

      data = data && data.data;

      if (
        data &&
        data.code == 200 &&
        data.data &&
        data.data.data &&
        data.data.data.applyId
      ) {
        this.applyInfo.obuId = data.data.data.applyId;
        console.log(this.applyInfo.obuId);
      } else {
        tip("连接失败");
      }
    },

    saveApplyInfo() {
      setTimer("applyInfoTimer", () => {
        this.$store.commit("setApplyInfo", this.applyInfo);
      });
    },

    saveShippingInfo() {
      setTimer("shippingInfoTimer", () => {
        this.$store.commit("setShippingInfo", this.shippingInfo);
      });
    },

    setIdCardInfo(applyInfo) {
      if (!applyInfo) {
        applyInfo = this.applyInfo;
      }
      let idTypeName = applyInfo.idTypeName;

      for (let i = 0; i < credentialsList.length; i++) {
        let d = credentialsList[i];
        if (d.name == idTypeName) {
          applyInfo.idTypeIndex = i;
          applyInfo.idType = d.value;
        }
      }
    },

    setShippingArea() {
      let addr = "",
        arr;
      const { country, province, city, county, areaCode } = this.data;

      if (areaCode) {
        arr = [country, province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        addr = arr.filter(text => text).join("/");
      }

      this.shippingInfo.shippingArea = addr;
    },

    //检查是否可以提交
    checkIsSubmit() {
      let disabled = false;
      let applyInfo = this.applyInfo;
      let required = "applyInfoName,idCardRightImg,idCardWrongImg,idCard,mobile,address".split(
        ","
      );
      for (let d in applyInfo) {
        if (
          required.indexOf(d) > -1 &&
          (applyInfo[d] + "").replace(/\s/g, "") === ""
        ) {
          disabled = true;
          break;
        }
      }

      this.btnDisabled = disabled;
    },

    //发送验证码
    async sendCode() {
      let mobile = this.shippingInfo.shippingMobile;

      if (this.sending) return;

      if (mobile == "") {
        tip("请输入手机号码");
        return;
      }

      if (!checkMobile(mobile)) {
        tip("手机号码格式不正确");
        return;
      }

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
      let { data } = await this.$api.sendCodeInApply(mobile);

      if (data && data.code == 200) {
        tip("验证码已发送");
      } else {
        tip(data.message || "验证码发送失败");
      }
    },

    toggleIdCardPopup() {
      this.showIdCardPopup = !this.showIdCardPopup;
    },

    toggleAreaPopup() {
      this.showAreaPopup = !this.showAreaPopup;
    },

    onCancel() {
      this.toggleIdCardPopup();
    },

    onConfirm(val, index) {
      this.applyInfo.idTypeName = val;
      this.setIdCardInfo();
      this.toggleIdCardPopup();
    },

    onIdCardTypeChange(com, val) {
      this.applyInfo.idCard = "";
    },

    //下一步
    nextAction() {
      let applyInfo = this.applyInfo;
      let catId = this.$store.state.catId;
      let bankCardInfo = this.$store.getx("bankCardInfo");  // 信用卡申请信息
      this.catId = catId;

      if (!this.yunnanServerLogin) {
        tip("云南服务端登录失败");
        this.goYunnanServerLogin();
        return;
      }

      if (!catId) {
        tip("请先选择卡类型");
        return;
      }

      if (!applyInfo.idCardRightImg) {
        tip("上传身份证正面照片");
        return;
      }

      if (!applyInfo.idCardWrongImg) {
        tip("上传身份证反面照片");
        return;
      }

      if (!applyInfo.applyInfoName) {
        tip("请输入用户姓名");
        return;
      }

      if (!checkName(applyInfo.applyInfoName)) {
        tip("您的姓名格式不正确");
        return;
      }

      if (!applyInfo.idType) {
        tip("请选择证件类型");
        return;
      }

      if (!applyInfo.idCard) {
        tip("请输入证件号码");
        return;
      }

      //身份证
      if (applyInfo.idTypeName == "身份证") {
        if (!checkIdCard(applyInfo.idCard)) {
          tip("您的身份证号码格式不正确");
          return;
        }
      }

      //护照
      else if (applyInfo.idTypeName == "护照") {
        if (!checkPassport(applyInfo.idCard)) {
          tip("您的护照号码格式不正确");
          return;
        }
      } else {
        if (!/[a-zA-Z0-9]{5,30}/.test(applyInfo.idCard)) {
          tip("您的证件号码格式不正确");
          return;
        }
      }

      if (!applyInfo.address) {
        tip("请输入身份证地址");
        return;
      }

      if (!applyInfo.mobile) {
        tip("请输入手机号码");
        return;
      }

      if (!checkMobile(applyInfo.mobile)) {
        tip("您的手机号码格式不正确");
        return;
      }

      if (applyInfo.address.length > 100) {
        tip("身份证地址不能大于100个字符");
        return;
      }

      if (!applyInfo.obuId) {
        this.getObuId();
        return;
      }

      //固定身份证类型
      applyInfo.idType = "101";

      //本地缓存
      this.$store.commit("setApplyInfo", applyInfo);

      //this.saveYnApplyInfo();
      this.nextApplyStep();
    },

    //保存云南申请信息
    async saveYnApplyInfo() {
      let result, data, datas;

      showLoading("保存中...");
      // 申办渠道 ：1传统渠道，2信用卡渠道
      this.applyInfo.apply_channel = 2;
      // 申办的信用卡：1交通银行信用卡，2表示***银行卡信用卡
      this.applyInfo.apply_creditcard = 1;
      // 申请信用卡流水账号
      this.applyInfo.serialnum = bankCardInfo.serialnum;
      datas = {
        catId: this.catId,
        etcYnApplyInfoVO: this.applyInfo
      };

      result = await this.$api.saveApplyInfoInYunNan(datas);

      data = result && result.data;

      hideLoading();

      if (data && data.code == 200) {
      }

      console.log(data);
    },

    onAreaConfirm(values) {
      this.showAreaPopup = false;
      this.assignAreaValues();
      this.$emit("change-area", values);
      this.setShippingArea();
    },

    assignAreaValues(values) {
      const { area } = this.$refs;
      if (area) {
        const detail = area.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        console.log(detail);
        Object.assign(this.data, detail);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-applicant {
  padding-bottom: 100px;

  .main {
    padding: 40px;
  }

  .form-title {
    font-size: 40px;
    padding: 30px 0 10px 0;
    margin-top: 20px;
  }

  .form-upload {
    margin: 40px 0 0px 0;

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

  .upload-photo {
    margin-bottom: 40px;
  }

  .upload-boxes {
    display: flex;
    justify-content: space-between;
  }

  .form-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 35px 30px 35px 0;
    margin-right: -40px;

    .form-tit {
      width: 180px;
      color: #384140;
      font-size: 30px;
      flex-shrink: 0;
    }

    .form-ipt {
      flex: 1;
      display: flex;

      input {
        width: 100%;
        border: none;
        font-size: 30px;
        flex-shrink: 1;
      }

      &.pnumber-ipt {
        display: flex;

        .code {
          height: 100%;
          color: #ef7a49;
          width: 250px;
          text-align: right;
          flex-shrink: 0;

          &.disabled {
            color: #999;
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
    }
  }

  .label-input2 {
    position: relative;

    .label {
      padding: 40px 0;
      font-size: 30px;
      line-height: 42px;
      font-weight: normal;
      color: #6a615f;
    }

    .none {
      display: none;
    }
  }

  .btn-box {
    margin-top: 80px;
  }
}
</style>