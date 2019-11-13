<template>
  <div class="page page-apply">
    <headNav path="/"></headNav>
    <div class="main">
      <div class="content">
        <div class="brick">
          <div class="title">
            <!-- <h2>办理流程</h2> -->
          </div>
          <div class="steps">
            <div class="line"></div>
            <div class="step-list">
              <div class="step">
                <div class="num">1</div>
                <div class="txt">选择办理方式</div>
              </div>
              <div class="step active">
                <div class="num">2</div>
                <div class="txt">申办信用卡</div>
              </div>
              <div class="step">
                <div class="num">3</div>
                <div class="txt">激活信用卡</div>
              </div>
              <div class="step">
                <div class="num">4</div>
                <div class="txt">免费办理ETC</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tip">选择ETC免费办理方式</div>
        <router-link to="selectCreditCard">
          <div class="choose_mode">
            <span>办理方式</span>
            <!-- <p>{{cardName}}</p> -->
            <p :class="{color: color}">{{text == 0 ?'请选择办理方式': text}}</p>
            <van-icon class="icon" name="arrow" />
          </div>
        </router-link>
        <!--办理流程-->
        <div class="handleMin">
          <div class="handeTitle">办理流程</div>
          <div class="handleCon">
            <div class="stepsMin">
              <div :class="steps >= 1 ? 'stepsIcon activeIcon' : 'stepsIcon'"></div>
              <div class="stepsLine"></div>
              <div :class="steps >= 2 ? 'stepsIcon activeIcon' : 'stepsIcon'"></div>
              <!-- <div :class="steps >= 2 ? 'stepsLine activeLine' : 'stepsLine'"></div>
              <div class="stepsIcon"></div>-->
            </div>
            <div class="handeList">
              <div class="handeItem">
                <div class="handeItemTitle">填写信用卡资料</div>
                <div class="handeItemMsg">通过易行易停公众号提交交通银行信用卡办理申请</div>
                <div
                  :class="serialnum ? 'fillInBut acompleteBg':'fillInBut noCompleteBg'"
                  @click="openWindow"
                >{{serialnum?'重新申请':'去填写'}}</div>
              </div>
              <div class="handeItem">
                <div class="handeItemTitle">登记信息</div>
                <div class="handeItemMsgIn">确认办理信用卡的姓名和身份证</div>
                <div class="fillInBut completeBg" v-show="!showRegisterPopup">已登记</div>
                <div
                  class="fillInBut fillIdCard"
                  :class="{completeTBg:serialnum}"
                  v-show="showRegisterPopup"
                  @click="opneTipsPopup"
                >去登记</div>
              </div>
              <!-- <div class="handeItem">
                <div class="handeItemTitle">待审核</div>
                <div class="handeItemMsg">2~4个工作日确认资格，信用卡新户方可在一个月内免费办理ETC</div>
                <div class="fillInBut completeBg">未完成</div>
              </div>-->
            </div>
          </div>
        </div>
        <!--下一步-->
        <div class="nextBut" :class="{avtiveBg:nexAvtive}" @click="apply">下一步</div>
      </div>
      <!--提示弹框-->
      <van-popup v-model="showTipsPopup" :lazy-render="false" style="border-radius: .1rem;">
        <div class="tipsAlert">
          <div class="tipsTitle">提示</div>
          <div class="tipsMsg">即将跳转至交通银行网站进行信用卡申办资料填写，申办时填写车牌号批卡率会有较大提升。</div>
          <div class="subBut" @click="toBankInfo">知道了</div>
        </div>
      </van-popup>
      <!--登记信息-->
      <van-popup
        v-model="registerPopup"
        closeable
        close-icon-position="top-left"
        :lazy-render="false"
        style="border-radius: .1rem;"
      >
        <div class="registerAlert">
          <van-icon class="colseicon" name="cross" @click="registerPopup = false" />
          <div class="registerTitle">登记信息</div>
          <div class="inputItem">
            <span class="inputItemName">姓名</span>
            <input type="text" v-model="bankUser.check_name" placeholder="请输入你的姓名" class="fixInput" />
          </div>
          <div class="inputItem">
            <span class="inputItemName">身份证</span>
            <input
              type="text"
              v-model="bankUser.check_idcard"
              placeholder="请输入你的身份证号"
              class="fixInput"
            />
          </div>
          <div class="inputItem">
            <span class="inputItemName">手机号码</span>
            <input
              type="text"
              v-model="bankUser.check_phone"
              placeholder="请输入你的手机号码"
              class="fixInput"
            />
          </div>
          <div class="registerMsg">请填写申请信用卡的身份信息，未申请则无需填写</div>
          <div class="registerBut" :class="{registerSbg:btnDisabled}" @click="submission">提交</div>
        </div>
      </van-popup>
      <!--办理弹框-->
      <van-popup class="popup-apply" v-model="showPopup" position="bottom">
        <div class="title">
          <div class="back" @click="togglePopup">
            <i class="icon-back"></i>
          </div>发行方
        </div>
        <div class="content">
          <div class="card-list">
            <div
              v-for="item in cardList"
              :key="item.name"
              :class="(item.disable == false && item.province !== '云南省') ? 'card active' : 'card'"
              @click="selectcard(item)"
            >
              <div class="card-wrap">
                <h3 class="tit">{{item.name}}</h3>
                <p class="addr">
                  <span class="ico"></span>
                  <span class="txt">{{item.province}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <!--现金兑换码弹框-->
      <van-popup v-model="showExchangePopup" :lazy-render="false" style="border-radius: .1rem;">
        <div class="exchangeTipsAlert">
          <div class="exchangetipsTitle">提示</div>
          <div class="exchangeTipsMsg">
            现金兑换码：<span id="code">{{serialnum}}</span>，请务必复制保存好兑换码
            成功办理激活信用卡后，在易行易停公众号回复“兑换”，或点击激活返现菜单，获取客服微信号，添加客服微信发送现金兑换码及信用卡激活截图即可领取30元返现红包
          </div>
          <div class="subBut" @click="copyCode">确定并复制</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Button, Popup } from "@/vant";
