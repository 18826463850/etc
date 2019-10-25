<template>
    <div class="page page-activate">
        <headNav> </headNav>
            <div class="item"  v-for="item in list" @click="goActive(item)">
                <span>{{item.name}}</span>
                <b class="list-tail"></b>
            </div>
    </div>
</template>

<script>

    import {tip,showLoading,hideLoading} from '@/utils'

    export default {
        name: "activate",
        mounted: function () { },
        components: {
        },
        data() {
            return {
                list: [],
            };
        },

        watch: {
        },
        created() {
            this.bindEtcCardList();
        },

        methods: {
            async bindEtcCardList(){
                showLoading('加载中');
                let res = await this.$api.getEtcCardList(); 
                let data = res && res.data;
                hideLoading();

                if(data && data.code == 200){
                    this.list = data.data;
                }else if(data.code == 403){
                    tip("登录失效")
                }else{
                    tip(data && data.message || "加载失败")
                }
            },

            goActive(item){
                if(item.province == '广东省'){
                    this.go("/activateQCode")
                }else {
                    tip('暂不支持')
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .page-activate {
        display: flex;
        flex-direction: column;
        height: 100%;
            .item {
                padding: 30px;
                border-bottom: 0.5px solid #dfdfdf;
                font-size: 30px;
                display: flex;
                align-items: center;

                span{
                    width: 100%;
                }

                .list-tail {
                    width: 18px;
                    height: 28px;
                    background: url(../assets/images/jiantou.png) no-repeat center center;
                    background-size: 100%;
                }
            }
}
</style>