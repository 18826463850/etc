import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
import config from "@/config"
import testRouter from './testRouter'
import applyRouter from './applyRouter'

Vue.use(Router)

const constantRouterMap = [
    ...applyRouter,
    ...testRouter,
    {
        path: '/',
        component: () => import('@/pages/index'),
        meta: {
            title: config.webTitle,
            requireAuth: false,
        }
    },
    {
        path: '/index',
        component: () => import('@/pages/index'),
        hidden: true,

        meta: {
            title: config.webTitle,
            requireAuth: false,
        }
    },
    {
        path: '/questionList',
        component: () => import('@/pages/questionList'),
        hidden: true,

        meta: {
            title: "了解更多",
            requireAuth: false,
        }
    },

    {
        path: '/questionDetail',
        component: () => import('@/pages/questionDetail'),
        hidden: true,

        meta: {
            title: "",
            requireAuth: false,
        }
    },
    {
        path: '/activate',
        component: () => import('@/pages/activate'),
        hidden: true,

        meta: {
            title: "设备激活",
            requireAuth: true
        }
    },
    {
        path: '/activateQCode',
        component: () => import('@/pages/activateQCode'),
        hidden: true,

        meta: {
            title: "设备激活",
            requireAuth: true
        }
    },
    {
        path: '/shop',
        component: () => import('@/pages/shop'),
        hidden: true,

        meta: {
            title: config.webTitle,
            requireAuth: true,
        }
    },

    {
        path: '/member',
        component: () => import('@/pages/member'),
        hidden: true,
        meta: {
            title: '会员中心',
            requireAuth: false,
        }
    },


    {
        path: '/profile',
        component: () => import('@/pages/personal/profile'),
        hidden: true,
        meta: {
            title: '个人资料',
            requireAuth: false,
        }
    },



    {
        path: '/mobileCheck',
        component: () => import('@/pages/personal/mobileCheck'),
        hidden: true,
        meta: {
            title: '验证已绑定手机号',
            requireAuth: true,
        }
    },

    {
        path: '/findPwdCheckMb',
        component: () => import('@/pages/findPwdCheckMb'),
        hidden: true,
        meta: {
            title: '忘记密码',
            requireAuth: false,
        }
    },


    {
        path: '/findPwdResetPwd',
        component: () => import('@/pages/findPwdResetPwd'),
        hidden: true,
        meta: {
            title: '重置密码',
            requireAuth: false,
        }
    },


    {
        path: '/setPass',
        component: () => import('@/pages/personal/setPass'),
        hidden: true,
        meta: {
            title: '设置新密码',
            requireAuth: true,
        }
    },

    {
        path: '/modifyPass',
        component: () => import('@/pages/personal/modifyPass'),
        hidden: true,
        meta: {
            title: '修改密码',
            requireAuth: true,
        }
    },

    {
        path: '/newCard',
        component: () => import('@/pages/personal/newCard'),
        hidden: true,
        meta: {
            title: '新卡申办',
            requireAuth: true,
        }
    },

    {
        path: '/applicationRecord',
        component: () => import('@/pages/personal/applicationRecord'),
        hidden: true,
        meta: {
            title: 'ETC申请记录',
            requireAuth: true,
        }
    },

    {
        path: '/applicationProgress',
        component: () => import('@/pages/personal/applicationProgress'),
        hidden: true,
        meta: {
            title: '申请进度',
            requireAuth: true,
        }
    },

    {
        path: '/cardList',
        component: () => import('@/pages/personal/cardList'),
        hidden: true,
        meta: {
            title: '发行卡列表',
            requireAuth: true,
        }
    },

    {
        path: '/invoice',
        component: () => import('@/pages/personal/invoice'),
        hidden: true,
        meta: {
            title: 'ETC发票',
            requireAuth: true,
        }
    },

    {
        path: '/trafficRecord',
        component: () => import('@/pages/personal/trafficRecord'),
        hidden: true,
        meta: {
            title: 'ETC通行记录',
            requireAuth: true,
        }
    },

    {
        path: '/onlineService',
        component: () => import('@/pages/personal/onlineService'),
        hidden: true,
        meta: {
            title: '在线客服',
            requireAuth: true,
        }
    },

    {

        path: '/login',
        component: () => import('@/pages/login'),
        hidden: true,
        meta: {
            title: config.webTitle + '登录'

        }
    },

    {

        path: '/apply',
        component: () => import('@/pages/apply'),
        hidden: true,
        meta: {
            title: 'ETC发行平台',
            requireAuth: false,
        }
    },

    {

        path: '/applyNew',
        component: () => import('@/pages/applyNew'),
        hidden: true,
        meta: {
            title: 'ETC发行平台',
            requireAuth: false,
        }
    },

    {
        path: '/carinfo',
        component: () => import('@/pages/carinfo'),
        hidden: true,
        meta: {
            title: '车辆详情信息',
            requireAuth: true,
        }
    },

    {
        path: '/bindBank',
        component: () => import('@/pages/bindBank'),
        hidden: true,
        meta: {
            title: '银行卡绑定',
            requireAuth: true,
        }
    },

    {
        path: '/upInstallImg',
        component: () => import('@/pages/upInstallImg'),
        hidden: true,
        meta: {
            title: '上传安装图片',
            requireAuth: true,
        }
    },


    {

        path: '/applyDetail',
        component: () => import('@/pages/applyDetail'),
        hidden: true,
        meta: {
            title: '申办详情',
            requireAuth: true,
        }
    },



    {

        path: '/applyInfo',
        component: () => import('@/pages/applyInfo'),
        hidden: true,
        meta: {
            title: '申请资料',
            requireAuth: true,
        }
    },


    {
        path: '/oneprocessing',
        component: () => import('@/pages/oneprocessing'),
        hidden: true,
        meta: {
            title: '一键办理',
            requireAuth: true,
        }
    },

    {
        path: '/submitsuccess',
        component: () => import('@/pages/submitsuccess'),
        hidden: true,
        meta: {
            title: '申请成功',
            requireAuth: true,

        }
    },

    {
        path: '/agreement',
        component: () => import('@/pages/agreement'),
        hidden: true,
        meta: {
            title: '用户协议',
            requireAuth: true,
        }
    },

    {
        path: '/questionConsultation',
        component: () => import('@/pages/questionConsultation'),
        hidden: true,
        meta: {
            title: '问题咨询',
            requireAuth: false,
        }
    },

    {
        path: "/applicant",
        component: () => import(`@/pages/applicant`),
        hidden: true,
        meta: {
            title: '申请人信息',
            requireAuth: true,
        }
    },
    {
        path: '/address',
        component: () => import('@/pages/address'),
        hidden: true,
        meta: {
            title: '收货资料',
            requireAuth: false,
        }
    },


    {
        path: '/pay',
        component: () => import('@/pages/pay'),
        hidden: true,
        meta: {
            title: '支付押金',
            requireAuth: true
        }
    },


    {
        path: '/404',
        component: () => import('@/pages/404'),
        hidden: true
    },

    {
        path: '/yunnan_bindBank2',
        component: () => import('../pages/apply/yunnan/bindBank2.vue'),
        hidden: true,
        meta: {
            title: '银行卡绑定',
            requireAuth: true,
        }
    },

    {
        path: '/aboutUs',
        component: () => import('../pages/aboutUs'),
        hidden: true,
        meta: {
            title: '关于我们',
            requireAuth: false,
        }
    },

    {
        path: '/express',
        component: () => import('../pages/personal/express.vue'),
        hidden: true,
        meta: {
            title: '物流信息',
            requireAuth: true,
        }
    },

    {
        path: '/surprise',
        component: () => import('../pages/surprise'),
        hidden: true,
        meta: {
            title: '',
            requireAuth: false,
        }
    },

    {
        path: '/attentionUs',
        component: () => import('../pages/attentionUs'),
        hidden: true,
        meta: {
            title: '关注我们',
            requireAuth: false,
        }
    },

    {
        path: '/applyCreditCard',
        component: () => import('../pages/applyCreditCard'),
        hidden: true,
        meta: {
            title: '申办信用卡',
            requireAuth: false,
        }
    },

    {
        path: '/selectCreditCard',
        component: () => import('../pages/selectCreditCard'),
        hidden: true,
        meta: {
            title: '选择信用卡',
            requireAuth: false,
        }
    },

    {
        path: '*',
        redirect: '/',
        hidden: true
    }


];


const router = new Router({
    mode: "history",
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
});


router.beforeEach((to, from, next) => {

    //如果设置标题，拦截后设置标题
    if (to.meta.title) {
        document.title = to.meta.title
    }

    //判断该路由是否需要登录权限         
    //通过vuex state获取当前的token是否存在
    if (to.meta.requireAuth && !store.state.token) {

        // 将跳转的路由path作为参数，登录成功后跳转到该路由

        store.dispatch('outLogin');

        next({
            path: '/login',
            query: {
                redirect_uri: to.fullPath
            }
        })
    }

    else {
        next();
    }


})


store.commit("routes", constantRouterMap);


export default router