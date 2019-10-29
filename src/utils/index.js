import MD5 from "blueimp-md5";
import * as ui from "./ui";
import *as bank from "./checkBankCard"

export const store = require("./store");

let utils = {};
let timerList = {};

Object.assign(utils, ui, store, bank);

export { tip, showLoading, hideLoading } from "./ui";
export { getBankCardInfo } from "./checkBankCard"

/**
 * 定时执行函数
 * @param {string} key 函数key值，用来记录当前函数
 * @param {function} fn 执行函数
 * @param {number} delay 延时多少毫秒执行
 */
export const setTimer = (key, fn, delay = 300) => {
    if (timerList[key]) {
        clearTimeout(timerList[key]);
    }

    timerList[key] = setTimeout(() => {
        if (typeof fn == 'function') {
            fn();
            timerList[key] = null;
        }

    }, delay);
};




/**
 * 判断是否为数组
 * @param {any} obj
 */
export const isArray = obj => {
    return toString.call(obj) === '[object Array]';
};

/**
 * 判断是否为为对象
 * @param {any} obj
 */
export const isObject = obj => {
    return toString.call(obj) === '[object Object]';
};


/**
 * 密码 账号 双重md5加密
 * @param {any} password
 * @param {any} username
 * @param {any} createTime
 */
export const md5Password = (password, username, createTime) => {
    var pwd = MD5(MD5(password) + username + createTime);
    pwd = 's' + pwd.substr(0, 31);
    return pwd;
};



/**
 * 日期格式化
 * @param {any} date
 */
