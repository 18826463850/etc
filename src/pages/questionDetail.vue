<template>
  <div class="page page-questiondetail">
    <headNav :title="title"></headNav>
    <div class="main">
      {{content}}
      <!-- <div class="content" v-if="id==1">
        <p>
          ETC( Electronic Toll Collection ) 是不停车电子收费系统简称，是指车辆在通过收费站时，通过车载设备实现车辆识别、信息写入并自动从预先绑定的赤兔易行账户或银行账户上扣除相应资金。
       </p>
      </div>

      <div class="content" v-else-if="id==2">
         <p>
          包括OBU电子标签和一张记账卡，电子标签和卡需要配合使用。
         </p>
         <div class="img-box">
          <p>
            <img src="../assets/images/img-etc.jpg" />
         </p> 
         <p>
          （图片仅供参考，以实物为准）
         </p>
         </div>
   
      </div>

      <div class="content" v-else-if="id==3">
        目前一个实名账户支持办理一个ETC。
      </div>

      <div class="content" v-else-if="id==4">
          <p>
            办理流程：在赤兔易行办理ETC，请按照页面申请并提交相关资料，一般申请后请耐心等待ETC发行方审核资料，审核通过后关注物流发货情况。 
          </p>
          <p>
            办理规则：
          </p> 
          <p>
            1、办理要求：赤兔易行实名账户本人的本车办理（ 车主若非本人则无法通过本人的赤兔易行账户申请办理 ）。 
          </p>
          <p>
            2、办理需要提交的资料：赤兔易行实名账户本人的身份证正反面、行驶证正副页。 
          </p>
          <p>
            3、支持办理的车辆类型：7座及以下个人小型汽车办理，支持蓝牌和新能源车牌（绿牌）。 公司车辆、个人货车均不支持办理。  
          </p>
          <p>
            4、办理费用说明：在赤兔易行官方ETC小程序中免费办理ETC，无需设备费、服务费。
          </p>
      </div>

      <div class="content" v-if="id==5">
        <p>
          是，通过赤兔易行办理的ETC在全国联网高速公路的ETC车道均可通行，包括部分已开通ETC通道的停车场也可通行使用。
        </p>
        <p>     
          温馨提示：
        </p>
        <p>
          支持全国29省高速通行（西藏没有高速、海南高速免费、港澳台暂无高速计划）。
        </p>
      </div>-->
    </div>
  </div>
</template>
<script>
import { replaceAll } from "@/utils";
export default {
  name: "morequestion",
  components: {},

  data() {
    let title = "",
      content = "";
    let id = this.$route.query.id || -1;
    let item = this.getItemById(id);

    if (item) {
      this.$route.meta.title = item.question;
      document.title = title = item.question;
      content = replaceAll(item.answer);
    }

    return {
      id,
      title,
      content
    };
  },

  mounted(e) {},

  methods: {
    getItemById(id) {
      let item = this.$store.getx("activeQue");
      if (item && item.id == id) return item;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-questiondetail {
  .main {
    padding: 36px;
  }
  .content {
    line-height: 2em;
    p {
      text-indent: 2em;
    }
    .img-box {
      text-align: center;
      img {
        width: 374px;
        height: 402px;
      }
    }
  }
}
</style>