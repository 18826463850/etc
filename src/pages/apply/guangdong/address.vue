<template>
  <div class="page page-address">
    <headNav> </headNav>
    <div class="main">
      <applySteps finishs="1,2" selected="3" listType = "guangdong"></applySteps>
      <div class="form-box">
        <div class="form-title">
          收货信息地址填写
        </div>

        <div class="form-group">

          <div class="form-item">
            <div class="form-tit">
              收货人
            </div>
            <div class="form-ipt">
              <input type="text" class="ipt" v-model="shippingInfo.shippingName" placeholder="收货人姓名" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-tit">
              手机号
            </div>
            <div class="form-ipt">
              <input type="text" class="ipt" v-model="shippingInfo.shippingMobile" placeholder="收货人手机号" />
            </div>
          </div>

          <!-- <div class="form-item">
            <div class="form-tit">
              短信验证码
            </div>
            <div class="form-ipt pnumber-ipt">
              <input type="text" v-model="shippingInfo.validCode" class="ipt" placeholder="手机短信验证码" />
              <div class="code" :class="{disabled:sending}" @click="sendCode">
                {{codeTxt}}
              </div>
            </div>
          </div> -->



          <div class="form-item">
            <div class="form-tit">
              选择地区
            </div>
            <div class="form-ipt" @click="togglePopup">

              <input type="text" class="ipt" v-model="shippingInfo.shippingPCA" readonly="readonly"
                placeholder="选择省 / 市 / 区" />
            </div>
          </div>

          <div class="form-item">
            <div class="form-tit">
              详情地址
            </div>
            <div class="form-ipt">
              <input type="text" class="ipt" v-model="shippingInfo.shippingAddress" maxlength="200"
                placeholder="街道门牌、楼层房间号等信息" />
            </div>
          </div>

        </div>

        <van-button type="primary" :loading="submiting" :disabled="btnDisabled" class="btn-default" @click="nextAction">下一步</van-button>
      </div>

    </div>

    <van-popup v-model="showAreaPopup" position="bottom" :lazy-render="false" get-container="body">
      <van-area ref="area" :showLoading="!areaListLoaded" :value="data.areaCode" :area-list="areaList"
        @confirm="onAreaConfirm" @cancel="showAreaPopup = false"></van-area>
    </van-popup>


  </div>
</template>