export const formatTimeX = date => {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

/*
 * 格式化时间日期
 * @param{date object} Date 被格式的日期对象
 * @param{format} format 日期格式字符串 如:yyyy-MM-dd HH:mm:ss 采用的是24小时格式
 * yyyy-MM-dd HH:mm:ss 24小时制格式化日期
 * yyyy-MM-dd hh:mm:ss 12小时制格式化日期
 */
export const formatDate = (Date, format) => {

    format = format || "yyyy/MM/dd HH:mm:ss";
    var MM = Date.getMonth() + 1;
    var dd = Date.getDate();
    var HH = Date.getHours();
    var ss = Date.getSeconds();
    var mm = Date.getMinutes();

    if (MM < 10) {
        MM = '0' + MM;
    }

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (HH < 10) {
        HH = '0' + HH;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    if (ss < 10) {
        ss = '0' + ss;
    }

    var o = {
        "yyyy": Date.getFullYear(),
        "MM": MM, //month 
        "dd": dd, //day 
        "HH": HH, //hour 
        "mm": mm, //minute 
        "ss": ss, //second 
        "SS": Date.getMilliseconds() //millisecond 
    }

    for (var i in o) {
        format = format.replace(i, o[i]);
    }
    return format;
};


//数字转字符串
export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};

//删除左右两端的空格
export const trim = str => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

//随机数
export const rndNum = (n) => {

    var rndnum = '';
    for (var i = 0; i < n; i++) {
        rndnum += Math.floor(Math.random() * 10);
    }
    return rndnum;
};

/**
 *清除html 转换为文本
 *
 * @param {*} str
 * @returns
 */
export const clearHtml = (str) => {
    if (!str) return "";
    str = str.replace(/<\/?.+?>/g, "");
    str = str.replace(/ /g, "");
    return str;
};

// 浮点数相加
export const accAdd = (arg1, arg2) => {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
};

/**
 * 获取 签名参数 sign
 * @param {*} data 
 */
export const getSign = (data) => {
    return MD5(MD5(assemble(data)).toUpperCase()).toUpperCase();
};

/**
 *组装参数
 * @param {*} data
 * @returns
 */
function assemble(data) {

    if (typeof data !== 'object') return null;

    let val;
    let sign = '';
    let datax = {};
    let keys = Object.keys(data).sort();

    keys.forEach(function (k) {
        datax[k] = data[k];
    })
    data = datax;

    for (let key in data) {
        val = data[key];
        sign += key + (val != null && val != undefined && typeof val == 'object' ? assemble(val) : val);
    }

    return sign;
};

// 时间格式化输出，将时间戳转为 倒计时时间
export const dateFormat = (second) => {

    if (second <= 0) return null;

    // 天   
    let day = Math.floor(second / 3600 / 24);
    let dayStr = day.toString();

    // 时  
    let hr = Math.floor(second / 3600 % 24);
    let hrStr = hr.toString();

    // 分
    let min = Math.floor(second / 60 % 60);
    let minStr = min.toString();

    // 秒
    let sec = Math.floor(second % 60);
    let secStr = sec.toString();
    //if (dayStr.length == 1) dayStr = '0' + dayStr;

    if (hrStr.length == 1) hrStr = '0' + hrStr;

    if (minStr.length == 1) minStr = '0' + minStr;

    if (secStr.length == 1) secStr = '0' + secStr;

    return hrStr + "时" + minStr + "分";
};


/**
 * 拼接链接参数
 * @param {any} data
 */
export const formatParams = (data) => {
    let arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join('&');
};


/**
 * 获取页面参数值
 * @param {*} name 参数名称
 * @param {*} url 指定页面（不填则为当前页面）
 */
export const getParam = (name, url = window.location.href) => {

    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = url.indexOf('?') > -1 && (url.split('?')[1]).match(reg);
    if (r) {
        return decodeURIComponent(r[2]);
    }
    return null;
};

export const setUrlParamValue = (url, name, value) => {
    let i = 0;
    let urlA = url.split('?');
    let params = urlA[1].split('&');
    params.forEach(d => {
        let items = d.split('=');
        let n = items[0];

        if (n == name) {
            params[i] = n + '=' + value;
        }
        i++;
    });

    return urlA[0] + "?" + params.join('&');
}

/**
 * 装置链接参数
 * @param {any} params
 */
export const linkParams = (params) => {

    let paramsA = [];
    for (let o in params) {
        paramsA.push(o + "=" + params[o]);
    }
    return paramsA.join('=');
}



/**
 * 删除链接
 * @param {string} url 
 * @param {array} delParams 
 */
export const delUrlParams = (url, delParams) => {

    let urlA = url.split('?');
    let params = urlA[1] && urlA[1].split('&');

    if (urlA.length == 1) return url;

    for (let i = 0; i < params.length; i++) {
        if (delParams.indexOf(params[i].split('=')[0]) > -1) {
            params.splice(i--, 1);
        }
    }

    return urlA[0] + (params.length ? '?' + params.join('&') : "");
};


/**
 * 通过字符串转换参数
 * @param {any} s
 */
export const parseParamsByStr = s => {

    let vals, params;

    if (s && s.indexOf(',') == -1 &&
        s.indexOf('=') == -1) {
        return s;
    }

    params = {};
    vals = s.split(',');
    vals.forEach(function (d) {

        let obj;
        if (d.indexOf('=') > -1) {
            obj = d.split('=');
            params[obj[0]] = obj[1];
        }
    });

    return params;
}


//Base64转码
export const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {

        var t = "",
            n, r, i, s, o, u, a, f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) n = e.charCodeAt(f++), r = e.charCodeAt(f++), i = e.charCodeAt(f++), s = n >> 2, o = (n & 3) << 4 | r >> 4, u = (r & 15) << 2 | i >> 6, a = i & 63, isNaN(r) ? u = a = 64 : isNaN(i) && (a = 64), t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        return t
    },
    decode: function (e) {
        var t = "",
            n, r, i, s, o, u, a, f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) s = this._keyStr.indexOf(e.charAt(f++)), o = this._keyStr.indexOf(e.charAt(f++)), u = this._keyStr.indexOf(e.charAt(f++)), a = this._keyStr.indexOf(e.charAt(f++)), n = s << 2 | o >> 4, r = (o & 15) << 4 | u >> 2, i = (u & 3) << 6 | a, t += String.fromCharCode(n), u != 64 && (t += String.fromCharCode(r)), a != 64 && (t += String.fromCharCode(i));
        return t = Base64._utf8_decode(t), t
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(r & 63 | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(r & 63 | 128))
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "",
            n = 0,
            r = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (n < e.length) {

            r = e.charCodeAt(n), r < 128 ? (t += String.fromCharCode(r), n++) : r > 191 && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((r & 31) << 6 | c2 & 63), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63), n += 3);
        }
        return t
    }
};

