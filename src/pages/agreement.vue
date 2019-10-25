<template>
  <div class="page page-agreement">
    <headNav ref="headNav"></headNav>
    <div class="main">
      <div class="content" v-html="protocol"></div>
      <div class="footer" v-if="agreeName!='' && protocol!=''">
        <div class="checkbox">
          <van-checkbox v-model="agreeThis">同意《{{agreeName}}》</van-checkbox>
        </div>
        <van-button
          type="primary"
          class="btn-default btn-agree"
          :disabled="btnDisabled"
          @click="nextAction"
        >确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox } from "@/vant";
import { tip, showLoading, hideLoading, getNameByCard } from "@/utils";
import * as applyRouter from "@/router/applyRouter";

export default {
  name: "agreement",
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      catId: 0,
      agreeThis: false,
      agreeName: "",
      protocol: ""
    };
  },

  created() {
    this.catId = this.$route.query.catId;
    this.loadData();
  },

  mounted() {},
  watch: {},
  computed: {
    btnDisabled() {
      return !this.agreeThis;
    }
  },

  methods: {
    async loadData() {
      let res, data;
      if (!this.catId) {
        return;
      }

      showLoading("加载中");
      res = await this.$api.getEtcCardCat(this.catId);
      data = res && res.data;
      hideLoading();

      if (data && data.code == 200) {
        data = data.data;
        this.protocol = data.protocol;
        this.agreeName = data.alias;

        let name = "";
        let cardInfo = this.$store.state.cardInfo;
        if (cardInfo) {
          name = getNameByCard(cardInfo);
          if (name === "guangdong") {
            this.$refs.headNav.navTitle = this.agreeName;
          }
        }

        if (!this.protocol || !this.agreeName) {
          tip({
            title: "暂无用户协议",
            time: 2000,
            close: () => {
              this.$router.go(-1);
            }
          });
        }
      } else {
        tip((data && data.message) || "加载失败");
      }
    },
    nextAction() {
      let name = "";
      let cardInfo = this.$store.state.cardInfo;
      if (cardInfo) {
        name = getNameByCard(cardInfo);
        if (name) {
          if (name === "guangdong") {
            this.go("/" + name + "_checkLicencePlate");
          } else {
            this.go("/" + name + "_applicant");
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-agreement {
  color: #384140;
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    display: flex;
    flex-direction: column;
    height: 100%;

    .checkbox {
      text-align: center;
      font-size: 28px;
      margin-bottom: 40px;
    }
    .content {
      flex: 1;
      padding: 40px;
      overflow: auto;
      p {
        margin-bottom: 2em;
      }
    }

    .footer {
      padding: 40px;
      border-top: 1px solid #ddd;
    }
  }
}
</style>