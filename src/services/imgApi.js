import axios from 'axios'
import http from './http'


/**
 * 身份证图片识别  { image,side} image 图片url和base64  side 图片正面 face或反面back
 * @param {*} param0 
 */
export const ocrIdcard = ({ image, side })=>  http.post("/api/etcOcr/ocrIdcard",{
"image": image,
"side":side
},true);



/**
 * 驾驶证图片识别  { image,side} image 图片url和base64  side 图片正面 face或反面back
 * @param {*} param0 
 */
export const ocrVehicle = ({ image, side })=>  http.post("/api/etcOcr/ocrVehicle",{
"image": image,
"side":side
},true);







/**
 * 驾驶证图片识别  { image,side} image 图片url和base64  side 图片正面 face或反面back
 * @param {*} param0 
 */
export const imgDriverLicense = async ({ image, side }) => {
    try {

        let res = await axios({
            method: 'POST',
            url: 'http://dm-53.data.aliyun.com/rest/160601/ocr/ocr_vehicle.json',
            headers: {
                'authorization': 'APPCODE ddd44753e6a84f08832965a597d2c21a',
                'Accept': 'application/json',
            },
            data: {
                "image": image,
                "configure": `{\"side\":\"${side}\"}`
            },
        })

        return new Promise((resolve, reject) => {
            if (res && res.data) {
                resolve(res);
            } else {
                reject(res)
            }
        })
    } catch (err) {
        console.log(err);
    }
};

 



/**
 * 身份证图片识别  { image,side} image 图片url和base64  side 图片正面 face或反面back
 * @param {*} param0 
 */
export const imgIdCard = async ({ image, side }) => {
    try {

        let res = await axios({
            method: 'POST',
            url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
            headers: {
                'authorization': 'APPCODE ddd44753e6a84f08832965a597d2c21a',
                'Accept': 'application/json',
            },
            data: {
                "image": image,
                "configure": `{\"side\":\"${side}\"}`
            },
        })

        return new Promise((resolve, reject) => {
            if (res && res.data) {
                resolve(res);
            } else {
                reject(res)
            }
        })
    } catch (err) {
        console.log(err);
    }

};