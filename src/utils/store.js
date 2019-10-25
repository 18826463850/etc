
import store from 'store';

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	store.set(name,content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return store.get(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	store.remove(name);
}


/**
 * 删除所有localStorage
 */
export const removeAllStore= ()=>{

	store.removeAll();
}