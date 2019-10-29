<template>
  <div class="page page-morequestion">
    <headNav></headNav>
    <div class="main">
      <div class="question-list">
        <div
          class="item"
          v-for="(item,index ) in moreQuestionList "
          @click="linkTo('/questionDetail?id='+item.id,item.id)"
          :key="index"
        >
          <div class="title">{{index+1}}. {{item.question}}</div>
          <div class="more">
            <div class="txt">查看详情</div>
            <div class="ico"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tip, showLoading, hideLoading, replaceAll } from "@/utils";
export default {
  name: "morequestion",
  components: {},

  data() {
    return {
      moreQuestionList: []
    };
  },

  created() {
    this.getMoreQuestions();
  },

  methods: {
    linkTo(url, id) {
      let queList = this.moreQuestionList;
      let item = queList.find(d => d.id == id);
      if (item) {
        this.$store.setx("activeQue", item);
        this.go(url);
      }
    },
    async getMoreQuestions() {
      let res, data;
      showLoading();
      res = await this.$api.getMoreQuestions({
        p: 1,
        s: 20
      });
      data = res && res.data;

      hideLoading();
      if (data && data.code == 200 && data.data) {
        data = data.data;
        if (data.list) {
          let questionList = data.list
          for (let i = 0; i < questionList.length; i ++) {
            questionList[i].question = replaceAll(questionList[i].question);
          }
          this.moreQuestionList = data.list;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-morequestion {
  .main {
    padding: 36px;
  }
  .question-list {
    .item {
      margin-right: -36px;
      font-size: 30px;
      color: #5e6665;
      border-bottom: 1px solid #ebf0ef;
      display: flex;
      justify-content: space-between;
      padding: 40px 36px 40px 0;
      .more {
        color: #1bdcba;
      }
    }
  }
}
</style>


