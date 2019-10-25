
//判断是否登录
export const isLogin = state =>{
  return state.user && state.user.token;
}





//判断是否属于微信登录
export const isWxLogin = state =>{
   return state.user && state.user.token && state.user.openid;
}


