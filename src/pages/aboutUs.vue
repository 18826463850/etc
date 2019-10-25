<template>
  <div class="page page-about">
    <headNav> </headNav>
    <div class="main">
      <div class="form-box">
        <img src="../assets/images/newrun.png" class="img" />
        <div>
          深圳市纽润科技有限公司 成立于 2009年，专注于交通行业信息化整体解决方案及城市智能交通产品，是移动出行专业化服务提供商。公司业务涵盖 智慧城市、智能交通、轨道交通、物联网、客流检测监控与预警等 多个领域，自2018年始，公司与业内相关公司精密合作，大力扩展 高速公路不停车收费（ETC）网上发行服务平台 在行业内的应用。
        </div>

        <img src="../assets/images/address.png" class="img_address" />

        <van-button type="primary" class="btn-default" @click="nextAction">立即办理</van-button>
      </div>

    </div>
  </div>
</template>

<script>
  import { Button } from '@/vant';
  import areaList from '@/vant/area/demo/area';


  export default {
    name: "about",
    components: {
      [Button.name]: Button,
    },

    methods: {
      nextAction() {
        this.go('/')
      },
    }
  };
</script>
<style lang="scss" scoped>
  .page-about {

    color: #384140;

    .main {
      padding: 40px;
    }

    .form-title {
      font-size: 36px;
      color: #1C110FFF;
      margin-bottom: 20px;
    }

    .form-box {
      padding: 40px;
      .img{
        top: 0;
        width: 100%;
      }

      .img_address{
        margin-top: 20px;
        width: 100%;
      }

      .btn-default {
        margin-top: 50px;
      }
    }

  }
</style>