<template>
        <div class="page page-picker">
          <div class="main">
            <div class="form-item">
              <div class="form-label">
                证件类型
              </div>
              <div class="form-ipt" @click="togglePopup">
                <input type="text"  readonly="readonly" :value="cardType" placeholder="请选择证件类型" />
              </div>
            </div>
 
            <van-popup  v-model="show" position="bottom" :overlay="true">
              <van-picker show-toolbar  :columns="columns" @cancel="onCancel" @confirm="onConfirm"
                @change="onChange" />
            </van-popup>
      
      
          </div>
      
        </div>
      </template>
      <script>
       
      
        import { Button, Popup, Picker, Area } from '@/vant';

        export default {
          name: "login",
          components: {
            // [DropdownMenu.name]:DropdownMenu,
            // [DropdownItem.name]:DropdownItem,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
       
            [Area.name]: Area
      
          },
      
          data() {
            return {
              show: false,
              cardType:"",
              columns: ['身份证', '护照'],
      
            }
          },
      
          methods: {
      
            togglePopup() {
               this.show = !this.show;
            },
            onCancel() {
              this.togglePopup();
            },
            onConfirm(val) {
              this.cardType = val;
              this.togglePopup();
            },
      
            onChange(com,val) {
              console.log("当前变化值："+val);
            },

          }
        }
      </script>
      <style lang="scss" scoped>
        .page-picker{
          .main {
          padding: 30px;
        }
      
        .form-item{
           display:flex;
           align-items:center;
           margin-bottom:30px;
           border-bottom:1px solid #eee;
           padding:20px 0;
           
           .form-ipt{
             flex:1;
             margin-left:40px;
             input{
               width:100%;
               border:none;
             }
           }
        }
        .btn-orange {
          display: block !important;
          background: orange !important;
          border: none !important;
          width: 100% !important;
        }
        }

      </style>