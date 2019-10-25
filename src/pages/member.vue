<template>
    <div class="page page-member">
        <div class="main">
            <div class="userinfo" v-if="!isLogin" @click="goLogin">
                <div class="avatar">
                    <img src="../assets/images/member-head.png" alt="">
                </div>
                <div class="login">立即登录</div>
            </div>

            <div class="userinfo" v-else @click="go('/profile')">
                <div class="user-avatar">
                    <img src="../assets/images/member-head.png" alt="" v-if="!avatar">
                    <img :src="avatar" alt="" v-else>
                </div>
                <div class="user-name">{{nickname}}</div>
            </div>


            <div class="list">
                <ul>
                    <li>
                        <router-link class="router" to="/apply">
                            <b class="list-head">
                                <img src="../assets/images/newCard.png" alt="">
                            </b>
                            <span>新卡申办</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router" to="/applicationRecord">
                            <b class="list-head">
                                <img src="../assets/images/applicationRecord.png" alt="">
                            </b>
                            <span>ETC申请记录</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router" to="/cardList">
                            <b class="list-head">
                                <img src="../assets/images/cardList.png" alt="">
                            </b>
                            <span>发行卡列表</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router" to="/invoice">
                            <b class="list-head">
                                <img src="../assets/images/invoice.png" alt="">
                            </b>
                            <span>ETC发票</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router" to="/trafficRecord">
                            <b class="list-head">
                                <img src="../assets/images/trafficRecord.png" alt="">
                            </b>
                            <span>ETC通行记录</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="router" to="/onlineService">
                            <b class="list-head">
                                <img src="../assets/images/onlineService.png" alt="">
                            </b>
                            <span>在线客服</span>
                            <b class="list-tail"></b>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="footerBotton" v-if="isLogin">
                <van-button type="primary" :loading="doing" class="btn-default btn-outlogin" loading-text="'退出中...'"
                    @click="confirmOutLogin">退出登录</van-button>
            </div>

        </div>
        <foot-nav :selected="1"></foot-nav>
    </div>
</template>
<script>
    import FootNav from "@/components/footer/footNav";
    import { Button, Popup, Dialog } from "@/vant";
    import { tip } from '@/utils'

    export default {
        name: "member",
        mounted() { },
        components: {
            FootNav,
            [Button.name]: Button,
            [Popup.name]: Popup
        },
        data() {

            let mobile = '';
            let nickname = '';
            let avatar = '';
            let user = this.$store.state.user;

            if (user) {
                nickname = user.nickname;
                avatar = user.headimgurl;

                if (!nickname) {
                    nickname = user.mobile;
                }
            }
            console.log(user);

            return {

                doing: false,

                //手机号
                mobile: mobile,

                //昵称
                nickname: nickname,

                //头像
                avatar: avatar,

                isLogin: this.$store.state.isLogin,
            };
        },
        computed: {

        },
        methods: {

            goLogin() {

                if (!this.isLogin) {
                    this.$router.push({ path: '/login' });
                }
            },
            async confirmOutLogin() {


                Dialog.confirm({
                    message: '确定要退出登录吗'
                }).then(() => {
                    this.outLogin();
                }).catch(() => {

                });

            },


            async outLogin() {
                if (this.doing) return;
                this.doing = true;

                let res = await this.$api.outLogin({
                    mobile: this.$store.user && this.$store.user.mobile || '13714949574'
                });

                if (res && res.data) {
                    if (res.data.code == 200) {
                        this.$store.dispatch('outLogin');
                        this.$router.push({ path: '/login' });
                    }
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .page-member {
        height: 100%;
        background: #fff;
        display:flex;
        flex-direction: column;
        .main {
            flex:1;
    
  
            background: #fff;
             overflow:auto;
            .login {
                color: #fff;
            }

            .footerBotton {
                padding: 20px 0;
                background: #F8F8F8;

                .btn-outlogin {
                    background: #fff !important;
                    color: #333;
                    box-shadow: none !important;
                    border-radius: none !important;
                }
            }

            .userinfo {
                width: 100%;
                padding: 20px 0;
                background: #1BDCBA;
                display: flex;
                flex-direction: column;
                align-items: center;

                .user-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 120px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-name {
                    text-align: center;
                    font-size: 36px;
                    color: #fff;

                    b {
                        display: inline-block;
                        width: 22px;
                        height: 44px;
                        background: url(../assets/images/phone.png) no-repeat center center;
                        background-size: 100% 80%;
                    }

                }
            }

            .list {
                ul {
                    li {
                        .router {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 120px;
                            margin: 10px 0;
                            padding: 0 30px;

                            .list-head {
                                img {
                                    display: flex;
                                    align-items: center;
                                    width: 34px;
                                    height: 36px;
                                }
                            }

                            span {
                                margin-left: 20px;
                                flex-grow: 3;
                                color: #333;
                                font-size: 30px;
                            }

                            .list-tail {
                                width: 18px;
                                height: 28px;
                                background: url(../assets/images/jiantou.png) no-repeat center center;
                                background-size: 100%;

                            }

                        }
                    }
                }
            }
        }
    }
</style>