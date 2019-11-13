<template>
  <div class="page page-profile">
    <headNav></headNav>
    <div class="main">
      <div class="form-box">
        <div class="form-item mb20">
          <div class="form-tit">头像</div>
          <div class="form-ipt">
            <div class="avatar" @click="imgPreview">
              <img src="../../assets/images/member-head.png" alt v-if="!user.headimgurl" />
              <img :src="user.headimgurl" alt v-else />
            </div>
          </div>
        </div>
        <div class="form-item line">
          <div class="form-tit">昵称</div>
          <div class="form-ipt">
            <input type="text" v-model="user.nickname" />
          </div>
        </div>

        <div class="form-item mb20">
          <div class="form-tit">手机号 {{mobileTxt}}</div>
          <div class="form-ipt">
            <span class="btn-link" v-if="user.whetherSetPass==1" @click="go('/mobileCheck')">设置密码</span>
            <span class="btn-link" v-if="user.whetherSetPass==0" @click="go('/modifyPass')">修改密码</span>
          </div>
        </div>

        <!-- <div class="form-item item-btn">
          <van-button type="primary" :loading="doing" class="btn-default btn-save" @click="save">保 存</van-button>
        </div> -->
      </div>

      <div class="img-preview-profile" v-show="showImgPreview">
        <div class="img-close" @click="closeImgPreview">X</div>

        <img :src="user.headimgurl" @click="closeImgPreview" />

        <div class="footerButton" >
          <form method="post" :id="formId" :name="formId">
            <input
              accept="image/*"
              class="files"
              @change="uploadChange"
              :id="fileId"
              type="file"
              :name="fileId"
              multiple="false"
              :value="fileVal"
            />
          </form>
          <label :for="fileId">
            选择图片
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "@/vant";
import {
  tip,
  checkMobile,
  showLoading,
  hideLoading,
  checkValidCode
} from "@/utils";
import config from "@/config";

