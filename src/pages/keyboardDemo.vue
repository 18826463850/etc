<template>
  <div class="page page-keyboarddemo">
   <keyboard :licencePlate.sync="licencePlate" ></keyboard>
 </div>
</template>
<script>
    import keyboard from "@/components/keyboard/index";
    
    export default {
        name: "keyboardDemo",
        mounted: function() {},
        components: {
            keyboard
        },
        data() {
            return {
                licencePlate:"粤123456789"
            };
        },
        watch: {
            licencePlate(v){
                 //console.log(v);
            }
        },
        created() {
        },
        methods: {


        }
    };
</script>

<style lang="scss">
   .page-keyboarddemo{
       padding:20px;
   }
</style>