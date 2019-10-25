
export default [
    {
        path: '/areaSelect',
        component: () => import('@/pages/areaSelect'),
        hidden: true,
        meta: {
            title: '地区选择',
         
        }
    },
    {
        path: '/testabc',
        component: () => import('@/pages/testabc'),
        hidden: true,
        meta: {
            title: '测试',
            requireAuth: false,
        }
    },


    {
        path: '/picker',
        component: () => import('@/pages/picker'),
        hidden: true,
        meta: {
            title: '单列选择器'
        }
    },



    
    {
        path: '/keyboardDemo',
        component: () => import('@/pages/keyboardDemo'),
        hidden: true,

        meta: {
            title: "车牌号码输入校验",
            requireAuth: false,
        }
    },

    {
        path: '/payTest',
        component: () => import('@/pages/payTest'),
        hidden: true,
        meta: {
            title: '登录测试'
       
        }   
    },
    {
        path: '/upload',
        component: () => import('@/pages/upload'),
        hidden: true,
        meta: {
            title: '上传图片',
          
        }
    },

    {
        path: '/bindUnionPay',
        component: () => import('@/pages/bindUnionPay'),
        hidden: true,
        meta: {
            title: '中国银联',
            requireAuth: true
          
        }
    },
    {
        path: '/bindUnionPayResult',
        component: () => import('@/pages/bindUnionPayResult'),
        hidden: true,
        meta: {
            title: '中国银联',
            requireAuth: true
          
        }
    },


];
