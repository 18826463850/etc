<template>
  <div class="page page-validbank">
    <headNav> </headNav>
    <div class="main">
      <applySteps finishs="1,2" selected="3"></applySteps>

      <div class="form-box">
        <div class="form-title">
          银行卡绑定
        </div>

        <div class="form-group">
          <!-- <div class="form-item">
            <label class="form-tit">
              用户姓名
            </label>
            <div class="form-ipt">
              <input type="text" class="ipt" v-model="bankInfo.userName" placeholder="姓名（必填）" />
            </div>
          </div> -->

          <!-- <div class="form-item">
              <div class="form-tit">
                证件类型
              </div>
              <div class="form-ipt ipt-card-type" >
                <input type="text" class="ipt"  v-model="bankInfo.idCardTypeName"  readonly="readonly"  placeholder="请选择证件类型" />
                   <div class="icon-box"> <div class="icon-down"></div></div>
              </div>
            </div> -->

          <!-- <div class="form-item">
            <div class="form-tit">
              身份证号
            </div>
            <div class="form-ipt">
              <input type="text" class="ipt" placeholder="请输入身份证号" v-model="bankInfo.idCard" />
            </div>
          </div> -->


          <div class="form-item item-wrap">
            <label class="form-tit">
              银行预留手机号
            </label>
            <div class="form-ipt">
              <input type="tel" maxlength="11" class="ipt" v-model="bankInfo.userPhone" placeholder="请输入您的手机号" />
            </div>
          </div>

          <!-- <div class="form-item item-wrap">
            <label class="form-tit">
              银行卡
            </label>
            <div class="form-ipt">
              <input type="number" class="ipt" placeholder="请输入您的银行卡" v-model="bankInfo.bankNo" />
            </div>
          </div> -->

        </div>
        <van-button type="primary" :loading="doing" :disabled="btnDisabled" class="btn-default" @click="submitForm">绑定
        </van-button>

      </div>
    </div>

    <van-popup v-model="showPopup" position="bottom" :overlay="true">
      <van-picker show-toolbar :default-index="bankInfo.idTypeIndex" :columns="idCardTypeList" @cancel="onCancel"
        @confirm="onConfirm" @change="onChange" />
    </van-popup>


  </div>
</template>

