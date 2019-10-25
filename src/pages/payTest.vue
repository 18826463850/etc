<template>
    <div class="page page-paytest">

        <div class="main">

            <van-button type="primary" class="btn-submit" @click="wxLogin"> 测试微信登录 </van-button>

        </div>

    </div>
</template>

<script>
    import keyboard from "@/components/keyboard/index";
    import { RadioGroup, Radio, Button } from '@/vant';
    import applySteps from '@/components/applySteps'
    import axios from 'axios'
    import wxParam from '@/services/wechat/wechat-param'
    import { getParam } from '@/utils'

    export default {
        name: "keyboardDemo",
        mounted: function () { },
        components: {
            [Button.name]: Button,
            keyboard,
            applySteps
        },
        data() {
            return {
            };
        },

        watch: {
        },
        mounted() {

            //判断当前浏览器环境
            let code = getParam('code');
            console.log('code:' + code);

        },
        methods: {


            wxLogin() {

                let url = window.location.href;
                let ua = navigator.userAgent.toLowerCase();
                let pathname = window.location.pathname;
                let redirect_uri = wxParam.redirectUrl + (pathname ? pathname : '/index');
                redirect_uri = encodeURI(redirect_uri);

                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    document.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxParam.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${wxParam.loginStyle}&state=${wxParam.param}#wechat_redirect`;
                }
            },

            async wxPay() {

                let res;
                let applyInfo = this.$store.getx("applyInfo");
                let id = applyInfo && applyInfo.id;

                //wxPay
                console.log(applyInfo);

                if (id) {
                    res = await this.$api.wxPay({ applyId: id });
                    console.log(res);
                }
            }


        }
    };
</script>

<style lang="scss">
    .page-paytest {
        .page {
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #F8F8F8;
        }

        .page-pay {



            .main {
                display: flex;
                flex-direction: column;
                font-size: 32px;
                flex: 1;

                padding: 20px;

            }

            .content {
                flex: 1;
                box-sizing: border-box;

                .steps-box {
                    padding: 36px;
                    margin-bottom: 20px;
                    background: #fff;
                }

                .goods-box {
                    display: flex;
                    height: 240px;
                    justify-content: space-between;
                    align-items: center;
                    background: #fff;
                    margin-bottom: 20px;

                    .goods {
                        display: flex;
                        align-items: center;

                        .img {
                            width: 240px;
                            height: 240px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                    }

                    .price {
                        color: red;
                        font-size: 40px;
                        padding-right: 36px;
                    }
                }

                .goods-tip {
                    padding: 36px;
                    background: #fff;
                }
            }

            .footer {

                display: flex;
                height: 100px;
                line-height: 100px;
                background: #fff;

                .total-box {

                    flex: 1;
                    font-size: 40px;
                    padding: 0 0 0 36px;
                    color: #333;

                    .money {
                        color: red;
                    }
                }

                .btn-box {
                    width: 300px;

                    .btn-submit {
                        width: 100%;
                        height: 100%;
                        font-size: 32px;
                    }
                }


            }
        }
    }
</style>