<template>
  <div class="page page-apply">
    <headNav path="/applyCreditCard"></headNav>
    <div class="tip">
      <h2 class="title">选择一种办理方式免费办理ETC</h2>
      <h3 class="title title_small">目前支持以下方式办理</h3>
    </div>

    <div class="card_list">
      <!-- <div class="card" :class="{active: isSelect}" @click="changeSelect"> -->
      <div :class="cardName == 'BCM' ? 'card active':'card'" @click="changeSelect('BCM')">
        <img v-if="cardName == 'BCM'" class="select_car" src="../assets/images/select_car.png" />
        <div class="card_main">
          <img
            src="data:image/png;base64,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"
          />
          <p class="card_title">
            交通银行
            <span>信用卡</span>
          </p>
          <div class="give">送30元</div>
        </div>
        <div class="line"></div>
        <div class="show_text">
          <div class="show_title" @click.stop="isShow = !isShow">
            <p>限新用户，可享免息还款和积分换购</p>
            <!-- <b :class="{icon:true, up: isShow}" ></b> -->
            <van-icon v-if="!isShow" size="0.38rem" name="arrow-down" />
            <van-icon v-if="isShow" size="0.38rem" name="arrow-up" />
          </div>
          <ul v-if="isShow">
            <li>激活信用卡奖励30元现金红包</li>
            <li>免息还款期最长56天</li>
            <li>新户办卡5积分换购好礼</li>
          </ul>
        </div>
      </div>

      <van-button type="primary" @click="apply" class="btn-default" :disabled="!cardName">确认选择</van-button>
    </div>
  </div>
</template>
<script>
import { Button } from "@/vant";
import { Icon } from "vant";
export default {
  data() {
    return {
      isShow: false,
      isSelect: true,
      cardName: "",
      userInfo: {},
      checkcreditcardInfo: {},
    };
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  created() {
    let cardName = this.$store.getx("cardName");
    let user = this.$store.getx("user"); // 用户信息
    if (cardName) this.cardName = cardName;
    if (user) this.userInfo = user;
    if (cardName) this.cardName = cardName;
  },
  methods: {
    changeSelect(type) {
      this.cardName = type;
      this.isSelect = !this.isSelect;
    },
    async apply() {
      let params = {
        userId: this.userInfo.id,
        card_type: 1
      };
      let res = await this.$api.checkcreditcard(params);
      let data = res && res.data;

      if (data && data.code == 200) {
        this.checkcreditcardInfo = data.data;
        this.$store.commit("setCardName", "BCM");
        this.$router.push({ path: "applyCreditCard" });
      } else {
        tip((data && data.message) || "加载失败");
      }
      
    }
  }
};
</script>

<style scoped>
.tip {
}
.title {
  font-size: 0.37rem;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: #333;
  line-height: 0.66rem;
  margin-top: 0.38rem;
}
.title_small {
  font-size: 0.3rem;
  color: #666;
  line-height: 0.5rem;
  margin-top: 0.1rem;
  margin-bottom: 0.5rem;
}
.card_list {
  padding: 0 0.38rem;
}
.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
  overflow: hidden;
  margin: 0.3rem 0;
  padding: 0 0.45rem;
}
.active {
  border: 1px solid #16c88b;
}
.active .select_car {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.2rem;
}
.card .card_main {
  /* height: 1.5rem; */
  overflow: hidden;
  margin: 0.28rem 0;
}
.card .card_main img {
  float: left;
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
}
.card .card_main .card_title {
  float: left;
  line-height: 1rem;
  font-size: 0.38rem;
  color: #333;
}
.card .card_main .card_title span {
  font-size: 0.3rem;
}
.card .card_main .give {
  float: right;
  margin-top: 0.2rem;
  line-height: 0.6rem;
  background: #f2f9f2;
  border-radius: 0.5rem;
  padding: 0 0.3rem;
  font-size: 0.28rem;
  color: #16c88b;
}
.line {
  border: 1px dotted #ccc;
}

.show_text {
  margin: 0.25rem 0;
}
.show_text .show_title {
  color: #999;
  font-size: 0.28rem;
  font-weight: 400;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.show_text .show_title p {
  float: left;
  margin-right: 0.1rem;
}
/* .show_text .show_title .icon {
        float: left;
        width: 0.39rem;
        height: 0.39rem;
        background:url(../assets/images/down.png) no-repeat;
        background-size: cover;
    }
    .show_text .show_title .up {
        background:url(../assets/images/up.png) no-repeat;
    } */
.show_text ul li {
  list-style-type: disc;
  margin-left: 0.4rem;
  color: #666;
  font-size: 0.26rem;
  line-height: 0.42rem;
}
</style>