<script>
  import { isObj } from '@/vant/utils';
  import { Button, Popup, Picker, Area ,Dialog} from '@/vant';
  import { tip, checkName, checkMobile, checkIdCard, showLoading, hideLoading, checkValidCode, checkBankNo, setTimer,deepClone } from "@/utils"
  import credentialsList from '@/core/credentialsList'
  import applySteps from '@/components/applySteps'
  import {getBankInfo} from '@/store/data/index';
  import Store from 'store'

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
       let localBankInfo = this.$store.getx('bankInfo');

      for (let d of credentialsList) {
        idCardTypeList.push(d.name);
      }

      return {

        showPopup: false,
        cardType: "",
        idCardTypeList: idCardTypeList,
        bankInfo:localBankInfo,
        bankInfo_bk:{},
        doing: false,
        btnDisabled: true,
        loading: false

        
      };
    },

    created(){

      this.applyId = this.$route.query.applyId;
 
      if(this.applyId){
        this.loadData();
      }else{
        this.loadDataByStore();
      }
  
      this.checkBindBankStatus();
  
    },

    mounted() {

      this.checkIsSubmit();
    },


    watch: {
      bankInfo: {
        //特别注意，不能用箭头函数，箭头函数，this指向全局
        handler: function () {
          setTimeout(() => {
            this.checkIsSubmit();
          }, 100)

          this.saveBankInfo();
        },
        deep: true
      },
    },


    methods: {


    //判断银行信息是否已经更改
    checkBankInfoIsUpdate(){
          let hadUpdate = false;
          let bankInfo = this.bankInfo;
          let bankInfo_kb =this.bankInfo_kb;

          for(let d in bankInfo){
            if(bankInfo_kb[d]!=bankInfo[d]){
              hadUpdate = true;
              break;
            }
          }
          return hadUpadte;
    },

     //加载数据回调函数
     loadDataCallback(){
        
        //判断当前是否有id 有id则拷贝一个副部
        if(this.bankInfo.id){
          this.bankInfo_bk = deepClone(this.bankInfo);
        }
     },


      //通过缓存加载数据
      loadDataByStore(){
        let localBankInfo = this.$store.getx('bankInfo');
        let applyInfo = this.$store.getx('applyInfo') ;
        this.bankInfo = Object.assign(localBankInfo, {
          "applyId": applyInfo.id,
          "userPhone":localBankInfo.userPhone || applyInfo.mobile
        });
 
        console.log(localBankInfo.userPhone || applyInfo.mobile);
        this.loadDataCallback();

      },

      //加载数据
      async loadData() {

        let res, data,applyInfo;

        let bankInfo ={};
    
        //清除本地数据
        this.$store.dispatch('clearApplyInfo');
        showLoading('加载中');

        res = await this.$api.getApplyInfo({
          applyId: this.applyId
        });
        data = res && res.data;

        hideLoading();
        console.log(data);
        if (data && data.code == 200 && data.data) {
          data = data.data;
      
          if(data.EtcBankCardInfo){
            bankInfo = getBankInfo(data.EtcBankCardInfo)
          }


          if(data.EtcApplyInfo){
              applyInfo = data.EtcApplyInfo;
              Object.assign(bankInfo,{
              applyUserId:applyInfo.id
            })
          }
 
          if(data.EtcApplyInfo && !bankInfo.userName){
       
            applyInfo = data.EtcApplyInfo;
        
            Object.assign(bankInfo,{
              userName:applyInfo.applyInfoName,
              idCard:applyInfo.idCard
            })

          }

          this.bankInfo  = bankInfo;
          this.loadDataCallback();

        }

      },


     //检查是否已经绑定成功
      async checkBindBankStatus(){

       let applyInfo = this.$store.getx('applyInfo');
       let resultinfo = this.$route.query.resultInfo;
       console.log(resultinfo)

        if(resultinfo == 1 ){

           showLoading('请稍等');
            this.$api.changeStatusInYunNan({
              applyId : applyInfo.id
            }).then(res=>{

                if(res && res.data && res.data.code == 200){
                  hideLoading();
                  this.nextApplyStep();
                }else{
                  tip(res.data && res.data.message || '状态修改失败');
                }
            })
            
        }
  
      },

      //检查是否已经绑定成功 已废弃
      async checkBindBankStatus_(){

       let applyInfo = this.$store.getx('applyInfo');
       let bindBankStatus = this.$store.getx('bindBankStatus');

        if(bindBankStatus){
          Dialog.confirm({
            cancelButtonText:"取消",
            confirmButtonText:"确定",
            message:'银行卡已绑定成功？'
          }).then(() => {
            
       
            showLoading('请稍等');
            this.$api.changeStatusInYunNan({
              applyId : applyInfo.id
            }).then(res=>{

                if(res && res.data && res.data.code == 200){
                  hideLoading();
                  this.nextApplyStep();
                }else{
                  tip(res.data && res.data.message || '状态修改失败');
                }
            })


          }).catch(() => {
            // on cancel
            this.$store.removex('bindBankStatus');
          });
        }
  
      },
     
      goAddress(){

        this.nextApplyStep(this.applyId ? '?applyId='+this.applyId:"");

      },
      //提交表单
      async submitForm() {

        let res, data, code, bankInfo;

        if (this.doing) return;

        bankInfo = this.bankInfo;

        if(!bankInfo.applyId){
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

        if (!bankInfo.userPhone) {
          tip("请输入银行预留手机号");
          return;
        }

        if (!checkMobile(bankInfo.userPhone)) {
          tip("手机格式不正确");
          return;
        }

        // if (!bankInfo.bankNo) {
        //   tip("请输入您的银行卡号");
        //   return;
        // }

        // if (!checkBankNo(bankInfo.bankNo)) {
        //   tip("银行卡号格式不正确");
        //   return;
        // }

        //工商银行id
        bankInfo.bankId = '001';

        this.doing = true;
        this.$store.commit('setBankInfo',bankInfo);

        // this.$store.setx('bindBankStatus',1);
        // this.$router.push({
        //   path:"/bindUnionPay"
        // });
        // return;

        //判断是否已经绑定 (status 0 已绑定 1 和 null为未绑定) 
        //未绑定 和已绑定且数据又重新发生了修改 则需要重新提交
        if(bankInfo.status != 0 || bankInfo.status == 0 && this.checkBankInfoIsUpdate()){
            showLoading("提交中");
            res = await this.$api.saveBankInfoInYunNan({
              applyId:bankInfo.applyId,
              bankId:bankInfo.bankId,
              userPhone:bankInfo.userPhone
            });
            data = res && res.data;
            code = res && data && data.code;
            this.doing = false;

            if (code == 200 && data.data && data.data.code == '000000') {
              hideLoading();
              data = data.data.data;

              if(data.signUrl){
                //document.write(data.signUrl);
                this.$store.setx('bindBankStatus',1);
                //Store.set('bindBankFormHtml',data.signUrl);
                Store.set('bindBankSignUrl',data.signUrl);
                //this.go("/yunnan_bindBank2")
                //this.nextApplyStep();
                //console.log(data.signUrl);
                window.location.href= data.signUrl;
              }

            } else {
              tip(data && data.message || "绑定失败");
            }
          
        }else{
            
           this.goAddress();

        }
        


      },

      //缓存
      saveBankInfo() {

        setTimer("bankInfoTimer", () => {

          let applyInfo = this.$store.getx('applyInfo');

          if (applyInfo.idCardNo != this.bankInfo.idCard) {
            applyInfo.idCardNo = this.bankInfo.idCard;
            this.$store.commit("setApplyInfo", applyInfo);
          }
          this.$store.commit("setBankInfo", this.bankInfo);

        })
      },

      //检查是否可以提交
      checkIsSubmit() {
        let disabled = false;
        let bankInfo = this.bankInfo;
        let required = ['userPhone'];

        for (let d in bankInfo) {
          if (required.indexOf(d)> -1 && (bankInfo[d] + "").replace(/\s/g, '') === '') {
              disabled = true;
              break;
          }
        }
        this.btnDisabled = disabled;
      },

      togglePopup() {
        this.showPopup = !this.showPopup;
      },

      onCancel() {
        this.togglePopup();
      },
      onConfirm(val) {
        this.cardType = val;
        this.togglePopup();
      },

      onChange(com, val) {
        console.log("当前变化值：" + val);
      },

      showTip(){

          Dialog.alert({
            confirmButtonText:"我知道了",
            message: '目前云通卡银行只支持<br/>中国工商银行'
          }).then(() => {
            // on close
          });

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
        }

        .form-ipt {
          flex: 1;
          display: flex;
          margin-right: 40px;
          &.ipt-bank-type{
            position: relative;
            display:flex;
            justify-content: space-between;
            .bank-tip{
             width:48px;
             height:48px;
             img{
               width:100%;
               height:100%;
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
                border-top: 16px solid #DAE3E1;
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

            .code {
              height: 100%;
              color: #40A2ECFF;
              width: 250px;
              text-align: center;

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