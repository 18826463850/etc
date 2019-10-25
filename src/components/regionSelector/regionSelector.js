var regionData;
var cacheRegoinData = {};
var regionTexts = ["省", "城市", "区县","街道"];
var regionNames = ["province", "city", "district", "street"];
let localRegionData= require('./regionData');
const utils = require("@/utils/index");
const config = require("@/config/index");
const services = require("@/services/index");



export default {


    name: 'region-selector',

     computed: {

   
     },
     props:{
         
        value: {
            type: Boolean,
            default: false
        }

     },
     data(){

       return {

        show:this.value,
        regionSelectShow: false,
        provinceData: [],
        cityData: [],
        districtData: [],
        streetData: [],
        provinceHoverIndex: 1,
        cityHoverIndex: -1,
        streetHoverIndex: -1,
        districtHoverIndex: -1,
        regionActiveIndex: 0,
        regionTexts: regionTexts,
        regionNavs: Object.assign([], regionTexts),
        regions: [],
        regionsVal: '',
        regionLastId: -1,

        //正在加载
        regionLoading:false
   
       }
     },

     mounted(){


        this._region_init()
     },
   
     methods:{
   
  
        _region_setProvinceData(data) {
            var provinceData;
    
            if (data) {
    
                provinceData = [];
                regionData = data;
    
                regionData.forEach(function (d) {
                    var name = d.name;
                    if (d.name.indexOf('广西') > -1) {
                        name = '广西';
                    } else if (d.name.indexOf('西藏') > -1) {
                        name = '西藏';
                    } else if (d.name.indexOf('内蒙古') > -1) {
                        name = '内蒙古';
                    } else if (d.name.indexOf('新疆') > -1) {
                        name = '新疆';
                    } else if (d.name.indexOf('宁夏') > -1) {
                        name = '宁夏';
                    }
    
                    provinceData.push({
                        id: d.id,
                        name: name
                    })
    
                });
                this.setData({
                    provinceData: provinceData
                });
            }
    
    
        },
    
        _region_init() {
   
            var data = localRegionData.list;
    
            this._region_setProvinceData(data);
            this._region_setRegionDataByName();
    
        },
    
        _region_getVal(s) {
            return this.regions.join(s || '');
        },
    
        _region_toggleRegionSelect() {
    
            let show = !this.show;
       
            this.show = show;

            if (show) {
                this._region_setSelect();
            }
        },
    
        _region_getPrevEmptyIndex(index) {
    
            var i = 0,
            empty = false,
            regions = this.regions;
    
            while (i != index) {
    
                if (!regions[i]) {
                    empty = true;
                    break;
                } else {
                    i++;
                }
            }
    
            return empty ? i : -1;
        },
    
        _region_switchregionNavs(e) {
    
            var tip,
            emptyIndex,
            regions = this.regions,
            index = e.target.dataset.index;
    
            if (index > 0) {
    
                emptyIndex = this._region_getPrevEmptyIndex(index);
    
                //console.log(emptyIndex);
    
                if (emptyIndex > -1) {
    
                    tip = "请先选择" + this.regionTexts[emptyIndex];
    
                    wx.showModal({
                        title: '温馨提示',
                        content: tip,
                        confirmText: "确定",
                        cancelText: "辅助操作",
                        showCancel: false,
                        success: function (res) {
    
                        }
                    });
    
                    return;
                }
            }
    
            this.setData({
                regionActiveIndex: index
            })
    
    
        },
    
        _region_getNextDataName(p) {
    
            var c = "";
    
            if (p == 'province') {
                c = 'city';
            }
            else if (p == 'city') {
                c = 'district';
            } else if (p == 'district') {
                c = 'street';
            }
    
            return c;
        },
    
        _region_reset() {
    
            this.setData({
                provinceHoverIndex: 1,
                cityHoverIndex: -1,
                streetHoverIndex: -1,
                districtHoverIndex: -1,
                regionActiveIndex: 0
          
            })
        },
    
        //过滤地区节点属性
        _region_filterData(data) {
    
            var list = [];
            data.forEach(function (d) {
                list.push({
                    id: d.region_id,
                    name: d.local_name
                });
            });
            return list;
        },
    
        //通过region_id获取子地区值
        _region_getDataByRegionId(region_id, callback) {
            var data;
            var that = this;
            var user = that.user;
    
            if (!user) {
                console.log('用户未登录');
                reutrn;
            }
    
           data = {
               'method': 'b2c.member.get_region_four',
                'region_id': region_id,
                'client_key': config.flnet_client_key,
                'client_secret': config.flnet_client_secret,
                'accesstoken': user.accesstoken,
                'task': +new Date()
            };
    
       
            services.request({
                method: "GET",
                header: config.requestHeader,
                url: config.apiUrl,
                data: data,
                success: function (res) {
                
                    var data = res.data && res.data.data;
                    var message = data && data.message;
    
                    if (res.statusCode == 200 &&
                        res.data.rsp == 'succ') {
                        if (typeof callback == 'function') {
                            callback(data);
                        }
                   
                    } else {
    
                        utils.tip({
                            title: message || '数据获取失败'
                        })
    
                        if (typeof callback == 'function') {
                            callback(null);
                        }
                    }
    
                },
    
                //失败
                fail: function () {
    
                    utils.tip({
                        title: '数据获取失败'
                    })
    
                    if (typeof callback == 'function') {
                        callback(null);
                    }
                },
    
                //完成
                complete: function () {
    
                }
            })
        },
    
        //点击选择具体地区
        _region_select(e, myChildData) {
    
            var name;
            var data;
            var cacheName;
            var childData;
            var parentData;
            var that = this;
            var dataset = e.currentTarget.dataset;
            var id = +dataset.id;
            var index = +dataset.index;
            var level = +dataset.level;
            var regionName = dataset.region;
            var regions = that.regions;
            var regionNavs = that.regionNavs;
            var childRegionName = that._region_getNextDataName(regionName);
    
            cacheName = level + "_" + id;
           
            if (level < 3) {
                //地区模块切换
                that.setData({
                    regionActiveIndex: level + 1
                })
    
            }
           
            //选中第三级地址时 获取数据后重渲染
            if (level == 2 && myChildData == undefined) {
    
                if (cacheRegoinData[cacheName]) {
                    myChildData = cacheRegoinData[cacheName];
                } else {
    
                    //设置为正在加载中
                    that.setData({
                        regionLoading: true
                    })
    
                    that._region_getDataByRegionId(id, function (data) {
    
                        that.setData({
                            regionLoading: false
                        })
    
                        if (data) {
                            data = that._region_filterData(data);
                            that._region_select(e, data);
                            cacheRegoinData[cacheName] = data;
                            that._region_setDistrictChild(id,data);
                        }
    
                    });
    
                    return;
                }
            }
    
    
            if (level == 0) {
                parentData = regionData;
            } else {
                parentData = this[`${regionName}Data`];
            }
    
            if (parentData) {
                name = parentData[index].name;
            }
            
            regions = regions.slice(0, level);
            regions[level] = name;
            regionNavs[level] = name;
            regionNavs = regions.concat(that.regionTexts.slice(level + 1));
    
            data = {
                regions: regions,
                regionNavs: regionNavs,
                [`${regionName}HoverIndex`]: id,
            };
            
            if (level == 0) {
                this._region_reset();
            }
    
            if (childRegionName && level <3) {
             
                if (myChildData != undefined) {
                    childData = myChildData;
                } else {
                    childData = parentData[index].childs;
                }
    
                if (childData && childData.length) {
    
                    data = Object.assign(data, {
                        [`${childRegionName}Data`]: childData,
                        regionActiveIndex: level + 1
                    });
                }
            }
    
            if (level == 3) {
                data.regionsVal = regions.join(' ');
                data.regionLastId = id;
                this._region_toggleRegionSelect();
            }
    
            that.setData(data);
        },
    
        //设置District下的子节点
        _region_setDistrictChild(id, childs) {
    
            var provinceHoverIndex = this.provinceHoverIndex;
            var cityHoverIndex = this.cityHoverIndex;
    
            regionData.forEach(function (p) {
                if (p.id == provinceHoverIndex) {
                    p.childs.forEach(function (c) {
                        if (c.id == cityHoverIndex) {
                            c.childs.forEach(function (s) {
                                if (s.id == id) {
                                    s.childs = childs;
     
                                }
                            });
                        }
                    })
                }
            });
    
        },
    
        //根据地址值显示地址列表
        _region_setSelect() {
    
            var length, regionsVals;
            var i = 0;
            var regionName;
            var regionsVal;
            var parentData;
            var that = this;
            var data = {};
            var datas = [];
            var hovers = [];
            var regionsVal = that.regionsVal;
            var regionLastId = that.regionLastId;
            if (!regionData || !regionsVal) return;
    
            //地区分隔为数组
            regionsVals = regionsVal.split(' ');
    
            //地区分级数组长度
            length = regionsVals.length;
    
            for (; i < length; i++) {
    
                regionName = regionNames[i];
                regionsVal = regionsVals[i];
    
                if (i == 0) {
                    parentData = regionData;
                    datas.push(that.provinceData);
                }
          
                parentData.forEach(function (d) {
               
                    if (d.name == regionsVal) {
                  
                        hovers.push(d.id);
              
                        if (d.childs) {
                            datas.push(d.childs);         
                            parentData = d.childs;
                         
                        }
                    }
                });
            }
    
            //只有满四级才进行选中匹配
            if (datas.length == 4) {
    
                if (that.provinceHoverIndex != hovers[0]) {
                    data.provinceHoverIndex = hovers[0];
                }
    
                if (that.cityHoverIndex != hovers[1]) {
                    data.cityHoverIndex = hovers[1];
                    data.cityData = datas[1];
                }
    
                if (that.districtHoverIndex != hovers[2]) {
                    data.districtHoverIndex = hovers[2];
                    data.districtData = datas[2];
                }
    
                if (that.streetHoverIndex != hovers[3]) {
                    data.regionLastId = hovers[3];
                    data.streetHoverIndex = hovers[3];
                    data.streetData = datas[3];
                }
    
                if (that.regionNavs.join(' ') != regionsVal) {
                    data.regionNavs = regionsVals;
                }
    
                if (that.regions.join(' ') != regionsVal) {
                    data.regions = regionsVals;
                }
    
                data.regionActiveIndex = 3;
                
                that.setData(data);
            }
        },
    
        //通过 识别区域找到id返回后台获取数据
        _region_setRegionDataByName() {
    
            var districtId;
            var parentData;
            var districtItem;
            var that = this;
            var regionsVals = [];
          
            var regionsVal = that.regionsVal;
       
            if (!regionsVal) return;
    
            //地区分隔为数组
            regionsVals = regionsVal.split(' ');
     
            parentData =regionData;
            regionsVals.forEach(function (name,i) {
                parentData.forEach(function (d) {
                    if (d.name == name) {
                 
                        if (i < 2) {
                            if (d.childs) {
                                parentData = d.childs;
                            } 
                        }
                        else if (i == 2) {
                            districtId = d.id;
                            districtItem = d;
                 
                            return false;
                        } 
                    }
                })
            })
    
            if (districtId) {
                that._region_getDataByRegionId(districtId, function (childs) {
                    if (childs) {
                        childs = that._region_filterData(childs);
                        districtItem.childs = childs;
                    }
                })
            }
        }
   
     }
   }