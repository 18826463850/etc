 import * as applyRouter from '@/router/applyRouter'


let mixin = {
    methods: {

        /**
         * 设置数据 附加小程序setData方法
         * @param {*} data 
         */
        setData: function (data) {
            for (let k in data) {
                if (data[k] !== undefined) {
                    this[k] = data[k];
                }
            }
        },

        //跳转到某个页面
        go(path){

            if(typeof path == 'string'){
                this.$router.push({
                    path:path
                });
            }
        },

        //申请下一步
        nextApplyStep(query){
            
            let length = 0;
            let nextStepPath = '';
            let pathname = window.location.pathname;
            let name = pathname.indexOf('_')>-1 && pathname.split('_')[0].replace('/','');
            let thisStepRouters = applyRouter[name];

            console.log(thisStepRouters);
        
            if(thisStepRouters){
                length = thisStepRouters.length;
                thisStepRouters.forEach((d , i)=>{
                    if(d.path == pathname && i<(length-1)){
                        nextStepPath = thisStepRouters[i+1].path ;
                        return false;
                    }
                })
            }

            if(nextStepPath){

                if (query) {
                    nextStepPath += query;
                }

                this.go(nextStepPath);
            }
 
        }


     
    }

}

export default mixin