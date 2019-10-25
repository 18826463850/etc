
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
