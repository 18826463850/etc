<template>
  <div class="upload-box" :class="uploadClassName">
    <div class="up-close" @click="removeUpload" v-show="uploadItem.status!=-1">×</div>
    <div class="up-doing" v-show="uploadItem.status==2">
      <div class="doing-desc">
        <div class="up-progress">{{uploadItem.progress}}</div>
        <div class="up-txt">上传中</div>
      </div>
    </div>
    <div class="up-desc" v-show="uploadItem.status==-1">
      <div class="desc-wrap">
        <div class="up-icon ui-icon"></div>
        <div class="up-tit">{{title}}</div>
      </div>
    </div>
    <div class="up-file" v-show="uploadItem.status==-1">
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
        <label :for="fileId"></label>
      </form>
    </div>
    <div class="up-img" v-show="uploadItem.localUrl!=''">
      <img :src="uploadItem.localUrl" @click="imgPreview" />
    </div>

    <div class="img-preview" v-show="showImgPreview" @click="closeImgPreview">
      <img :src="uploadItem.localUrl" />
    </div>
  </div>
</template>


<script>
import config from "@/config";
import { compressImage, tip } from "@/utils";

export default {
  name: "uploadImg",

  props: {
    //上传标题
    title: {
      type: String,
      default: "图片上传"
    },

    //图片路径
    imgUrl: {
      type: String,
      default: ""
    },

    //控件大小 可选性  small 或者 big
    controlSize: {
      type: String,
      default: "small"
    }
  },

  data() {
    let id = this.createRandomId();

    return {
      id: id,

      //表单id
      formId: "myform_" + id,

      //上传控件id
      fileId: "myfile_" + id,

      //表单dom
      uploadForm: null,

      //上传文件控件dom
      uploadFile: null,

      //上传的队列
      uploadList: [],

      //上传地址
      uploadUrl: config.baseUrl + "/api/uploadFile/uploadFile",

      uploadItem: this.newUploadItem(),

      //样式class
      uploadClassName: "",

      showImgPreview: false,

      fileVal: ""
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.imgUrl) {
        this.uploadItem.status = 4;
        this.uploadItem.localUrl = this.uploadItem.imgUrl = this.imgUrl;
      }

      if (this.controlSize) {
        this.uploadClassName = "upload-" + this.controlSize;
      }

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

    //上传选择改变事件
    uploadChange(e) {
      let that = this;
      let files = this.uploadFile.files;
      //单文件上传
      that.compress(files[0], 0.5);

      //多文件上传
      // for (let i = 0, j = 0; i < files.length; i++) {
      //     let fileObj = files[i];
      //     that.submitUpload(fileObj);
      // }
    },

    compress(fileObj, quality) {
      if (fileObj.size <= 30 * 1024) {
        tip("图片太小,请重新拍摄");
        return;
      }

      if (fileObj.size >= 299 * 1024) {
        compressImage(
          fileObj,
          (file, isOver, quality) => {
            console.log("====================================");
            console.log(file.size);
            console.log("====================================");
            if (isOver) {
              this.compress(file);
            } else {
              if(quality < 0.1){
                tip("图片格式不符合,请重新拍摄");
              }else{
                this.compress(file, quality/2);
              }
            }
          },
          e => {
            this.submitUpload(fileObj);
          },
          quality
        );
      } else {
        this.submitUpload(fileObj);
      }
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
      console.log("====================================");
      console.log(item.size);
      console.log("====================================");

      item.localUrl = window.URL.createObjectURL(fileObj);

      //url = url + "&dt=" + (+new Date());
      // XMLHttpRequest 对象
      xhr = item.xhr = new XMLHttpRequest();

      //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.open("post", url, true);

      //上传开始执行方法
      xhr.upload.onloadstart = function(evt) {
        that.uploadStart(evt, item);
      };

      //上传进度调用方法实现
      xhr.upload.onprogress = function(evt) {
        that.uploadProgess(evt, item);
      };

      //请求完成
      xhr.onload = function(evt) {
        that.uploadComplete(evt, item);
      };

      //请求失败
      xhr.onerror = function(evt) {
        that.uploadFail(evt, item);
      };

      //开始上传，发送form数据
      xhr.send(formData);

      this.uploadList.push(item);
    },

    //上传前回调
    beforeUpload() {},

    //图片预览
    imgPreview() {
      this.showImgPreview = true;
    },

    //关闭图片预览
    closeImgPreview() {
      this.showImgPreview = false;
    },

    //检查上传
    checkUpload() {},

    //上传开始回调
    uploadStart(evt, item) {
      item.uploading = true;

      item.status = 2;

      //设置上传开始时间
      item.uploadStartTime = new Date().getTime();
    },

    //上传过程回调
    uploadProgess(evt, item) {
      var loadedSize;
      var lackTime;
      var speedTxt;
      var progress;
      var that = this;
      var total = evt.total / 2;
      var loaded = evt.loaded / 2;

      //获取当前时间
      var nowTime = new Date().getTime();
      //计算出上次调用该方法时到现在的时间差，单位为s

      var pertime = (nowTime - item.uploadStartTime) / 1000;

      //计算该分段上传的文件大小，单位b
      var perload = loaded - item.loaded;

      //上传速度计算
      var speed = perload / pertime; //单位b/s

      var bspeed = speed;

      var units = "M/秒"; //单位名称

      if (speed / 1024 > 1) {
        speed = parseInt(speed / 1024);
        units = "K/秒";
      }

      if (speed / 1024 > 1) {
        speed = (speed / 1024).toFixed(1);
        units = "M/秒";
      }

      // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
      if (evt.lengthComputable) {
        progress = Math.round((loaded / total) * 100);

        if (progress == 100) {
          progress = 99;
        }

        progress = progress + "%";
      }

      //剩余时间
      lackTime = Math.round((total - loaded) / bspeed);

      //上传速度
      speedTxt = speed + units;

      //重新赋值时间，用于下次计算
      that.uploadStartTime = nowTime;

      //重新赋值已上传文件大小，用以下次计算
      that.loaded = loaded;

      loadedSize = (loaded / 1024 / 1024).toFixed(2);

      Object.assign(item, {
        progress: progress,
        uploadStartTime: nowTime,
        loaded: loaded,
        lackTime: lackTime,
        speed: speed,
        speedTxt: speedTxt,
        loadedSize: loadedSize
      });
    },

    //上传完成回调
    uploadComplete(evt, item) {
      var url;
      var success;
      var target = evt.target;
      var response = target && target.response;
      item.uploading = false;

      if (response) {
        response = JSON.parse(response);
        if (response.code == 200 && response.data) {
          success = true;
          url = response.data;
        } else {
          if (response.message) {
            item.errorMsg = response.message;
          }
        }
      }

      if (success) {
        item.progress = "100%";

        setTimeout(() => {
          item.status = 3;
          item.imgUrl = url;
          this.updateData(url);
        }, 200);
      } else {
        item.status = 4;
      }
    },

    //上传失败回调
    uploadFail(evt, item) {
      item.uploading = false;
      item.status = 4;
      item.errorMsg = JSON.stringify(evt);
    },

    //删除某项上传
    removeItem(item) {
      let list = this.uploadList;
      for (let i = 0; i < list.length; i++) {
        if (list[i].name == item.name) {
          list.splice(i, 1);
          //终止上传
          item.xhr.abort();
          break;
        }
      }
    },

    //移除上传
    removeUpload() {
      this.removeItem(this.uploadItem);
      this.uploadItem = this.newUploadItem();
      this.fileVal = "";
      this.updateData("");
    },

    updateData(url) {
      this.$emit("update:imgUrl", url);
      this.$emit("change", url);
    }
  }
};
</script>

