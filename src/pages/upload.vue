<template>
  <div class="page page-upload">
    <div class="main">
      <div class="form-box">
        <div class="brick brick-upload">
          <div class="ctc">
            <div class="upload-boxes">
                  <uploadImg :imgUrl.sync="imgUrl" title="上传行驶证正面"></uploadImg>
                  <uploadImg :imgUrl.sync="imgUrl2" title="上传行驶证反面"></uploadImg>
            </div>

            <div class="upload-boxes">
                <uploadImg :imgUrl.sync="imgUrl3" title="上传行驶证正面" controlSize="big"></uploadImg>
            </div>
            
                <!-- <div>{{imgUrl}}</div>
                <div>{{imgUrl2}}</div>
                <div>{{imgUrl3}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 

    export default {
      name: "login",
      components: {

      },
      watch:{
        imgUrl(v){
          console.log(v);
        },

        imgUrl2(v){
          console.log(v);
        }
      },
  
      data() {
        return {
           imgUrl:"",
           imgUrl2:"",
           imgUrl3:""
  
        }
      },
  
      methods: {
  
 

      }
    }
  </script>
<style lang="scss" scoped>
  .page-upload {
    background: #fff;
    .main {
      padding: 30px;
    }
    .upload-boxes {
      display: flex;
      justify-content: space-between;
      margin-bottom:20px;

    }
  }


</style>