export default {
  name: "profile",
  mounted: function() {},
  components: {
    [Button.name]: Button
  },
  data() {
    let id = this.createRandomId();

    return {
      id: id,

      //表单id
      formId: "myform_" + id,

      //上传控件id
      fileId: "myfile_" + id,

      fileVal: "",

      //表单dom
      uploadForm: null,

      //上传文件控件dom
      uploadFile: null,

      //上传的队列
      uploadList: [],

      //上传地址
      uploadUrl: config.baseUrl + "/api/uploadFile/uploadFile",

      uploadItem: this.newUploadItem(),

      doing: false,
      user: null,
      mobileTxt: "",
      showImgPreview: false
    };
  },

  watch: {},

  created() {
    let user = this.$store.state.user;
    if (user) {
      this.user = user;
      this.mobileTxt = this.user.mobile.replace(
        /(\d{3})\d{4}(\d{4})/,
        "$1****$2"
      );
    }
  },
  computed: {},

  mounted() {
    this.init();
  },

  methods: {
    //唯一id
    createRandomId() {
      return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random()
          .toString()
          .substr(2, 5)
      );
    },

    //图片预览
    imgPreview() {
      this.showImgPreview = true;
    },

    //关闭图片预览
    closeImgPreview() {
      this.showImgPreview = false;
    },

    init() {
      this.setDom();
    },

    //设置dom节点
    setDom() {
      this.uploadForm = document.getElementById(this.formId);
      this.uploadFile = document.getElementById(this.fileId);
    },

    //初始化一个上传选项
    newUploadItem() {
      return {
        //异步请求对象
        xhr: null,

        fileObj: null,

        //文件名称
        name: "",

        //文件格式
        ext: "",

        //文件大小
        size: 0,

        //上传速度
        speed: 0,

        //上传速度包含单位
        speedTxt: "",

        //剩余时间
        lackTime: 0,

        //上传状态
        //-1 未初始化
        //1 等待中
        //2 上传中
        //3 上传成功
        //4 上传失败
        status: -1,

        //上传开始时间
        uploadStartTime: "",

        //每次已上传
        loaded: 0,

        //已上传大小
        loadedSize: 0,

        //正在上传
        uploading: false,

        //上传进度百分比
        progress: 0,

        //文件图标
        icon: "",

        //本地地址
        localUrl: "",

        //服务器地址
        imgUrl: ""
      };
    },

    //上传选择改变事件
    uploadChange(e) {
      let that = this;
      let files = this.uploadFile.files;
      //单文件上传
      that.submitUpload(files[0]);

      //多文件上传
      // for (let i = 0, j = 0; i < files.length; i++) {
      //     let fileObj = files[i];
      //     that.submitUpload(fileObj);
      // }
    },

    //提交上传
    submitUpload(fileObj) {
      var xhr;
      var fileObj;
      var formData;
      var that = this;
      var url = this.uploadUrl;
      var item = this.uploadItem;

      item.status = 1;
      item.fileObj = fileObj;
      item.name = fileObj.name;
      item.size = (fileObj.size / 1024).toFixed(2);
      item.ext = item.name
        .split(".")
        .pop()
        .toLowerCase();

      if (item.size > 1024) {
        item.size = (item.size / 1024).toFixed(1) + "M";
      } else {
        item.size = parseInt(item.size) + "Kb";
      }

      formData = new FormData(); // FormData 对象
      formData.append("file", fileObj);

      item.localUrl = window.URL.createObjectURL(fileObj);

      //url = url + "&dt=" + (+new Date());
      // XMLHttpRequest 对象
      xhr = item.xhr = new XMLHttpRequest();

      //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.open("post", url, true);

      //上传开始执行方法
      xhr.upload.onloadstart = function(evt) {};

      //上传进度调用方法实现
      xhr.upload.onprogress = function(evt) {};

      //请求完成
      xhr.onload = function(evt) {
        that.uploadComplete(evt, item);
      };

      //请求失败
      xhr.onerror = function(evt) {
        that.uploadFail(evt);
      };

      //开始上传，发送form数据
      xhr.send(formData);

      this.uploadList.push(item);
    },

    //上传完成回调
    uploadComplete(evt, item) {
      var url;
      var success;
      var target = evt.target;
      var response = target && target.response;
      hideLoading();

      if (response) {
        response = JSON.parse(response);
        if (response.code == 200 && response.data) {
          success = true;
          url = response.data;
        } else {
          if (response.message) {
            tip(response.message);
          }
        }
      }

      if (success) {
        setTimeout(() => {
          item.imgUrl = url;
          this.updateData(url);
        }, 200);
      } else {
      }
    },

    //上传失败回调
    uploadFail(evt) {
      hideLoading();
      tip(JSON.stringify(evt));
    },

    updateData(url) {
      this.user.headimgurl = url;
      this.closeImgPreview();
      this.$emit("update:imgUrl", url);
      this.$emit("change", url);
    },

    //保存
    async save() {
      let res, data;
      let user = this.user;
      let datas = {
        id: user.id,
        nickname: user.nickname,
        headimgurl: user.headimgurl
      };

      showLoading("保存中");
      res = await this.$api.updateUserInfo(datas);
      data = res && res.data;

      if (data && data.code == 200) {
        tip("保存成功");
        this.$store.commit("setUser", datas);
      } else {
        tip((data && data.message) || "保存失败");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-profile {
  background: #f8f8f8;
  height: 100%;
  .main {
  }

  .img-preview-profile {
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    z-index: 88;

    .img-close {
      color: #fff;
      position: fixed;
      top: 0;
      right: 0;
      padding: 20px;
    }

    img {
      margin: auto;
      object-fit: fill;
      max-width: 100%;
    }

    .footerButton {
      padding: 30px 40px;
      background: #fff;
      align-items: center;
      display: flex;
      flex-direction: column;
      input{
        opacity: 0;
      }
      label{
        background: #197e4b;
        color: #fff;
        padding: 20px;
        width: 400px;
        text-align: center;
        align-items: center;
        border-radius: 10px;
        display: inline-block;
      }
    }
  }

  .form-title {
    color: #555;
    margin: 0 -40px 0 -40px;
    background: #f9fbfa;
    padding: 0px 40px;
    line-height: 100px;
    height: 100px;
  }

  .form-item {
    font-size: 30px;
    display: flex;
    padding: 40px 40px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    position: relative;

    &.mb20 {
      margin-bottom: 20px;
    }
    &.line {
      &:after {
        content: "";
        position: absolute;
        left: 40px;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #f8f8f8;
      }
    }

    .form-ipt {
      color: #6a7271;
      input {
        border: none;
        text-align: right;
        background: #fff;
      }
      .btn-link {
        display: inline-block;
        padding: 0px 20px;
        line-height: 2em;
        border-radius: 50px;
        color: #fff;
        font-size: 24px;
        background: #00e0be;
      }
    }

    &.item-btn {
      padding: 0;
      .btn-save {
        background: #fff !important;
        color: #333;
        box-shadow: none !important;
        border-radius: none !important;
      }
    }
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

