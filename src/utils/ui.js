import {
    Toast,
 
} from "@/vant/";


/**
 * 载入提示框
 * @param {string} title 
 */
export const showLoading = title => {

    Toast.loading({
        mask: true,
        duration: 1000*60,
        message: title || ''
    });

};

/**
 * 隐藏载入
 * @param {string} title 
 */
export const hideLoading = title => {

    Toast.clear();

};

/**
 * 提示框
 * @param {object | string } option |message
 */
export const tip = option => {

    let _option = {

        duration:3000,
        mask:false
    };

    if(!option) return;

    if (typeof option == 'string') {

        option = {
           message: option,
           mask:false
        }
    }

    if(option.title){
        option.message = option.title;
    }

    if(option.time){
        option.duration = option.time;
    }

    if(option.icon){

        if (option.icon == 'success' || option.icon == 'fail') {
            option.type = option.icon;
        }
    }


    Object.assign(_option,option);

    Toast(_option);

    if(typeof option.close == 'function'){
        setTimeout(()=>{
            option.close();
        },option.duration);
    }

    // if(_option.close && typeof _option.close =='function'){
    //     setTimeout(_option.close,_option.duration);
    // }


};