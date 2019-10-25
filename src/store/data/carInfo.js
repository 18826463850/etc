import localStore from 'store'
let carInfo = localStore.get('carInfo')||{};


/**
* 设置默认值
 */
export  const getCarInfoDefaultVal = (obj = {}) =>{

 return Object.assign({

  //车辆所有人
  "carOwner":"",

  //车归属地
  "carAddr": "",
  
  //车牌号码
  "carNumber": "",
  
  //行驶证正面
  "drivingPermiRightImg": "",
  
  //行驶证反面
  "drivingPermiWrongImg": "",
  
  //车辆使用性质
  "carUseType": "1",
  
  //车高度
  "carHeight": "",
  
  //车宽度
  "carWidth": "",
  
  //车长度
  "carLength": "",
  
  //车数量
  "wheelNumber": "",
  
  //车轴数量
  "axleNumber": "",
  
  //核定人数
  "hostNumberApproved": "",
  
  //车辆识别代号 车辆编号
  "vehicleFrameNo": "",
  
  //发动机号
  "engineNo": "",
  
  //车牌号
  "licencePlate": "",
  
  //车牌号码数组
  "licencePlateArr":[],
  
  //车牌类型 蓝牌 还是绿牌 
  "licencePlateType": "1",

  //车牌颜色 蓝牌 绿牌 类型
  "licencePlateColor": "",

  //品牌型号
  "carBrand": "",
  
  //车辆类型
  "carType": "",
  
  //核定人数
  "hostNumberApproved": "",

  //外廓尺寸
  "overall_dimension":"",

  //车辆识别代号 车架号
  "vin":"",

  //发证日期
  "issueDate":"",

  //注册日期
  "registerDate":"",

  //收费车型
  "type":"",

  //汽车重量
  "totalWeight":""

  },obj)
};

  carInfo = getCarInfoDefaultVal(carInfo);
  
  if(carInfo.drivingPermiRightImg && carInfo.drivingPermiRightImg.indexOf('http')==-1){
    carInfo.drivingPermiRightImg = '';
  }
  if(carInfo.drivingPermiWrongImg && carInfo.drivingPermiWrongImg.indexOf('http')==-1){
    carInfo.drivingPermiWrongImg = '';
  }

  if(!carInfo.licencePlateArr){
     carInfo.licencePlateArr = [];
  }

  export const  getCarInfo = (obj)=>{
      let data = {};
      for(let d in carInfo){
        data[d] = carInfo[d];
        if(obj[d]!==undefined){
          data[d] = obj[d];
        }
      }
      return data;
  };

  export {carInfo}
  
  export default carInfo;