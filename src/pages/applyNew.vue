<template>
  <div class="page page-apply">
    <headNav path="/"></headNav>
    <div class="main">
      <div class="content">
        <div class="process">
          <div class="title">办理流程</div>

          <div>
            <div class="listContent">
              <div class="circle">
                <div class="adopt">1</div>
              </div>

              <div class="dashed hover"></div>
              <div class="information displayWithLeft">
                <span class="s-title">在线申请</span>
                <div class="s-content">上传身份证、行驶证、绑定或开通银行卡、并填写收货地址.</div>
              </div>
            </div>

            <div class="listContent">
              <div class="circle">
                <div class="adopt">2</div>
              </div>
              <div class="dashed hover"></div>
              <div class="information displayWithLeft">
                <span class="s-title">在线申请</span>
                <div
                  class="s-content"
                >审核通过后,发行方会把ETC设备邮寄给您.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
            </div>

            <div class="listContent">
              <div class="circle">
                <div class="adopt">3</div>
              </div>
              <div class="information">
                <span class="s-title">自助激活</span>
                <div class="s-content">
                  收到设备后,您可根据安装说明书自行安装
                  部分地区支持上门安装
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="process displayWithBottom">
          <div class="title">准备资料</div>

          <div class="file">
            <div class="file-item">
              <img src="../assets/images/ic_card.png" />
              <span>身份证</span>
            </div>
            <div class="file-item">
              <img src="../assets/images/drive_card.png" />
              <span>行驶证</span>
            </div>
            <div class="file-item">
              <img src="../assets/images/bank_card.png" />
              <span>银行卡</span>
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
            v-for="item in cardList"
            :key="item.name"
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
        this.$store.set("loginMode", isInWeiXin ? 3 : 1);
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
  background: #f8f8f8;

  .main {
    .content {
      padding: 0 40px;

      .process {
        margin-top: 40px;
        padding: 20px;
        background: #ffffff;
        border-radius: 10px;
        -moz-box-shadow: 2px 2px 10px #909090;
        -webkit-box-shadow: 2px 2px 10px #909090;
        box-shadow: 2px 2px 10px #909090;

        &.displayWithBottom {
          margin-bottom: 80px;
        }

        .title {
          color: #333333;
          text-align: center;
          font-size: 36px;
        }

        .file {
          display: flex;
          justify-content: space-between;

          .file-item {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            align-items: center;
            img {
              width: 200px;
              height: 100px;
            }
            span {
              color: #333333;
              font-size: 28px;
              margin-top: 20px;
            }
          }
        }

        .listContent {
          display: flex;

          .circle {
            width: 48px;
            height: 48px;
            align-items: center;

            .adopt {
              width: 48px;
              height: 48px;
              border-radius: 24px;
              text-align: center;
              font-size: 32px;
              color: #ffffff;
              background: #00e3da;
              background-size: 100%;
            }
          }

          .information {
            position: relative;
            display: flex;
            flex-direction: column;
            padding-left: 20px;

            .s-content {
              font-size: 30px;
              margin-top: 10px;
              color: #666666;
              padding-bottom: 30px;
            }

            .s-title {
              font-size: 30px;
            }
            &.displayWithLeft {
              left: -85px;
            }
          }
        }

        .dashed {
          transform: rotate(90deg);
          position: relative;
          z-index: 0;
          left: -150px;
          top: 25px;
          width: 160px;
          height: 160px;
          border-top: 3px dashed #e5dfdd;

          &.hover {
            border-color: #00e3da;
          }
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