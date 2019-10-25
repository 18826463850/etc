<template>
    <div class="page page-submit">
        <headNav showBack="false"> </headNav>
        <div class="success">
            <div class="ico">
                <img src="../assets/images/su.png" />
            </div>
            <h1>申请成功，申请信息审核中</h1>
            <h2>为避免影响您的行程，请及时关注审核结果！</h2>
            <p>注：审核结果将已短信的方式通知您，请注意查收短信，审核不通过将进入黑名单，无法走ETC车道。</p>
        </div>
        <div class="btn">
            <div class="pink">
                <!--  @click="togglePopup" -->
                <router-link to="./"></router-link>
                    <van-button type="primary" class="btn-yellow" style="float:left;color:rgba(235,88,54,1)" @click="goHome">返回首页
                    </van-button>
                </router-link>
                <div class="orange">
           
                        <van-button type="primary" class="btn-default" style="float:left"  @click="go('/applicationRecord')">查看详情</van-button>
         
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Button } from '@/vant';
    import { tip, checkMobile, loading, hideLoading, pushHistory } from "@/utils"
    export default {
        name: "login",
        mounted() {

        },
        components: {
            [Button.name]: Button,
        },
        methods:{
             goHome(){
                this.$router.replace({ path:'/' });
             }
        }
    };
</script>
<style lang="scss" scoped>
    .page-submit {

        .success {
            position: relative;
            text-align:center;
            .ico {
                margin-top: 150px;
              

                img {
                    width: 168px;
                    height:152px;
                }

            }

            h1 {
                margin-top: 34px;
                text-align: center;
                font-size: 36px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(56, 44, 42, 1);
                line-height: 50px;
            }

            h2 {
                margin-top: 24px;
                margin-left: 76px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(152, 139, 137, 1);
                line-height: 42px;
            }

            p {
                margin-top: 24px;
                margin-left: 76px;
                margin-right: 74px;
                font-size: 30px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(197, 187, 185, 1);
                line-height: 42px;
            }
        }

        .btn {
            position: relative;
            margin-top: 150px;

            .pink {
                margin-left: 36px;
                width: 320px;
                height: 96px;

                .orange {
                    margin-right: 36px;
                    margin-left: 364px;
                    width: 320px;
                    height: 96px;
                }
            }

        }

    }
</style>