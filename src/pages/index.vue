<template>
  <div class="page page-index">
    <div class="page-index-content">
      <div class="main">
        <div class="bg">
          <van-swipe :autoplay="3000" indicator-color="white" class="swipe">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img :src="image" @click="goAttention()" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="wrap">
          <div class="link" @click="go('/apply')">
            <div class="link-inner">
              <div class="text-font">
                <div class="big">免费申办</div>
                <div class="small">
                  ETC
                  <img src="../assets/images/gogo.png" class="img" />
                </div>
              </div>
            </div>
          </div>
          <div class="label">
            <div class="menu-list">
              <div class="item" @click="go('/applicationRecord')">
                <div class="ico">
                  <img src="../assets/images/etc.png" />
                </div>
                <div class="tit">申请记录</div>
              </div>

              <div class="item" @click="go('/activate')">
                <div class="ico">
                  <img src="../assets/images/firend.png" />
                </div>
                <div class="tit">设备激活</div>
              </div>

              <div class="item" @click="go('/questionList')">
                <div class="ico">
                  <img src="../assets/images/more.png" />
                </div>
                <div class="tit">了解更多</div>
              </div>
              <div class="item" @click="go('/questionConsultation')">
                <div class="ico">
                  <img src="../assets/images/phones.png" />
                </div>
                <div class="tit">问题咨询</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foot-nav :selected="0"></foot-nav>
    </div>
    <div class="img-preview-index" v-show="showImgPreview">
      <div class="img-close" @click="closeImgPreview">X</div>
      <img src="../assets/images/newrun_wechat_scan.png" />
      <div>请长按二维码关注公众号</div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "@/vant";
import FootNav from "@/components/footer/footNav";
import wxShare from "@/services/wechat/wechat-share";
import wxParam from "@/services/wechat/wechat-param";
import {
  isInWeiXin,
  delUrlParams,
  tip,
  showLoading,
  hideLoading
} from "@/utils";

export default {
  name: "index",
  mounted() {},
  components: {
    FootNav,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      images: [
        require("../assets/images/bg-green1.png"),
        // require("../assets/images/bg-green2.jpg"),
        require("../assets/images/bg-green3.png")
      ],

      showImgPreview: false
    };
  },

  watch: {},
  created() {
    let unionId = this.$route.query.unionId;

    if (unionId) {
      console.log(unionId);
      this.$store.commit("setUnionId", unionId);
    }
  },
  mounted() {
    setTimeout(() => {
      wxShare();
    }, 1000);
  },
  methods: {
    //图片预览
    imgPreview() {
      this.showImgPreview = true;
    },

    //关闭图片预览
    closeImgPreview() {
      this.showImgPreview = false;
    },
    goAttention() {
      this.go("/attentionUs");
    },
  }
};
</script>
<style lang="scss" scoped>
.page-index {
  height: 100%;

  .img-preview-index {
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;

    .img-close {
      color: #fff;
      position: fixed;
      top: 0;
      right: 0;
      padding: 20px;
    }

    img {
      object-fit: fill;
      margin: auto;
      max-width: 100%;
    }

    div {
      color: #fff;
      position: fixed;
      bottom: 0;
      margin-bottom: 50px;
    }
  }

  .page-index-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .foot-nav {
      position: static;
    }

    .main {
      position: relative;
      flex: 1;
      overflow: auto;

      .bg {
        width: 100%;
        height: 668px;
        img {
          width: 100%;
        }
      }

      .wrap {
        z-index: 99;
        position: relative;
        margin-top: -34px;

        .label {
          height: 328px;
          margin: 0 30px;
          height: 274px;
          background: rgba(255, 255, 255, 1);
          /* box-shadow: 0px 0px 20px 12px rgba(127, 180, 171, 0.26); */
          border-radius: 18px;
          .menu-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 34px 64px 64px 74px;

            .item {
              display: flex;
              align-items: center;
              width: 190px;
              margin-bottom: 45px;
            }
          }
          .ico {
            display: flex;
            align-items: center;
            img {
              width: 36px;
              height: 38px;
            }
          }
          .tit {
            margin-left: 16px;
            font-size: 30px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(96, 100, 112, 1);
          }
        }

        .link {
          width: 738px;
          height: 322px;
          background-image: url("../assets/images/apply-bn.png");
          background-size: cover;
          padding-top: 8px;
          margin: 0 auto;
          .link-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 262px;
          }
          .text-font {
            .big {
              font-size: 48px;
              text-align: center;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 66px;
              margin-bottom: 16px;
            }

            .small {
              text-align: center;
              font-size: 40px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #dbf5f2;
              line-height: 56px;

              .img {
                margin-left: 10px;
                width: 42px;
                height: 32px;
              }
            }
          }
        }
      }
    }
  }
}
</style>