<template>
    <div class="steps">
        <div class="line"></div>
        <div class="step-list">
            <div class="step" v-for="item in  stepList" :class="{finished:item.finished,selected:item.selected}">
                <div class="num">
                    <div class="num-bg"></div>
                    <div class="num-wrap"> {{item.num}}</div>
                </div>
                <div class="txt">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'applySteps',
        computed: {

        },
        props: {

            title: {
                type: String,
                default: ""
            },
            showBack: {
                type: String,
                default: 'true'
            },

            //多个使用 ，隔开
            finishs: {
                type: String,
                default: ""
            },

            //当前选中
            selected: {
                type: String,
                default: ""
            },

            listType: {
                type: String,
                default: ""
            }
        },
        data() {

            let stepList1 = [

                {
                    num: 1,
                    finished: 0,
                    selected: 0,
                    title: "车主资料"
                },

                {
                    num: 2,
                    finished: 0,
                    selected: 0,
                    title: "车辆资料"
                },

                {
                    num: 3,
                    finished: 0,
                    selected: 0,
                    title: "银行绑定"
                },


                {
                    num: 4,
                    finished: 0,
                    selected: 0,
                    title: "完成提交"
                }
            ];

            let stepList2 = [

                {
                    num: 1,
                    finished: 0,
                    selected: 0,
                    title: "车主资料"
                },

                {
                    num: 2,
                    finished: 0,
                    selected: 0,
                    title: "车辆资料"
                },

                {
                    num: 3,
                    finished: 0,
                    selected: 0,
                    title: "银行绑定"
                },


                {
                    num: 4,
                    finished: 0,
                    selected: 0,
                    title: "收货资料"
                },

                {
                    num: 5,
                    finished: 0,
                    selected: 0,
                    title: "支付押金"
                }
            ];

            return {
                stepList: stepList2
            }
        },

        created() {


            let stepList = this.stepList;
            let finishs = this.finishs;

            if (finishs) {
                finishs = finishs.split(',');
                if (finishs && finishs.length) {
                    for (let d of stepList) {
                        if (finishs.indexOf(d.num + "") > -1) {
                            d.finished = 1;
                        }
                    }
                }
            }

            if (this.selected != "") {
                for (let d of stepList) {
                    if ((d.num + "") == this.selected) {
                        d.selected = 1;
                    }
                }
            }


        },

        methods: {



        },
        mounted() {
            if(this.listType != ""){
                this.stepList.pop()
                this.stepList[2].title = "收货资料"
                this.stepList[3].title = "银行绑定"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .steps {
        position: relative;
        height: 170px;

        .line {
            height: 45px;
            position: absolute;
            width: 98%;
            left: 1%;
            top: 0;
            border-bottom: 2PX dashed #EFA998;
        }

        .step-list {
            display: flex;
            justify-content: space-between;
            position: relative;

            .step {
                text-align: center;

                .num {
                    width: 90px;
                    height: 90px;
                    line-height: 90px;
                    margin: 0 auto;
                    position: relative;

                    .num-bg {
                        width: 150px;
                        height: 174px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-top: -87px;
                        margin-left: -75px;


                    }

                    .num-wrap {
                        color: #73938E;
                        font-size: 44px;
                        border-radius: 50px;
                        margin: 0 auto;
                        background: #E5F1EF;
                        font-weight: bold;
                        position: relative;
                        width: 100%;
                        height: 100%;

                    }
                }

                .txt {
                    margin-top: 30px;
                    color: #6D7574;
                    font-size: 24px;
                }

                &.finished {
                    .num-bg {
                        font-size: 0;
                        border: none;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url("../assets/images/step-select.png");
                    }

                    .num-wrap {
                        display: none;
                    }
                }

                &.selected {
                    .num-bg {
                        font-size: 0;
                        border: none;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-image: url("../assets/images/step-bg.png");
                    }

                    .num-wrap {
                        background: none;
                    }
                }
            }
        }
    }
</style>