<style lang="scss"  scoped>
.upload-box {
  width: 320px;
  height: 190px;
  border: 1px solid #e8e2e1;
  border-radius: 10px;
  position: relative;
  text-align: center;

  box-sizing: content-box;
  .img-preview {
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 88;
    img {
      flex: 1;
      margin: auto;
      max-width: 100%;
    }
  }
  .up-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    img {
      width: 100%;
      flex: 1;
    }
  }
  .up-file {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    form {
      width: 100%;
      height: 100%;
      input {
        opacity: 0;
        width: 100%;
      }
      label {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        color: #dee5e4;
      }
    }
  }
  .up-close {
    width: 36px;
    height: 36px;
    border-radius: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -18px;
    right: -18px;
    background: #ff5b59;
    z-index: 22;
  }

  .up-doing {
    width: 100%;
    height: 100%;
    display: flex;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .doing-desc {
      margin: auto;
      text-align: center;
      color: #fff;
      font-size: 32px;

      .up-txt {
        font-size: 0.9em;
      }
    }
  }
  .up-desc {
    width: 100%;
    height: 100%;
    display: flex;
    .up-icon {
      background-image: url(../assets/images/icon-upload.png);
    }
    .desc-wrap {
      margin: auto;
      text-align: center;
      .up-icon {
        width: 56px;
        height: 42px;
        margin: 0 auto;
      }

      .up-tit {
        font-size: 24px;
        color: #807876ff;
        padding-top: 30px;
      }
    }
  }

  &.upload-big {
    width: 588px;
    height: 326px;
    .up-close {
      width: 42px;
      height: 42px;
      border-radius: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
    }
    .up-desc {
      .desc-wrap {
        .up-icon {
          width: 112px;
          height: 84px;
          margin: 0 auto;
        }

        .up-tit {
          font-size: 24px;
          color: #807876ff;
          padding-top: 30px;
        }
      }
    }
  }
}
</style>