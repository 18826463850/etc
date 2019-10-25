<template>
    <div class="foot-nav">

        <router-link class="nav nav-home" to="/home"  :class="{'active':selected==0}">
            <div class="nav-wrap">
                    <i class="n-icon"></i>
            <span class="n-tit">首页</span>
            </div>
          
        </router-link>
     <router-link class="nav nav-shop" to="/shop" :class="{'active':selected==1}" v-if="false">
         <div class="nav-wrap">
                  <i class="n-icon"></i>
                  <span class="n-tit">商城</span>
             </div>
        </router-link>


        <router-link class="nav nav-category" to="/category" :class="{'active':selected==1}" v-if="false">
         <div class="nav-wrap">
                  <i class="n-icon"></i>
                  <span class="n-tit"> 分类</span>
             </div>
        </router-link>

        <router-link class="nav nav-cart" to="/cart" :class="{'active':selected==2}"  v-if="false">
            <div class="nav-wrap">
                <i class="n-icon"></i>
            <span class="n-tit">购物车</span>
            </div>
        </router-link>

        <router-link class="nav nav-user" to="/member" :class="{'active':selected==1}">
            <div class="nav-wrap">
                <i class="n-icon"></i>
                <span class="n-tit">我的</span>
            </div>
        </router-link>

    </div>
</template>


<script>
export default {
 name: 'footNav',
  computed: {

  },
  props:{

    selected:{
        type:Number,
        default:0
    }
  },
  data(){
    return {

    }
  },

  methods:{

  }
}
</script>

<style lang="scss" scoped>

.foot-nav{
    width:100%;
    height:100px;
    border-top:1PX solid #eee;
    background:#fff;
    display:flex;
    align-items:center;
    .nav{
        flex:1;
        text-align:center;
        font-size: 28px;
        color:#B2BCB9;
        &.active{
            color:#00E0BE
        }
    } 


    .n-icon{
        width:46px;
        height:46px;
        display:block;
        margin:0 auto;
        background-size: contain;
        background-repeat:no-repeat;
        margin-bottom:10px;

    }
    .n-tit {
        font-size:22px;
        display:block;
        margin:0 auto;
        line-height:1em;
     }
 
    .nav-home {
        .n-icon{
          background-image: url(../../assets/images/home-b.png);
        }
        &.active .n-icon{
            background-image: url(../../assets/images/home-f.png);
        }
    }
    
    .nav-category {
        .n-icon{
          background-image: url(../../assets/images/category-b.png);
        }
        &.active .n-icon{
            background-image: url(../../assets/images/category-f.png);
        }
    }
    
    .nav-cart{
        .n-icon{
          background-image: url(../../assets/images/cart-b.png);
        }
        &.active .n-icon{
            background-image: url(../../assets/images/cart-f.png);
        }
    }

    .nav-user{
        .n-icon{
          background-image: url(../../assets/images/user-b.png);
        }
        &.active .n-icon{
            background-image: url(../../assets/images/user-f.png);
        }
    }

    
    .nav-shop{
        .n-icon{
          background-image: url(../../assets/images/shop-b.png);
        }
        &.active .n-icon{
            background-image: url(../../assets/images/shop-f.png);
        }
    }
    
}

</style>