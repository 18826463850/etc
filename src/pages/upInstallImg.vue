<template>
  <div class="page page-upInstallImg">
  <headNav></headNav>
  <div class="main">
      <exaMineSteps finishs="1" selected="2"></exaMineSteps>
      <div class="form-box">
        <div class="form-group">
            <div class="form-title">
                上传安装图片
            </div>
            <div>
                <div class="upload-boxes">
                    <uploadImg :imgUrl.sync="imgUrl1" title="车头左45°照片"></uploadImg>
                    <uploadImg :imgUrl.sync="imgUrl2" title="车头右45°照片"></uploadImg>
                </div>
                <div class="upload-boxes">
                    <uploadImg :imgUrl.sync="imgUrl3" title="车内全景照片" controlSize="big"></uploadImg>
                </div>
            </div>
        </div>
         <div class="form-group">
            <div class="form-title">
                示例    <span class="upload-tip">请确保拍摄清晰，角度平稳</span>
            </div>
            <div class="img-list">
                  <div class="item">
                      <div class="img">

                        <img src="./../assets/images/car-p1.png"/>
                      </div>
                      <div class="txt">
                        主驾侧身 <br/> （含车牌）
                      </div>
                  </div>

                  <div class="item">
                    <div class="img">

                      <img src="./../assets/images/car-p2.png"/>
                    </div>
                    <div class="txt">
                      副驾侧身 <br/> 
                      （含车牌）
                    </div>
                </div>

                <div class="item">
                  <div class="img">

                    <img src="./../assets/images/car-p3.png"/>
                  </div>
                  <div class="txt">
                    车内全景含 <br/> 
                    智能设备
                  </div>
              </div>


            </div>



         </div>
        <van-button type="primary" @click="uploadImg"  class="btn-default">提交</van-button>
      </div>

    </div>
  </div>
</template>

<script>

  import { Button, Popup } from '@/vant';
  import exaMineSteps from '@/components/examineSteps';
  import {tip,checkMobile,loading,hideLoading,pushHistory}from "@/utils"

  export default {
    name: "login",
    mounted: function () { },
    components: {
      [Button.name]: Button,
      [Popup.name]: Popup,
      exaMineSteps,

    },
    data() {
      return {
        showPopup: false,
        imgUrl1: "",
        imgUrl2: "",
        imgUrl3: "",
        mobile: {}
      };
    },
    watch:{
        imgUrl1(v){
            console.log(v);
            localStorage.setItem('imgUrl1', v)
        },

        imgUrl2(v){
            console.log(v);
            localStorage.setItem('imgUrl2', v)
        },
        imgUrl3(v){
            console.log(v);
            localStorage.setItem('imgUrl3', v)
        }
    },
    mounted() {
        // pushHistory()
        // 监听历史记录点, 添加返回事件监听
        // console.log(this.$route)
        // debugger
        // window.onpopstate = () => {
        //     this.go('./')
        // }
    },
    methods: {
        async uploadImg() {
            if (this.imgUrl1 !== '' && this.imgUrl2 !== '' && this.imgUrl3 !== '') {
                let datas= {
                    "carInstallInfo":{
                    "carInnerImg": this.imgUrl3,
                    "headstockLeftImg": this.imgUrl1,
                    "headstockRightImg": this.imgUrl2
                }
                }
                console.log(datas)
                let {data}  = await this.$api.carInstallInfo(datas);
                    console.log(data)
                if(data.code == 200) {
                    this.go('/submitsuccess')
                }
            } else {
                    tip('请添加车辆图片!')
                    return
            }
        }
    }
  };
</script>
<style lang="scss" scoped>
  .page-upInstallImg {

    .main {
      padding: 36px;
    }

    .img-list{
      display:flex;
      justify-content: space-between;
        .item{
          width:216px;height:312px;
          text-align:center;
          color:#C5BBB9;
              .img{
                // border:1PX dashed #888;
                margin-bottom:20px;
                img{
                width:100%;height:100%;
              }

            }
           .txt{
             font-size:26px;
           }
        }
    }
    .form-title {
      font-size: 36px;
      color: #1C110FFF;
      margin-bottom:20px;
        .upload-tip{
           color:#938583FF;
           font-size:30px;
           margin-left:30px;
        }
    }

    .form-box {
      padding: 40px 0 0 0;
      .btn-orange{
        margin:0px 0 20px 0;
      }
      .form-group{
        margin-bottom:20px;
      }
      .form-item {
        display: flex;
        font-size: 30px;
        color: #382C2AFF;
        padding:30px 0;
        margin-right:-40px;
        border-bottom:1PX solid #F3EFEFFF;
        .form-tit {
          width:160px;
        }

        .form-ipt {
          flex: 1;
          margin-right:40px;
          .ipt {
            width: 100%;
            font-size: 30px;
            padding: 0 20px;
            border: none;
          }

          &.pnumber-ipt{
            display:flex;
   
            .code{
              height:100%;
              color:#40A2ECFF;
              width:250px;
              text-align:center;
              
            }
          }
        }
      }
    }
    .upload-boxes {
      display: flex;
      justify-content: space-between;
      flex-wrap:wrap;

      .up-icon {
      background-image: url("../assets/images/icon-upload.png");
    }

      .upload-box {
        width: 320px;
        height: 200px;
        border: 1PX solid #E8E2E1FF;
        border-radius: 10px;
        margin-bottom:30px;

        .up-wrap {
          padding: 50px 0 0 0;
          text-align: center;
        }

        .up-icon {
          width: 56px;
          height: 42px;
          margin: 0 auto;
        }

        .up-tit {
          font-size: 24px;
          color: #807876FF;
          padding-top: 30px;
        }
      }
    }

  }
</style>