import axios from 'axios'
import  MD5  from "blueimp-md5";
import {Base64} from '@/utils'

/**
 * 快递查询
 * @param {*} param0 
 */
export const expressInfo = async (value) => {
    try {
        var PostStr = "EBusinessID=1585667&RequestData="+ encodeURIComponent(value)+"&RequestType=1002&dataSign="
                    + encodeURIComponent(Base64.encode(MD5(value + '0cca33e6-fd41-4bbf-9053-0b4fec220b64')))
                    + "&DataType=2";

        console.log('====================================');
        console.log(value); 
        console.log('====================================');
        console.log(PostStr);
        console.log('====================================');

        let res = await axios({
            method: 'POST',
            url: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
            headers: {
                'Accept': '*/*',
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
            },
            params: {
                "EBusinessID" : 1585667,
                "RequestData" : encodeURIComponent(value),
                "RequestType" : 1002 , 
                "DataSign" : encodeURIComponent(Base64.encode(MD5(value + '0cca33e6-fd41-4bbf-9053-0b4fec220b64'))),
                "DataType" : 2
            }
        })

        return new Promise((resolve, reject) => {
            if (res) {
                resolve(res);
            } else {
                reject(res)
            }
        })
    } catch (err) {
        console.log(err);
    }
};