<script>
  import { isObj } from '@/vant/utils';
  import { Button, Popup, Picker, Area } from '@/vant';
  import areaList from '@/vant/area/demo/area';
  import addressEdit from '@/vant'
  import applySteps from '@/components/applySteps'
  import { tip, checkMobile, checkName, showLoading, hideLoading, checkValidCode, setTimer } from "@/utils"
  import {applyInfo,getCarInfo,getShippingInfo,getBankInfo,getApplyInfo,getShippingInfoDefaultVal} from '@/store/data/index';


  export default {
    name: "yunnan_address",
    components: {
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [addressEdit.name]: addressEdit,
      [Area.name]: Area,
      applySteps

    },
    data() {
 

      return {
        areaList,
        data: {
          country: "",
          province: "",
          city: "",
          county: "",
          areaCode: "",
        },
        showAreaPopup: false,

        showPopup: false,

        btnDisabled: true,

        shippingInfo: getShippingInfoDefaultVal(),

        codeTxt: "获取验证码",

        //是否正在请求中
        doing: false,

        //是否发送验证码中
        sending: false,

        //提交中
        submiting: false,

        //多少秒重新发送
        time: 60,

      };
    },

    created() {

      let applyId = this.$route.query.applyId;
      if (applyId) {
          this.applyId = applyId;
          this.loadData();
      }else{
        this.setLocalData();
      }

    },

    mounted() {

  
    },


    watch: {

      shippingInfo: {

        //特别注意，不能用箭头函数，箭头函数，this指向全局
        handler: function () {
          setTimeout(() => {
            this.checkIsSubmit();
          }, 100)
        },

        deep: true
      },

    },

    computed: {
      areaListLoaded() {
        return isObj(this.areaList) && Object.keys(this.areaList).length;
      },
    },

    methods: {


      //设置本地缓存数据
      setLocalData() {

        let carInfo = this.$store.state.carInfo;
        let applyInfo = this.$store.state.applyInfo;
        let localShippingInfo = this.$store.state.shippingInfo;

        this.shippingInfo = Object.assign({}, localShippingInfo, {
          applyId: applyInfo.id,
          carInfoId: carInfo.id
        });

        this.checkIsSubmit();

      },
      
      setShippingArea() {

        let addr = "";
        let shippingInfo = this.shippingInfo;
        const { country, province, city, county, areaCode } = this.data;

        if (areaCode) {
          addr = [province, city, county].join('/');


          Object.assign(shippingInfo, {

            //省份
            "shippingProvince": province,

            //城市
            "shippingCity": city,

            //收货人地区
            "shippingArea": county,

            //省市区组合
            "shippingPCA": addr,

          });

          this.shippingInfo = shippingInfo;

        }

      },

      //加载数据
      async loadData() {

        let res, data;
        let shippingInfo = this.shippingInfo;

        //清除本地申请信息
        this.$store.dispatch('clearApplyInfo');

        showLoading('加载中');
        res = await this.$api.getApplyInfo({
          applyId: this.applyId
        });
        data = res && res.data;

        hideLoading();

        if (data && data.code == 200 && data.data) {
          data = data.data;

          Object.assign(shippingInfo,getShippingInfo(shippingInfo));

          if(data.EtcShippingInfo){
            Object.assign(shippingInfo,getShippingInfo(data.EtcShippingInfo) );
          }

          if(data.EtcApplyInfo){
             this.$store.commit('setApplyInfo',getApplyInfo(data.EtcApplyInfo))
             shippingInfo.applyId = this.applyId;
          }

          if (data.EtcCarInfo) {
            this.$store.commit('setCarInfo',getCarInfo(data.EtcCarInfo));
            shippingInfo.carInfoId = data.EtcCarInfo.id;
          }

          this.shippingInfo = shippingInfo;
          
          this.$store.commit('setShippingInfo',shippingInfo);

 
          this.checkIsSubmit();

        }

      },


      //保存收货信息
      async saveShipping(addr) {

        let res, data;

        if (this.submiting) return;
        this.submiting = true;
        showLoading("保存中");
        res = await this.$api.addShippingInfoInGuangDong(addr);
        data = res && res.data;
        this.submiting = false;
        if (data && data.code == 200) {
          hideLoading();
          //this.go('/pay'  +(this.applyId ? '?applyId='+this.applyId:""));
          this.nextApplyStep();
        } else {
          tip(data && data.message || "保存失败")
        }

      },


      async sendCode() {

        let res, data;
        let mobile = this.shippingInfo.shippingMobile;

        if (this.sending) return;

        if (mobile == '') {
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
          this.codeTxt = "重新发送" + (this.time > 0 ? "(" + this.time + "s)" : "");
          if (this.time == 0) {
            clearInterval(timer);
            this.sending = false;
            this.time = 60;
          }
        };

        let timer = setInterval(() => {
          setCodeTxt()
        }, 1000);

        setCodeTxt();

        //发送验证码
        res = await this.$api.sendCodeInApply(mobile);
        data = res && res.data;

        if (data && data.code == 200) {
          if (data.data && /^\d{6}$/.test(data.data)) {
            this.shippingInfo.validCode = data.data;
          } else {
            tip("验证码已发送");
          }
        } else {
          tip(data && data.message || '验证码发送失败');
        }
      },


      nextAction() {
        let addr = this.shippingInfo;
        let user = this.$store.getx('user');  // 用户信息
        let applyInfo = this.$store.getx('applyInfo');
        console.log(addr);

        if (!addr.applyId) {
          tip("请先填写车主资料");
          return;
        }

        if (!addr.shippingName) {
          tip("请输入收货人姓名");
          return;
        }

        if (!checkName(addr.shippingName)) {
          tip("收货人姓名格式不正确");
          return;
        }

        if (!addr.shippingMobile) {
          tip("请输入手机号码");
          return;
        }

        if (!checkMobile(addr.shippingMobile)) {
          tip("手机号码格式不正确");
          return;
        }

        // if (!addr.validCode) {
        //   tip("请输入短信验证码");
        //   return;
        // }


        // if (!checkValidCode(addr.validCode)) {
        //   tip("短信验证码格式不正确");
        //   return;
        // }

        if (!addr.shippingPCA) {
          tip("请选择收货地区");
          return;
        }

        if (!addr.shippingAddress) {
          tip("请选择收详情地址");
          return;
        }
        //if(addr.carInfoId) delete addr.carInfoId;
        if (user.id) addr.loginUserId = user.id;
        if (applyInfo.niurunApplyId) addr.niurunApplyId = applyInfo.niurunApplyId;
        this.$store.commit("setShippingInfo", addr);
        this.saveShipping(addr);

      },


      checkIsSubmit() {

      setTimer("checkShipping", () => {
          
          let val;
          let disabled = false;
          let shippingInfo = this.shippingInfo;
          let unRqAttr = ['id'];

          for (let d in shippingInfo) {
            if (unRqAttr.indexOf(d) > -1) continue;

            if ((shippingInfo[d] + "").replace(/\s/g, '') === '') {
              disabled = true;
              console.log("empty key:"+d);
              break;
            }
          }

          console.log('disabled:'+disabled);
          this.btnDisabled = disabled;

        }, 300)

        this.saveShippingInfo();
      },

       //定时保存
      saveShippingInfo() {

        setTimer("shippingTimer", () => {
          this.$store.commit('setShippingInfo', this.shippingInfo);
        }, 300);
      },


      togglePopup() {
        this.showAreaPopup = !this.showAreaPopup;
      },

      onAreaConfirm(values) {
        this.showAreaPopup = false;
        this.assignAreaValues();
        this.$emit('change-area', values);
        this.setShippingArea();
      },

      assignAreaValues(values) {
        let detail;
        const { area } = this.$refs;
        if (area) {
          detail = area.getArea();
          detail.areaCode = detail.code;
          delete detail.code;

          Object.assign(this.data, detail);
        }
      },


    }
  };
</script>
<style lang="scss" scoped>
  .page-address {

    color: #384140;

    .main {
      padding: 40px;
    }

    .form-title {
      font-size: 36px;
      color: #1C110FFF;
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
        color: #382C2AFF;
        padding: 35px 0;
        margin-right: -40px;
        border-bottom: 1PX solid #F3EFEFFF;

        .form-tit {
          width: 160px;
          color: #6A7271
        }

        .form-ipt {
          flex: 1;
          margin-right: 40px;

          .ipt {
            width: 100%;
            font-size: 30px;
            padding: 0 20px;
            border: none;
          }

          &.pnumber-ipt {
            display: flex;
            .ipt{
              width: 100%;
            }

            .code {
              height: 100%;
              color: #EF7A49;
              min-width: 250px;
              text-align: right;

              &.disabled {
                color: #999
              }

            }
          }
        }
      }


    }

  }
</style>