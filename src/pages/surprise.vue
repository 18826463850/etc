<template>
  <div class="page page-surprise">
    <div class="main" @click="nextAction">

      <h1>广东、云南ETC发行方官方授权</h1>
      
      <img src="../assets/images/surprise.png" class="img" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "surprise",
    components: {
      
    },

    methods: {
      nextAction() {
        this.go('/')
      },
    }
  };
</script>
<style lang="scss" scoped>
  .page-surprise {

    color: #384140;

    .main {
      padding: 40px;
    }

    .img{
        margin-top: 20px;
        top: 0;
        width: 100%;
        height: 100%;
    }

  }
</style>