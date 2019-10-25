<template>
    <div class="head-nav" :style="style">
        <div class="nav-back">
          <a href="javascript:;"  @click="goBack" v-if="showBack=='true'">
            <i class="icon-back"></i>
          </a>
        </div>
        <div class=nav-title>{{navTitle}}</div>
        <div class="nav-menu">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
 name: 'headNav',
  computed: {

  },
  props:{

    title:{
      type:String,
      default:""
    },
    showBack:{
      type:String,
      default:'true'
    },

    path:{
      type:String,
      default:''
    },


    headBgColor:{
      type:String,
      default:''
    },
 
  },
  data(){
    return {
           navTitle:"",
    }
  },

  mounted(){

    let routerTitle = this.$router.history.current.meta.title;
    this.navTitle = this.title || routerTitle;
  

    //title
  },

  computed:{
    style(){
      let obj = {};
      if(this.headBgColor){
        obj["background"] = this.headBgColor;
      }
      return obj;
    }
  },
  methods:{

    goBack(){
      if(this.path){
        this.$router.push({
          path:this.path
        });
      }else{
        this.$router.back(-1)
      }

    }

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.head-nav{
   
    height: 88px;
    display: flex;
    /* background:-webkit-linear-gradient(left,#00E0BE,#00E0BE)!important;  */
    background:#00E0BE;

    .nav-back{
         width:81px;
         display: flex;
         justify-content:center;
         align-items:center;
        a{
         display: flex;
         justify-content:center;
         align-items:center;
        }
         .icon-back{
           display:inline-block;
           width:21px;
           height:35px;
           background-size:contain;
           background-repeat: no-repeat;
           background-image:url(../assets/images/i-back.png);
         }
        
    }

    .nav-title{
      flex:1;
      color:#fff;
      font-size:36px;
      line-height:88px;
      text-align:center;
    }
    
    .nav-menu{
      width:81px;
    }
 

}




</style>