import { Icon } from "vant";
import { mapState } from "vuex";
import {
  tip,
  showLoading,
  hideLoading,
  isInWeiXin,
  replaceAll,
  checkName,
  checkIdCard,
  checkMobile
} from "@/utils";
export default {
  data() {
    return {
      text: 0,
      color: false,
      steps: 1, // 步骤
      showTipsPopup: false, // 提示弹框
      registerPopup: false, // 登记信息
      showExchangePopup: false,  // 现金兑换码弹框
      apicardInfo: {}, // 信用卡请求信息
      showPopup: false,
      cardList: [],
      cardName: "BCM",
      checkcreditcardInfo: "", // 用户信用卡登记的信息
      userInfo: "", // 用户信息
      bankCardInfo: "", // 信用卡登记信息
      cardType: "", // 卡类型
      bankUser: {
        check_name: "", // 姓名
        check_idcard: "", // 身份证号码
        check_phone: "", // 手机号码
        serialnum: "",
        card_type: 1
      }, // 银行登记信息
      btnDisabled: false,
      serialnum: "",
      showRegisterPopup: true,
      nexAvtive: false
    };
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted() {
    if (this.cardName == "BCM") {
      this.color = true;
      this.text = "新办交通银行信用卡";
    }
  },
  created() {
    if (this.isLogin) {
      this.bindEtcCardList();
    }
    let cardName = this.$store.getx("cardName");
    let user = this.$store.getx("user"); // 用户信息
    if (cardName) this.cardName = cardName;
    if (user) this.userInfo = user;
    this.getcheckinfoFetch();
  },
  methods: {
    // 关闭弹框
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    // 下一步
    async apply() {
      if (!this.nexAvtive) return;
      let res, data;
      if (this.isLogin) {
        this.togglePopup();
      } else if (!this.doing) {
        //设置loginMode 会主动触发登录
        this.$store.set("loginMode", 1);
        this.doing = true;

        res = await this.$api.validToken();
        data = res && res.data;
        this.doing = false;
        if (data && data.code == 200 && data.message == "OK") {
          this.togglePopup();
        }
      }
    },
    // 选择通道
    selectcard(item) {
      let user = this.$store.state.user;
      let openId = user.openid;
      if (item.disable || item.province == "云南省") return;
      //云南省 强制微信登录
      if (item.province == "云南省" && !openId) {
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

      //清除本地数据
      this.$store.dispatch("clearApplyInfo");
      this.$store.commit("setCardInfo", item);
      this.$store.setx("catId", item.id);
      this.go("/agreement?catId=" + item.id);
    },
    // 打开填写信用卡弹框
    openWindow() {
      if (!this.cardName) {
        tip("请选择办理方式");
        return;
      }
      if (this.bankUser.serialnum) {
        window.location = "https://www.baidu.com/";
      } else {
        this.showTipsPopup = true;
      }
    },
    // 跳转填写银行资料
    async toBankInfo() {
      // card_type: 卡类型：1交行信用卡
      let res = await this.$api.submitinfo({
        userId: this.userInfo.id,
        card_type: 1
      });
      let data = res && res.data;
      if (data && data.code == 200) {
        this.showTipsPopup = false;
        this.getcheckinfoFetch('openView');
      } else {
        tip((data && data.message) || "加载失败");
      }
    },
    // 获取该用户信用卡登记信息
    async getcheckinfoFetch(type) {
      let user = this.$store.getx("user"); // 用户信息
      let res = await this.$api.getcheckinfo({ userId: user.id });
      let data = res && res.data;
      if (data && data.code == 200) {
        if (data.data) {
          this.bankCardInfo = data.data;
          this.$store.commit("setBankCardInfo", data.data);
          if (
            data.data.check_name &&
            data.data.check_idcard &&
            data.data.check_phone
          ) {
            this.steps = 2;
            this.showRegisterPopup = false;
            if (data.data.serialnum) {
              this.nexAvtive = true;
            }
          }
          if (data.data.serialnum) {
            this.serialnum = data.data.serialnum;
            this.bankUser.serialnum = data.data.serialnum;
            // 信用卡类型，暂时写死交通银行
            this.cardName == "BCM";
          }
        }
        // 跳转新连接
        if (type == "openView") window.location = "https://www.baidu.com/";
      } else {
        tip((data && data.message) || "加载失败");
      }
    },
    //检查是否可以提交
    checkIsSubmit() {
      let disabled = true;
      let bankUser = this.bankUser;
      let required = "check_name,check_idcard,check_phone".split(",");
      for (let d in bankUser) {
        if (
          required.indexOf(d) > -1 &&
          (bankUser[d] + "").replace(/\s/g, "") === ""
        ) {
          disabled = false;
          break;
        }
      }
      this.btnDisabled = disabled;
    },
    // 提交登记信息
    async submission() {
      if (!this.btnDisabled) return;
      let bankUser = this.bankUser;
      if (!checkName(bankUser.check_name)) {
        tip("您的姓名格式不正确");
        return;
      }
      if (!checkIdCard(bankUser.check_idcard)) {
        tip("您的身份证号码格式不正确");
        return;
      }
      if (!checkMobile(bankUser.check_phone)) {
        tip("您的手机号码格式不正确");
        return;
      }
      bankUser.userid = this.userInfo.id;
      let res = await this.$api.checkin(bankUser);
      let data = res && res.data;
      if (data && data.code == 200) {
        tip((data && data.message) || "提交成功");
        this.registerPopup = false;
        this.getcheckinfoFetch();
        this.showExchangePopup = true;
      } else {
        tip((data && data.message) || "加载失败3");
      }
    },
    // 获取弹框信息
    async bindEtcCardList() {
      let res = await this.$api.getEtcCardList();
      let data = res && res.data;

      if (data && data.code == 200) {
        this.cardList = data.data;
      } else if (data && data.code == 403) {
        tip("登录失效");
      } else {
        tip((data && data.message) || "加载失败4");
      }
    },
    opneTipsPopup() {
      if (!this.serialnum) return;
      this.registerPopup = true;
    },
    // 点击复制
    copyCode() {
      let copyDom = document.querySelector("#code");
      //创建选中范围
      let range = document.createRange();
      range.selectNode(copyDom);
      //移除剪切板中内容
      window.getSelection().removeAllRanges();
      //添加新的内容到剪切板
      window.getSelection().addRange(range);
      //复制
      let successful = document.execCommand("copy");
      try {
        let res = successful;
        tip('复制成功');
        this.showExchangePopup = false;
      } catch (err) {
        tip('复制失败');
        this.showExchangePopup = false;
      }
    }
  },
  watch: {
    bankUser: {
      handler: function() {
        this.checkIsSubmit();
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.page-apply {
  padding-bottom: 1rem;

  .choose_mode {
    margin-top: 0.5rem;
    padding-bottom: 0.2rem;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    span {
      float: left;
      margin-right: 0.6rem;
      color: #333;
    }
    p {
      float: left;
      color: #999;
    }
    .color {
      color: #333;
    }
    .icon {
      float: right;
      padding-top: 0.1rem;
      color: #999;
    }
  }
  .tip {
    color: #333;
    background: #eee;
    border-radius: 0.1rem;
    padding: 0.2rem 0.35rem;
    margin: 0.1rem 0;
  }
  .content {
    padding: 0 0.4rem;
    .brick {
      /* margin-bottom:0.4rem; */
    }
    .title {
      margin-bottom: 0.3rem;
      line-height: 0.3rem;
      h2 {
        font-size: 0.36rem;
        color: #382c2a;
        font-weight: normal;
        text-align: center;
        display: block;
      }
    }

    .steps {
      position: relative;
      height: 1.7rem;
      .line {
        height: 0.375rem;
        position: absolute;
        width: 90%;
        left: 5%;
        top: 0;
        border-bottom: 1px solid #00e0be;
      }
      .step-list {
        display: flex;
        justify-content: space-between;
        position: relative;
        .step {
          text-align: center;
          .num {
            width: 0.75rem;
            height: 0.75rem;
            line-height: 0.75rem;
            font-size: 0.3rem;
            border-radius: 0.5rem;
            border: 2px solid #9cfff0;
            margin: 0 auto;
            background: #00e0be;
            color: #fff;
            font-weight: bold;
          }

          .txt {
            margin-top: 0.2rem;
            color: #6a7271;
            font-size: 0.25rem;
          }
          &.active {
            .num {
              /* background:#00a88e;
                        border-color:#00a88e;
                        color:#fff; */
            }
          }
        }
      }
    }
  }
  .handleCon {
    position: relative;
  }
  .handeList {
    padding-left: 0.8rem;
  }
  .handeTitle {
    margin: 0.4rem 0;
  }
  .handeItem {
    height: 1.8rem;
    position: relative;
  }
  .handeItemTitle {
    font-size: 0.35rem;
    color: #000;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
  .handeItemMsg {
    font-size: 0.25rem;
    color: #999;
    width: 55%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .handeItemMsgIn {
    font-size: 0.25rem;
    color: #999;
    width: 55%;
  }
  .fillInBut {
    width: 2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    position: absolute;
    right: 5%;
    top: 34%;
    border-radius: 0.3rem;
  }
  .noCompleteBg {
    color: #fff;
    background-color: #00e0be;
  }
  .completeBg {
    color: #ccc;
  }
  .againBut {
    border-color: #00e0be;
    color: #00e0be;
  }
  .stepsMin {
    position: absolute;
    left: 0;
    top: 0.1rem;
  }
  .acompleteBg {
    border: solid 1px #00e0be;
    color: #00e0be;
  }
  .stepsIcon {
    width: 0.15rem;
    height: 0.15rem;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0.1rem 0;
  }
  .activeIcon {
    background-color: #00e0be;
  }
  .stepsLine {
    width: 0.02rem;
    height: 1.5rem;
    background-color: #ccc;
    margin: 0 auto;
  }
  .activeLine {
    background-color: #00e0be;
  }
  .tipsAlert {
    width: 6rem;
    height: 4rem;
    overflow: hidden;
  }
  .tipsTitle {
    text-align: center;
    // margin: .3rem 0;
    font-size: 0.35rem;
    font-weight: 400;
    height: 1rem;
    line-height: 1rem;
  }
  .registerTitle {
    text-align: center;
    font-size: 0.35rem;
    font-weight: 400;
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
  }
  .tipsMsg {
    width: 80%;
    margin: 0 auto;
    color: #666;
    text-align: center;
    height: 2rem;
  }
  .subBut {
    text-align: center;
    border-top: 0.01rem solid #ccc;
    height: 1rem;
    line-height: 1rem;
    color: #00e0be;
  }

  .registerAlert {
    width: 6.5rem;
    height: 6.6rem;
    overflow: hidden;
    position: relative;
  }
  .inputItem {
    width: 6rem;
    margin: 0 auto;
    height: 0.8rem;
    line-height: 0.7rem;
    margin-bottom: 0.25rem;
  }
  .inputItemName {
    display: inline-block;
    width: 1.6rem;
    vertical-align: top;
    color: #999;
  }
  .fixInput {
    display: inline-block;
    width: 4.3rem;
    height: 0.7rem;
    vertical-align: top;
    border: 1px solid #cecece;
    border-radius: 0.04rem;
    padding-left: 0.1rem;
  }
  .registerMsg {
    font-size: 0.2rem;
    text-align: center;
    color: #666;
    margin-top: 0.6rem;
  }
  .registerBut {
    width: 5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 auto;
    background-color: #ddd;
    border-radius: 0.4rem;
    text-align: center;
    color: #fff;
    margin-top: 0.2rem;
  }
  .colseicon {
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
    font-size: 0.4rem;
    color: #a3a3a3;
  }
  .nextBut {
    width: 80%;
    height: 0.8rem;
    border-radius: 0.4rem;
    background-color: #ccc;
    color: #fff;
    margin: 0 auto;
    text-align: center;
    line-height: 0.8rem;
  }
  .registerSbg {
    color: #fff;
    background-color: #00e0be;
  }
  .avtiveBg {
    background-color: #00e0be;
    color: #fff;
  }
  .fillIdCard {
    color: #fff;
    background-color: #ccc;
  }
  .completeTBg {
    background-color: #00e0be;
    color: #fff;
  }
  .popup-apply {
    z-index: 11;
    background: rgba(252, 250, 250, 0.85);
    .title {
      height: 100px;
      line-height: 100px;
      font-size: 36px;
      text-align: center;
      color: #382c2a;
      margin: 0 40px;
      position: relative;
      .back {
        height: 100%;
        width: 40px;
        display: flex;

        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        .icon-back {
          background-image: url(../assets/images/icon-back.png);
          background-repeat: no-repeat;
          background-size: contain;
          width: 20px;
          height: 34px;
        }
      }
    }
    .content {
      padding: 40px;
      .card-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .card {
          width: 310px;
          height: 168px;
          border-radius: 10px;
          background: #aaaaaa;
          color: #6a7271;
          margin-bottom: 40px;

          .card-wrap {
            padding: 30px 20px;
            .tit {
              font-size: 32px;
              margin-bottom: 20px;
            }
            .addr {
              font-size: 28px;
              display: flex;
              align-items: center;
            }
          }

          .ico {
            background-image: url(../assets/images/icon-adr.png);
            background-repeat: no-repeat;
            background-size: contain;
            width: 22px;
            height: 26px;
            display: inline-block;
            margin-right: 10px;
          }
          &.active {
            background: -webkit-linear-gradient(
              left,
              #00fac7,
              #00e3da
            ) !important;
            box-shadow: 0 18px 36px rgba(0, 0, 0, 0.08);
            color: #f2fcfa;
            .ico {
              background-image: url(../assets/images/icon-adr-h.png);
            }
          }
        }
      }
    }
  }
  .exchangeTipsAlert{
    width: 6rem;
  }
  .exchangeTipsMsg{
    width: 5.5rem;
    margin: 0 auto;
    color: #666;
    margin-bottom: .2rem;
    font-size: .3rem;
  }
  .exchangeTipsMsg span{
    color: #16c88b;
  }
  .exchangetipsTitle{
    text-align: center;
    line-height: 1rem;
    font-size: .4rem;
  }
}
</style>