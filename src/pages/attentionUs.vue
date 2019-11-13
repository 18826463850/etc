<template>
  <div class="page page-attention">
    <div class="content">
      <img src="../assets/images/attention_header_backgroud.gif" />
      <!-- <img src="../assets/images/attention_header.gif" class="img-view"/> -->
      <div class="detail">
        <img src="../assets/images/attention_content.gif" class="img-view"/>
        <span> &nbsp; &nbsp; &nbsp; "ETC联云"是易停易行旗下所属ETC聚合发行平台,为用户提供ETC免费申请及安装渠道,并致力于打造一站式ETC出行、消费、金融生态圈。 </span>
      </div>

      <img src="../assets/images/attention_ad.gif" class="img-ad"/>
      
      <span class="title">关注即享特权</span>

      <div class="scan">
        <img src="../assets/images/newrun_wechat_scan.jpg" class="scan-img"/>

        <div class="tip">
          <div>①&nbsp; 长按识别二维码</div>
          <div>②&nbsp; 关注</div>
          <img src="../assets/images/finger.png" class="finger"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.page-attention {
  background: #f6f6f8;
  
  .content {
    display: flex;
    flex-direction: column;
    .img-view {
      height: 150px;
      max-width: 100%;
      margin-top: -2px;
    }
    .img-ad {
      height: 400px;
      margin-top: -20px;
    }
    .title{
      color:rgb(82, 211, 75);
      font-size: 36px;
      margin-top: 20px;
      text-align: center;
      width: 100%;
    }
    .scan{
      background: #ffffff;
      border-radius: 20px;
      padding: 20px;
      margin: 20px;
      display: flex;
      justify-content: space-between;
      height: 350px;
      .scan-img {
        width: 300px;
        height: 300px;
      }

      .tip{
        display: flex;
        flex-direction: column;
        .finger{
          width: 150px;
          height: 150px;
          margin: 20px 40px;
        }
      }
    }
    .detail{
      position:relative;
      span{
        position: absolute;
        z-index:2;
        top: 10px;
        left: 10px;
        right: 10px;
        font-size: 24px;
        width: 95%;
        color: #333333;
      }
    }
  }
}
</style>