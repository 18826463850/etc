<template>
    <div class="page page-activateEtcList">
        <div class="main">
       
        </div>

    </div>
</template>
<script>

    import { Swipe, SwipeItem } from '@/vant';
    import FootNav from "@/components/footer/footNav";
    import wxShare from '@/services/wechat/wechat-share'
    import { isInWeiXin } from '@/utils'

    export default {
        name: "index",
        mounted() { },
        components: {
            FootNav,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem

        },
        data() {
            return {
                images: [

                    require("../assets/images/bg-green1.jpg"),
                    // require("../assets/images/bg-green2.jpg"),
                    require("../assets/images/bg-green3.jpg")
                ]

            };
        },

        watch: {},
        created() {
        },
        mounted() {

            setTimeout(() => {
                wxShare();
            }, 1000)

        },
        methods: {}
    };
</script>
<style lang="scss" scoped>
    .page-activateEtcLis {
        display: flex;
        flex-direction: column;
        height: 100%;

        .main {
            flex: 1;
            overflow: auto;

        }
    }
</style>