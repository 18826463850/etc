<template>
  <div class="page page-applicationRecord">
    <headNav></headNav>
    <div class="main">
      <div class="list" v-if="list.length > 0">
        <div class="item" v-for="(item , index) in list" :key="item">
          <div class="item-content">
            <div class="item-l">
              <div class="item-s">车牌：{{item.licencePlate}}</div>
              <div class="item-s">卡号：{{item.bankNo?item.bankNo:'暂无' }}</div>
              <div class="item-s">申请人：{{item.applyInfoName}}</div>

              <div class="item-s" v-if="item.status === '5' && item.applyStatus== 3">状态：待审核</div>
              <div class="item-s" v-else-if="item.status === '8' && item.applyStatus== 3">状态：已完成</div>
              <div class="item-s" v-else-if="item.status === '10' && item.applyStatus== 3">状态：待审核</div>

              <div class="item-s" v-if="item.expCompany">快递公司：{{item.expCompanyName}}</div>
              <div class="item_express" v-if="item.expOrderNo">
                <div class="item-s">快递单号：</div>
                <div class="item_express_no" @click="goExpress(item)">{{item.expOrderNo}}</div>
              </div>
            </div>
            <div class="item-r">
              <div class="item-in">
                <div class="s-status" v-if="item.applyStatus==1">申请中</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '10'">待审核</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '20'">待收货</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '30'">待激活</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '40'">待安装</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '50'">已完成</div>
                <div
                  class="s-status under"
                  v-else-if="item.status === '60'"
                  @click="showDialog(item.failReason)"
                >审核未通过</div>
                <div class="s-status" v-else-if="item.applyStatus==2 && item.status === '70'">已取消</div>

                <!-- <div
                  v-if="(item.applyStatus==2 || item.applyStatus == 3) && (item.status !=='60' || item.status !=='70')"
                  class="checkProgress"
                  @click="toLink(item,'applicationProgress')"
                >查看进度</div> -->
                <div
                  v-else-if="item.applyStatus==1 && item.status=='1'"
                  @click="toLink(item,item.code + '_bindBank')"
                  class="checkProgress"
                >继续申请</div>
                <div
                  v-else-if="item.applyStatus==1 && item.status=='2'"
                  @click="toLink(item,item.code + '_address')"
                  class="checkProgress"
                >继续申请</div>
                <div
                  v-else-if="item.applyStatus==1 && item.status=='3'"
                  @click="toLink(item,'pay')"
                  class="checkProgress"
                >继续申请</div>

                <div
                  v-if="item.status === '10'"
                  class="checkProgress"
                  @click="update(item , index)"
                >刷新进度</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-list" v-if="list.length == 0 && showEmpty">暂无数据</div>
    </div>

    <div class="footerBotton">
      <router-link to="/apply">
        <van-button type="primary" class="btn-default">申请办理</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import FootNav from "@/components/footer/footNav";
import { Button, Dialog } from "@/vant";
import { tip, showLoading, hideLoading } from "@/utils";
export default {
  name: "applicationRecord",

  components: {
    FootNav,
    [Button.name]: Button
  },
  data() {
    return {
      list: [],
      showEmpty: false
    };
  },

  mounted() {
    this.getlist();
    this.$store.dispatch("clearActiveApplyItem");
  },

  methods: {
    toLink(item, path) {
      let applyId = item.applyId;
      let channel = item.channel;

      for (let d of this.list) {
        if (d.applyId == applyId) {
          this.$store.commit("setActiveApplyItem", d);
          break;
        }
      }

      this.go(path + `?applyId=${applyId}&channel=${channel}`);
    },

    update(item, index) {
      if (item.code == "guangdong") {
        this.updateGd(item, index);
      } else {
        this.updateYn(item, index);
      }
    },

    async updateGd(item, index) {
      showLoading("刷新中");
      let res = await this.$api.checkOrderGuangDong({
        applyId: item.applyId
      });

      let data = res && res.data;
      hideLoading();
      if (data && data.code == 200) {
        tip("刷新成功");
        if (data.data) {
          this.list[index].status = data.data.status;
          this.list[index].expCompany = data.data.expCompany;
          this.list[index].expOrderNo = data.data.expOrderNo;
        }
      } else {
        tip(data.data || data.message || "刷新失败");
      }
    },

    async updateYn(item, index) {
      showLoading("刷新中");
      let res = await this.$api.checkOrderYunnan({
        applyId: item.applyId
      });

      let data = res && res.data;
      hideLoading();
      if (data && data.code == 200) {
        tip("刷新成功");
        if (data.data) {
          this.list[index].status = data.data.status;
          this.list[index].expCompany = data.data.expCompany;
          this.list[index].expOrderNo = data.data.expOrderNo;
        }
      } else {
        tip(data.data || data.message || "刷新失败");
      }
    },

    //获取申请记录列表
    async getlist() {
      showLoading("加载中");

      let res = await this.$api.selectApplyRecord();
      let data = res && res.data;
      let list = data && data.data;

      hideLoading();

      if (data && data.code == 200) {
        if (list) {
          for (let d of list) {
            if (d.code === "guangdong") {
              d.applyStatus = +d.status < 4 ? 0 : 3;
            } else {
              d.applyStatus = +d.status < 4 ? 1 : 2;
            }

            if (d.expCompany === "SF") {
              d.expCompanyName = "顺丰";
            } else {
              d.expCompanyName = "EMS";
            }
          }

          this.list = list;
          this.showEmpty = list.length == 0;
        }
      } else {
        tip(data.data || data.message || "加载失败");
        this.showEmpty = true;
      }
    },

    //获取申请记录
    async getApplyInfo(id) {
      let res = await this.$api.getApplyInfo({
        applyId: id,
        code: "1,2,3,4,5"
      });
    },

    goExpress(item) {
      this.go(
        "/express" +
          "?name=" +
          item.shippingName +
          "&sCode=" +
          item.expCompany +
          "&lCode=" +
          item.expOrderNo
      );
    },
    showDialog(reason) {
      Dialog.alert({
        confirmButtonText: "我知道了",
        message: reason
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-applicationRecord {
  display: flex;
  flex-direction: column;
  height: 100%;

  .footerBotton {
    padding: 30px 40px;
    background: #ffff;
  }

  .main {
    flex: 1;
    overflow: auto;

    .top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eb5836;

      .phone {
        display: flex;
        align-items: center;

        b {
          display: inline-block;
          width: 22px;
          height: 44px;
          background: url(../../assets/images/phone.png) no-repeat center center;
          background-size: 100% 80%;
        }

        span {
          margin-left: 20px;
          font-size: 36px;
          color: #fff;
        }
      }
    }

    .empty-list {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      height: 100%;
    }
    .list {
      .item {
        padding: 30px;
        border-bottom: 0.5px solid #dfdfdf;
        font-size: 30px;
        display: flex;
        align-items: center;

        .item-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          .item_express {
            display: flex;
            justify-content: flex-start;
            .item_express_no {
              color: rgb(100, 177, 77);
            }
          }

          .item-r {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .item-in {
              text-align: right;
              div:first-child {
                margin-bottom: 1em;
              }
            }
          }

          .s-tit {
            font-weight: normal;
            color: #382c2a;
          }

          .s-num {
            margin-left: 30px;
            flex-grow: 3;
            color: #6a615f;
          }

          .checkProgress {
            font-size: 26px;
            color: #f4ae88;
          }

          .s-status {
            font-size: 26px;
            color: #ea855b;
            font-style: normal;
            &.under {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>