/*
 * 计算2个日期间隔时间
 * @param{date object}beginDate 开始日期
 * @param{date object}endDate 结束日期
 */
export const distanceDate = (beginDate, endDate) => {

    var t = 0,
        d = 0,
        h = 0,
        m = 0,
        s = 0;

    if (arguments.length == 1) {
        t = arguments[0];
    }

    if (arguments.length == 2) {
        t = beginDate.getTime() - endDate().getTime()
    }

    if (t < 0) t = 0;

    d = Math.floor(t / 1000 / 60 / 60 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);

    return {
        d: d,
        h: h,
        m: m,
        s: s
    };

};


/*
 * 倒计时
 * @param{object}$time 绑定倒计时的父节点  jquery对象
 * @param{string||Date Object}endDate 倒计时结束时间
 * @param{function}doingFn 倒计时进行中回调函数
 * @param{function}endFn 倒计时结束回调函数
 */
export const downTime = (options) => {

    if (typeof endDate === 'string') {
        endDate = new Date(endDate);
    }
    var $time = options.$time;
    var endDate = options.endDate;
    var begionFn = options.begionFn;
    var doingFn = options.doingFn;
    var endFn = options.endFn;
    var t = endDate.getTime() - fl.nowDate;
    var $dis = $time.find(".di");
    var $day = $time.find(".t-d");
    var $hour = $time.find(".t-h");
    var $miniute = $time.find(".t-m");
    var $second = $time.find(".t-s");

    if (t < 1) {
        $dis.text("00");
        return;
    }

    var setTime = function (ts) {
        var ds = fl.distanceDate(ts);

        if ($day.length) {
            $day.text((ds.h > 9 ? "" : "0") + ds.d);
        }

        if ($hour.length) {
            $hour.text((ds.h > 9 ? "" : "0") + ds.h);
        }

        if ($miniute.length) {
            $miniute.text((ds.m > 9 ? "" : "0") + ds.m);
        }

        if ($second.length) {
            $second.text((ds.s > 9 ? "" : "0") + ds.s);
        }

    };

    if (fl.downTimeTimer) {
        clearInterval(fl.downTimeTimer);
    }

    var timer = setInterval(function () {
        setTime(t);
        t -= 1000;
        if (t < 0) {
            clearInterval(timer);
            endFn && endFn.call($time);
        }

        doingFn && doingFn.call($time);

    }, 1000);

    if (begionFn) {
        begionFn();
    }

    fl.downTimeTimer = timer;

    setTime(t);
    t -= 1000;
};



/**
 * Created by jiachenpan on 16/11/18.
 */

export const parseTime = (time, cFormat) => {
    if (arguments.length === 0) {
        return null
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'

    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }

    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
};

export const formatTime = (time, option) => {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
};


//验证银行卡号
export const checkBankNo = (number) => {
    return /^([1-9]{1})[0-9]{14,19}$/.test(number);
}

//验证手机短信验证码
export const checkValidCode = (code) => {
    return /^[0-9]{6}$/.test(code);
};

//验证手机号码
export const checkMobile = (mb) => {
    return /^[1][3456789][0-9]{9}$/.test(mb)
};

// 真实姓名
export const checkName = (v) => {
    return !v || /^[\u4e00-\u9fa5]{2,15}$/.test(v);
}

//验证护照号码
export const checkPassport = (code) => {
    if (!code || !/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(code)) {
        return false;
    } else {
        return true;
    }
};

/**
 * 份证号码验证
 * @param {string} cardNo 
 */
export const checkIdCard = (cardNo) => {
    var idreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return idreg.test(cardNo);
};


/**
 * 车牌号验证方法
 * @param {*} vehicleNumber 
 */
export const checkLicencePlate = (vehicleNumber) => {

    var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

    var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

    if (vehicleNumber.length == 7) {

        return creg.test(vehicleNumber);

    } else if (vehicleNumber.length == 8) {

        return xreg.test(vehicleNumber);

    } else {

        return false;

    }

};



/**
 * 深度克隆
 * @param {object} obj 
 */
export const deepClone = (obj) => {

    let newObj = obj instanceof Array ? [] : {};
    for (let i in obj) {
        newObj[i] = typeof obj[i] == 'object' ?
            deepClone(obj[i]) : obj[i];
    }

    return newObj;
}


