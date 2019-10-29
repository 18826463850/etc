<template>
  <div class="page page-questionConsultation">
    <headNav></headNav>
    <div class="main">
      <div class="tab">
        <div class="tab-menus">
          <div class="item" :class="{active:activeIndex == 0}" @click="switchTab(0)">
            <div class="item-txt">咨询列表</div>
          </div>
          <div class="item" :class="{active:activeIndex == 1}" @click="switchTab(1)">
            <div class="item-txt">问题列表</div>
          </div>
        </div>

        <div class="tab-cts">
          <div class="tab-ct" :class="{active:activeIndex == 0}">
            <div class="brick" v-if="answerList.length>0">
              <h2 class="title">我的留言提问</h2>

              <div class="content">
                <div class="question-list">
                  <div class="item" v-for="item in answerList">
                    <div class="tit">问题：{{item.question}}</div>
                    <div class="ans">回答：{{item.answer}}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="brick">
              <div class="title">请输入您遇到的问题：</div>
              <div class="content">
                <textarea
                  maxlength="150"
                  class="area"
                  placeholder="请描述您所需解答的问题，稍后我们将有客服人员为您解答！"
                  v-model="question"
                ></textarea>

                <van-button
                  type="primary"
                  :loading="doing"
                  class="btn-default"
                  :disabled="btnDisabled"
                  @click="submit"
                >提 交</van-button>
              </div>
            </div>
          </div>
          <div class="tab-ct" :class="{active:activeIndex == 1}">
            <div class="brick brick-faq">
              <div class="title">
                <div class="tit">常见问题</div>
                <router-link to="/questionList" class="more">更多问题</router-link>
              </div>

              <div class="content">
                <div class="question-list">
                  <div class="item" v-for="(item ,index) in faqList" :key="index">
                    <div class="tit">{{index+1}}、{{item.question}}</div>
                    <div class="ans" v-html="item.answer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "@/vant";
import { showLoading, hideLoading, tip, replaceAll } from "@/utils";

export default {
  name: "questionConsultation",
  components: {
    [Button.name]: Button
  },

  data() {
    return {
      question: "",
      answerList: [],
      faqList: [],
      doing: false,
      activeIndex: 0
    };
  },
  computed: {
    btnDisabled() {
      let len = this.question.length;
      return len < 1 || len > 150;
    }
  },
  created() {
    this.getConsult(true);
    this.getFaq();
  },

  methods: {
    switchTab(index) {
      this.activeIndex = index;
    },

    async getFaq() {
      let res, data;
      res = await this.$api.getFaq({
        p: 1,
        s: 20
      });
      data = res && res.data;

      if (data && data.code == 200 && data.data) {
        data = data.data;
        if (data.list) {
          let dataList = data.list;
          for (let i = 0; i < dataList.length; i ++) {
            dataList[i].question = replaceAll(dataList[i].question);
            dataList[i].answer = replaceAll(dataList[i].answer);
          }
          this.faqList = dataList;
        }
      }
    },

    async getConsult(showL) {
      let res, data;

      if (showL) {
        showLoading("加载中");
      }

      res = await this.$api.getConsult({
        p: 1,
        s: 20
      });
      data = res && res.data;

      if (showL) {
        hideLoading();
      }

      if (data && data.code == 200 && data.data) {
        data = data.data;
        if (data.list) {
          this.answerList = data.list;
        }
      }
    },

    //提交表单
    async submit() {
      let res, data;

      if (this.doing) return;
      this.doing = true;

      showLoading("提交中");
      res = await this.$api.addEtcConsult({ question: this.question });
      data = res && res.data;
      this.doing = false;
      if (data && data.code == 200) {
        tip({
          title: "提交成功",
          icon: "success"
        });

        this.question = "";
        this.getConsult();
      } else {
        tip((data && data.message) || "提交失败");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-questionConsultation {
  /* tab-menus */
  height: 100%;
  background: #f8f8f8;
  .btn-default {
    margin: 40px 0;
  }

  .empty-list {
    color: #888;
    height: 50px;
  }
  .brick {
    margin-bottom: 20px;
    background: #fff;
    color: #6a7271;
    padding: 0 36px 36px 36px;
    .title {
      line-height: 100px;
      color: #333;
      font-weight: 400;
    }
    .area {
      width: 100%;
      height: 200px;
      padding: 10px;
      border: 1px solid #bbb;
      &:focus {
        border: 1px solid #777;
      }
    }
    .content {
      font-size: 0.9em;
      .question-list {
        border: 1px solid #bbb;
        padding: 20px;
      }

      .item {
        margin-bottom: 20px;

        .tit {
          margin-bottom: 10px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &.brick-faq {
      .question-list {
        border: 1px dashed #aaa;
        padding: 20px;
      }

      .title {
        display: flex;
        justify-content: space-between;
        .more {
          color: #f4ae88;
        }
      }
      .item {
        .ans {
          color: #8e9696;
        }
      }
    }
  }

  .tab-menus {
    height: 100px;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    margin-bottom: 20px;
    .item {
      flex: 1;
      text-align: center;
      font-size: 32px;
      display: flex;
      .item-txt {
        line-height: 100px;
        margin: auto;
        padding: 0 20px;
        position: relative;
      }

      &.active {
        color: #00e0be;
        .item-txt:after {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          font-weight: bold;
          height: 2px;
          background: #00e0be;
        }
      }
    }
  }

  .tab-cts {
    .tab-ct {
      display: none;
      &.active {
        display: block;
      }
    }
  }
}
</style>


