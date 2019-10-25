<template>
  <div class="page page-newcard">
      <headNav > </headNav>
    <div class="main">
        敬请期待...
    </div>
    <!-- <foot-nav :selected="1"></foot-nav> -->
  </div>
</template>

<script>
import FootNav from "@/components/footer/footNav";
export default {
    name: "newCard",
    mounted() {},
    components: {
        FootNav
    },
    data() {
        return {
        };
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.page-newcard{
  background: #e9e9e9;
    .main {
        padding: 30px;
     
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
}
</style>

