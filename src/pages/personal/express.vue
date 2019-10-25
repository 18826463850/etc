<template>
    <div class="page page-express">
        <headNav> </headNav>
        <div class="main">
            <div class="list" v-if="list.length > 0">

                    <div class="item"  v-for="(item) in list" :key="item">
                            <div class="item-content">
                                <div class="item-l">
                                    <div class="item-s">{{item.AcceptStation}}</div>
                                    <div class="item-s">{{item.AcceptTime}}</div>
                                </div>
                            </div>
                        </div>


                </div>

             <div class="empty-list" v-if="list.length == 0 && showEmpty">
                 {{reason}}
             </div>
        </div>
    </div>
</template>

<script>
    import FootNav from "@/components/footer/footNav";
    import { tip ,showLoading,hideLoading} from '@/utils'
    export default {
        name: "express",

        components: {
            FootNav,
        },
        data() {
            return {
                list: [],
                showEmpty:false,
                reason: '暂无物流信息'
            };
        },

        created(){
            let name = this.$route.query.name;
            let sCode = this.$route.query.sCode;
            let lCode = this.$route.query.lCode;
            this.getlist(name , sCode , lCode);
        },

        mounted() {
            
        },

        methods: {

            //获取物流信息
            async getlist(name , sCode , lCode) {

                showLoading('加载中');

                var param = {};
                param['OrderCode'] = "";
                param['ShipperCode'] = sCode;
                param['LogisticCode'] = lCode;
                param['CustomerName'] = name;

                var json = JSON.stringify(param);

                let res = await this.$api.expressInfo(json);
                let data = res;
                let list = data && data.Traces;
                console.log(data)

                hideLoading();

                if (data && data.Success) {
                    this.reason = '';
                    if (list) {
                        this.list = list;
                        this.showEmpty = list.length == 0;
                    }

                }else{
                    tip(data.Reason);
                    this.showEmpty = true;
                }

            },
        }
    };
</script>
<style lang="scss" scoped>
.page-express {
    display: flex;
    flex-direction: column;
    height: 100%;

    .main {

        flex: 1;
        overflow: auto;

        
         .empty-list{
             display:flex;
             justify-content: center;
             align-items:center;
             color:#999;
             height:100%;
         }
        .list {

            .item {
                padding: 30px;
                border-bottom: 0.5px solid #dfdfdf;
                font-size: 30px;
                display: flex;
                align-items: center;

                .item-content {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                }
            }
        }
    }
}
</style>