/**
 * 对象转换为数组
 * @param {object} obj 
 */
export const objectToArray = (obj) => {

    let i;
    let list = [];
    if (obj && obj instanceof Object) {
        for (i in obj) {
            list.push(obj[i]);
        }
        return list;
    } else {
        return obj;
    }

}

/**
 * 封装默认传参
 * @param {object} options 
 */
export const extendOptions = (options) => {
    let _options = {
        success: function () { },
        fail: function () { },
        complete: function () { }
    };
    if (options && isObject(options)) {
        for (let o in _options) {
            if (options[o] === undefined) {
                options[o] = _options[o];
            }
        }
    } else {
        options = _options
    }
    return options;
}



/**
 * 过滤价格小数点后面0
 * @param {*} price 
 */
export const filterPrice = (price) => {
    price = '' + price;
    price = price.replace(/\.[0]+$/, '');
    price = price.replace(/(\.[0-9]+)[0]+$/, '$1');

    return price;
};

/**
 * 价格保留2位小数
 * @param {*} price 
 */
export const priceTwo = (price) => {

    if (!/\.[0-9]{2}[1-9]$/.test(price + "")) {
        price = (+price).toFixed(2);
    }
    return price;
};

/**
 * 存储当前历史记录点,实现控制手机物理返回键的按钮事件
 */
export const pushHistory = () => {
    let state = {
        title: '',
        url: ''
    }
    window.history.pushState(state, state.title, state.url)
};

/**
 * 判断是否为微信环境
 */
export const isInWeiXin = () => {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

/**
 * 字符串 转日期 20180812  输出 2018-08-12
 * @param {*} dateStr 
 */
export const stringToDate = (dateStr) => {

    return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

/**
 * 根据卡数据获取名词拼音
 */
export const getNameByCard = (item) => {

    let name = '';
    let province = item.province;

    if (province == '贵州省') {
        name = "guizhou";
    }

    else if (province == '广东省') {
        name = "guangdong";
    }

    else if (province == '云南省') {
        name = 'yunnan';
    }
    else if (province == '江西省') {
        name = 'jiangxi';
    }

    return name;
}

export const getCarType = (seat) => {
    let carType = '';
    if (seat <= 7) {
        carType = '1';
    } else if (seat > 7 && seat <= 19) {
        carType = '2';
    } else if (seat > 19 && seat <= 39) {
        carType = '3';
    } else if (seat > 39) {
        carType = '4';
    }
    return carType;
}


//压缩图片
export const compressImage = (file, success, error, quality) => {
    // 图片小于1M不压缩
    if (file.size < 299 * 1024) {
        return success(file);
    }

    const name = file.name; //文件名
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const src = e.target.result;

        const img = new Image();
        img.src = src;
        img.onload = (e) => {
            const w = img.width / 2;
            const h = img.height / 2;

            console.log("====================================");
            console.log(quality + "and" + w + "and" + h);
            console.log("====================================");
            //const quality = 0.5;  // 默认图片质量为0.92
            //生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute("width");
            anw.nodeValue = w;
            const anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            canvas.width = w;
            canvas.height = h;

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);

            ctx.drawImage(img, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            const base64 = canvas.toDataURL('image/jpeg', quality); //图片格式jpeg或webp可以选0-1质量区间

            // 返回base64转blob的值
            console.log(`原图${(src.length / 1024).toFixed(2)}kb`, `新图${(base64.length / 1024).toFixed(2)}kb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            file = new Blob([ab], { type: 'image/jpeg' });
            file.name = name;

            success(file, (base64.length / 1024) < 300, quality);
        }
        img.onerror = (e) => {
            error(e);
        }
    }
    reader.onerror = (e) => {
        error(e);
    }
}

/**
 * str 需要替换的字符串
*/
export const replaceAll = (str) => {
    str = str.replace(/ETC联云--》|赤兔易行/gi, function (matched) {
        return "易行易停";
    });
    return str;
}

export default Object.assign(utils, {
    isArray,
    isObject,
    getSign,
    checkMobile,
    getParam,
    deepClone,
    extendOptions,
    objectToArray,
    filterPrice,
    priceTwo,
    pushHistory,
    getCarType,
    Base64,
    compressImage
})

