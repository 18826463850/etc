<template>
  <div class="page page-areaSelect">
    <div class="main">


      <div class="form-item">
        <div class="form-label">
          地区选择
        </div>
        <div class="form-ipt">
          <input type="text" @click="togglePopup" :value="areaVal" placeholder="选择省 / 市 / 区" />
        </div>
      </div>
      <van-button type="primary" @click="togglePopup" class="btn-orange">一键办理</van-button>

      <van-popup v-model="showAreaPopup" position="bottom" :lazy-render="false" get-container="body">
        <van-area ref="area" :loading="!areaListLoaded" :value="data.areaCode" :area-list="areaList"
          @confirm="onAreaConfirm" @cancel="showAreaPopup = false"></van-area>
      </van-popup>
  

    </div>

  </div>
</template>
<script>
  import { isObj } from '@/vant/utils';
  import { Button, Popup, Picker, Area } from '@/vant';
  import areaList from '@/vant/area/demo/area';
  import addressEdit from '@/vant'


  export default {
    name: "login",
    components: {
      // [DropdownMenu.name]:DropdownMenu,
      // [DropdownItem.name]:DropdownItem,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [addressEdit.name]: addressEdit,
      [Area.name]: Area

    },

    data() {


      
      return {
        areaList,
        areaVal:"山西省/太原市/小店区",
        data: {
          country:"",
          province:"", 
          city:"", 
          county:"",
          areaCode:"",
        },
        show: false,
        showAreaPopup: false,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],

        searchResult: [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }, {
          name: '黄龙万科中心G座'
        }, {
          name: '黄龙万科中心H座',
          address: '杭州市西湖区'
        }]

      }
    },

    computed: {


      areaText() {
        const { country, province, city, county, areaCode } = this.data;
 
        if (areaCode) {

          const arr = [country, province, city, county];

          if (province && province === city) {
            arr.splice(1, 1);
          }

          //console.log(arr.filter(text => text).join('/'));

          let areaVal = arr.filter(text => text).join('/');
          this.areaVal = areaVal;

          return areaVal;
        }

        return '';
      },
      areaListLoaded() {
        return isObj(this.areaList) && Object.keys(this.areaList).length;
      },


    },

    methods: {

      setAreaVal(){
        let areaVal = '';
        const { country, province, city, county, areaCode } = this.data;
 
        if (areaCode) {

          const arr = [country, province, city, county];

          if (province && province === city) {
            arr.splice(1, 1);
          }

          //console.log(arr.filter(text => text).join('/'));

         areaVal = arr.filter(text => text).join('/');
        }

        this.areaVal = areaVal;
      },


      onAreaConfirm(values) {
        this.showAreaPopup = false;
        this.assignAreaValues();
        this.$emit('change-area', values);
      },


      assignAreaValues(values) {
        const { area } = this.$refs;
        if (area) {
          const detail = area.getArea();
          detail.areaCode = detail.code;
          delete detail.code;
          console.log(detail);
          Object.assign(this.data, detail);
        }

        this.setAreaVal();
      },

 
      togglePopup() {
        //this.show = !this.show;
        this.showAreaPopup = !this.showAreaPopup;
      },
      onCancel() {
        this.togglePopup();
      },
      onConfirm() {
        this.togglePopup();
      },

      onChange() {


      },

      onSave() {

      },

      onDelete() {

      },

      onChangeDetail() {

      }
    }
  }
</script>
<style lang="scss" scoped>
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
</style>