<template>
    <div class="page page-applicationProgress">
        <headNav> </headNav>
        <div class="main">
            <div class="list">
                <div class="listContent step-one">
                        <div class="c-left">
                            <span class="adopt"></span>
                            <span>在线资料提交</span>
                        </div>
                        <div class="c-right btn-link" @click="linkToApplyInfo">
                            申请资料
                        </div>
                    </div>
                    
                <div v-if="status==10">
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>待审核</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>已签收</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>安装激活</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>完成</span>
                    </div>
                </div>

                <div v-else-if="status==20">
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>审核已通过</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>待签收</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>安装激活</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>完成</span>
                    </div>
                </div>

                <div v-else-if="status==30">
                
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>审核已通过</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>已签收</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>待激活</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>完成</span>
                    </div>
                </div>

                <div v-else-if="status==40">
           
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>审核已通过</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>已签收</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>待安装</span>
                    </div>
                    <div class="dashed "></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>完成</span>
                    </div>
                </div>


                <div v-else-if="status==50">
            
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>审核已通过</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>已签收</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>已激活安装</span>
                    </div>
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>完成</span>
                    </div>
                </div>

                <div v-else-if="status==60">
                    <div class="dashed hover"></div>
                    <div class="listContent">
                        <span class="adopt"></span>
                        <span>审核未通过</span>
                    </div>
                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>激活中</span>
                    </div>

                    <div class="dashed"></div>
                    <div class="listContent">
                        <span class="failed"></span>
                        <span>完成</span>
                    </div>
                </div>


            </div>
            <div class="text">
                <div class="t-tit">请按照指引完成安装激活</div>
                <div class="t-tip">确保安装车辆与申办车辆一致，否则将依法追究其责任，并列入黑名单！</div>
            </div>
            <div class="footerBotton">
                <van-button type="primary" class="btn-default" :disabled="btnDisabled" @click="go('/upInstallImg')">下一步
                </van-button>
                <van-button type="primary" v-if="showBtnRefund" :loading="doing" class="btn-default btn-gray"
                    :disabled="btnRefundDisabled" @click="confirmWxRefund">{{btnRefundText}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import FootNav from "@/components/footer/footNav";
    import { Button, Dialog } from "@/vant";
    import { showLoading, hideLoading, tip } from '@/utils'
    export default {
        name: "applicationProgress",
        created() {
            this.status = this.$route.query.status;
            this.applyId = this.$route.query.applyId;
            this.getItem()
        },
        components: {
            FootNav,
            [Button.name]: Button,
        },
        data() {

            return {

                status: '',

                //depositStatus null 为支付  0 已支付 1已退还 2退还中
                //申请记录
                item: {},

                //申请记录id
                applyId: "",

                //是否执行中
                doing: false,

                btnDisabled: true,

                btnRefundDisabled: false


            };
        },

        //检查
        watch: {

            status(v) {
                this.btnDisabled = v != 40;
            }
        },

        computed: {

            btnRefundText() {
                return this.btnRefundDisabled ? '已退还押金' : '退还押金'
            },

            showBtnRefund() {
                return (this.status == '40' || this.status == '50' || this.status == '60') && item.code != "guangzhou";
            }
        },
        methods: {

            async confirmWxRefund() {

                Dialog.confirm({
                    message: '您确定要退还押金吗'
                }).then(() => {
                    this.wxRefund();
                }).catch(() => {

                });

            },


            //退款
            async wxRefund() {

                let res, data;
                let activeApplyItem = this.$store.getx("activeApplyItem");

                if (this.doing) {
                    return false;
                }

                if (!this.applyId) {
                    tip('缺少applyId参数');
                    return false;
                }
                this.doing = true;

                showLoading('退款中');
                res = await this.$api.wxRefund({
                    applyId: this.applyId,
                    channel: activeApplyItem.channel
                });

                data = res && res.data;
                this.doing = false;
                hideLoading();

                if (data && data.code == 200) {
                    tip({
                        icon: "success",
                        title: "退款成功"
                    });
                    this.btnRefundDisabled = true;
                    activeApplyItem.depositStatus = '1';
                    this.$store.setx("activeApplyItem", activeApplyItem);

                } else {
                    tip(data.message || '退款失败');
                }

            },

            //跳转到申请信息
            linkToApplyInfo(){
                this.go('/applyInfo?applyId='+this.applyId)
            },

            //获取当前记录
            getItem() {

                let applyId = this.applyId;
                let activeApplyItem = this.$store.getx("activeApplyItem");
                console.log(activeApplyItem);
                if (applyId && activeApplyItem.applyId == applyId) {
                    this.item = activeApplyItem;
                    this.status = activeApplyItem.status;
                    this.btnRefundDisabled = activeApplyItem.depositStatus != '0' && activeApplyItem.depositStatus != null;
                }
            }

        }
    };
</script>
<style lang="scss" scoped>
    .page-applicationProgress {
        .main {
            .footerBotton {
                width: 90%;
                margin: 50px auto;

                button {
                    margin-bottom: 40px;

                    &.btn-gray {
                        background: #4b0 !important;

                        &.van-button--disabled {
                            background: #ddd !important;
                            color: #555;
                        }
                    }
                }
            }

            .list {
                padding: 30px;

                .listContent {
                    display: flex;
                    align-items: center;

                    &.step-one {
                        display: flex;
                        justify-content: space-between;
                        .c-left{
                            display: flex;
                            line-height:48px;
                        }
                        .btn-link{
                            display:inline-block;
                            padding:0px 20px;
                            line-height:2em;
                            border-radius:50px;
                            color:#fff;
                            font-size:24px;
                            background:#00E0BE
                        }

                    }

                    .adopt {
                        width: 48px;
                        height: 48px;
                        background: url(../../assets/images/adopt.png) no-repeat center center;
                        background-size: 100%;
                        display:inline-block;
                    }

                    .failed {
                        width: 48px;
                        height: 48px;
                        background: url(../../assets/images/Failed.png) no-repeat center center;
                        background-size: 100%;
                    }

                    span {

                        font-size: 30px;
                        display:inline-block;
                        &:first-child {
                            margin-right: 20px;
                        }
                    }
                }

                .dashed {
                    transform: rotate(90deg);
                    position: relative;
                    z-index: 0;
                    left: -135px;
                    width: 160px;
                    height: 160px;
                    border-top: 3px dashed #E5DFDD;

                    &.hover {
                        border-color: #fdc5b8
                    }


                }
            }

            .text {
                background: #F9F7F7;
                width: 100%;
                padding: 40px 30px;
                display: flex;
                flex-flow: wrap;

                .t-tit {
                    display: block;
                    font-weight: normal;
                    font-size: 30px;
                    color: #382C2A
                }

                .t-tip {
                    margin-top: 10px;
                    color: #938583;
                    font-size: 26px;
                }
            }
        }
    }
</style>