<template>
  <div class="page page-apply">
    <headNav path="/"></headNav>
    <div class="main">
      <div class="banner">
        <div class="bg">
          <img src="../assets/images/apply-bn.png" />
        </div>
        <h1>ETC最新优惠政策</h1>
      </div>
      <div class="content">
        <div class="brick">
          <div class="title">
            <h2>办理流程</h2>
            <a class="link" href="#" v-if="0">详细说明</a>
          </div>
          <div class="steps">
            <div class="line"></div>
            <div class="step-list">
              <div class="step">
                <div class="num">1</div>
                <div class="txt">车主资料</div>
              </div>
              <div class="step">
                <div class="num">2</div>
                <div class="txt">车辆资料</div>
              </div>

              <div class="step">
                <div class="num">3</div>
                <div class="txt">银行绑定</div>
              </div>
              <div class="step active">
                <div class="num">4</div>
                <div class="txt">收货资料</div>
              </div>
              <div class="step active">
                <div class="num">5</div>
                <div class="txt">支付押金</div>
              </div>
            </div>
          </div>
        </div>
        <div class="brick">
          <div class="title">
            <h2>常见问题</h2>
            <router-link class="link" to="/questionList">更多问题</router-link>
          </div>

          <div class="questions">
            <div class="item" v-for="(item,index) in faqList" :key="item.answer">
              <div class="tit">{{index+1}}、{{item.question}}</div>
              <div class="ctc" v-html="item.answer"></div>
            </div>
          </div>
        </div>

        <van-button type="primary" @click="apply" class="btn-default" :loading="doing">申请办理</van-button>
      </div>
    </div>
    <van-popup class="popup-apply" v-model="showPopup" position="bottom">
      <div class="title">
        <div class="back" @click="togglePopup">
          <i class="icon-back"></i>
        </div>发行方
      </div>
      <div class="content">
        <div class="card-list">
          <div
            v-for="item in cardList" :key="item.name"
            class="card"
            :class="{active:item.disable == false}"
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
  </div>
</template>

<script>
import { Button, Popup } from "@/vant";
import carAddrList from "@/core/carAddrList";
import { tip, showLoading, hideLoading, isInWeiXin } from "@/utils";
import { mapState } from "vuex";

export default {
  name: "login",
  mounted: function() {},
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup
  },

  computed: {
    ...mapState(["isLogin"])
  },
  data() {
    return {
      showPopup: false,
      doing: false,
      cardList: [],
      faqList: []
    };
  },

  created() {
    if (this.isLogin) {
      this.bindEtcCardList();
    }

    this.getFaq();
  },

  mounted() {},
  methods: {
    async getFaq() {
      let res, data;

      showLoading();

      res = await this.$api.getFaq({
        p: 1,
        s: 20
      });
      data = res && res.data;

      hideLoading();

      if (data && data.code == 200 && data.data) {
        data = data.data;
        if (data.list) {
          this.faqList = data.list;
        }
      }
    },

    async bindEtcCardList() {
      let res = await this.$api.getEtcCardList();
      let data = res && res.data;

      if (data && data.code == 200) {
        this.cardList = data.data;
      } else if (data.code == 403) {
        tip("登录失效");
      } else {
        tip((data && data.message) || "加载失败");
      }
    },

    async apply() {
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

    togglePopup() {
      this.showPopup = !this.showPopup;
    },

    selectcard(item) {
      let user = this.$store.state.user;
      let openId = user.openid;

      console.log(user);

      if (item.disable) return;

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
    }
  }
};
</script>
<style lang="scss" scoped>
.page-apply {
  padding-bottom: 100px;
  .main {
  }
  .banner {
    width: 738px;
    height: 322px;
    position: relative;
    margin: 0 auto;
    margin-top: 25px;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 342px;

      img {
        width: 100%;
      }
    }

    h1 {
      position: relative;
      text-align: center;
      font-size: 52px;
      height: 270px;
      line-height: 270px;
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      font-weight: normal;
      color: #fff;
    }
  }
  .content {
    padding: 0 40px;
    .brick {
      margin-bottom: 40px;
    }

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      line-height: 40px;
      h2 {
        font-size: 36px;
        color: #382c2a;
        font-weight: normal;
      }
      .link {
        font-size: 28px;
        color: #f4ae88;
      }
    }

    .steps {
      position: relative;
      height: 170px;
      .line {
        height: 45px;
        position: absolute;
        width: 98%;
        left: 1%;
        top: 0;
        border-bottom: 1px dashed #ffc7ae;
      }
      .step-list {
        display: flex;
        justify-content: space-between;
        position: relative;
        .step {
          text-align: center;
          .num {
            width: 90px;
            height: 90px;
            line-height: 90px;
            font-size: 36px;
            border-radius: 50px;
            border: 2px solid #ffc7ae;
            margin: 0 auto;
            background: #fff1eb;
            color: #ff8d5c;
            font-weight: bold;
          }

          .txt {
            margin-top: 20px;
            color: #6a7271;
            font-size: 24px;
          }
          &.active {
            .num {
              /* background:#FF8D5C;
                      color:#fff; */
            }
          }
        }
      }
    }

    .questions {
      .item {
        margin-bottom: 30px;
        .tit {
          color: #6a7271;
          font-size: 30px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        .ctc {
          color: #8e9696;
          font-size: 28px;
        }
      }
    }
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
}
</style>