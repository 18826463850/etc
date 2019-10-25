<template>
  <div class="page page-test">
 
    <foot-nav :selected="1"></foot-nav>
  </div>
</template>
<script>
  import FootNav from "@/components/footer/footNav";
  export default {
    name: "login",
    mounted: function () { },
    components: {
      FootNav,
    },
    data() {
      return {


      };
    },

    watch: {


    },
    created() {

    },
    methods: {




    }
  };
</script>
<style lang="scss" scoped>
  .page-test{

    display: flex;
    flex-direction: column;
    height: 100%;
    .foot-nav {
      position: static;
    }

    .main {

      position: relative;
      flex: 1;
      overflow: auto;

      .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height:660px;
        background: #E73B00;

        img {
          width: 100%;
        }

      }

      .wrap {
        position: relative;
        padding: 400px 35px 60px 35px;

        .label {
          height: 328px;
          border-radius: 25px;
          background-color: #ffffff;
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.12);
          padding: 80px 0 0 0;

          .haha {
            display: flex;
            margin-left: 90px;

            .one {
              img {
                width: 36px;
                height: 38px;
              }
            }

            .one2 {
              width: 290px;

              span {
                // position: absolute;
                margin-left: 16px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(96, 100, 112, 1);
                line-height: 30px;
              }
            }

            .one3 {
              span {
                margin-left: 16px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(96, 100, 112, 1);
                line-height: 30px;
              }
            }

            .one1 {
              img {
                width: 36px;
                height: 38px;
              }
            }

          }

          .haha1 {
            display: flex;
            margin-top: 63px;
            margin-left: 90px;
            .one {

              // width:680px;
              img {
                width: 36px;
                height: 38px;
              }
            }

            .one2 {
              width: 290px;

              span {
                // position: absolute;
                margin-left: 16px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(96, 100, 112, 1);
                line-height: 30px;
              }
            }

            .one3 {
              span {
                margin-left: 16px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(96, 100, 112, 1);
                line-height: 30px;
              }
            }

            .one1 {
              img {
                width: 36px;
                height: 38px;
              }
            }
          }


        }

        .link {
          height: 274px;
          background-color: #EB5836;
          border-radius: 25px;
      
          margin-top: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.16);
          .text-font {

            .big {
              font-size: 48px;
              text-align: center;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 66px;
            }

            .small {
              text-align: center;
              font-size: 40px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #FFAB9B;
              line-height: 56px;

              .img {
                margin-left: 10px;
                width: 42px;
                height: 32px;
              }
            }
          }


        }
      }

    }
  }
</style>