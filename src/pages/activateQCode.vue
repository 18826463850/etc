<template>
    <div class="page page-activate">
        <headNav> </headNav>
        <div class="main">
            <div class="content">
                <div class="ewm-box">
                    <div class="img">
                        <img src="../assets/images/acvite_ewm_gd.png" />
                    </div>
                    <div class="tit">
                        <p>识别二维码，进行设备激活</p>
                        <p>长按识别二维码</p>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: "activate",
        mounted: function () { },
        components: {


        },
        data() {
            return {
            };
        },

        watch: {
        },
        created() {
        },
        methods: {




        }
    };
</script>

<style lang="scss">
    .page-activate {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #F8F8F8;

        .main {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80%;

            .content {
                text-align: center;

                .ewm-box {

                    .img {
                        width: 420px;
                        height: 420px;
                        margin-bottom: 40px;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .tit {
                        font-size: 36px;
                        line-height: 1.75em;

                    }
                }

            }

        }

    }
</style>