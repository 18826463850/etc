
//获取申请路由
let getApplyRouterByName = (name) => {
    return [
        {
            path: `/${name}_applicant`,
            component: () => import(`@/pages/apply/${name}/applicant`),
            hidden: true,
            meta: {
                title: '申请人信息',
                requireAuth: true,
            }
        },

        {
            path: `/${name}_carinfo`,
            component: () => import(`@/pages/apply/${name}/carinfo`),
            hidden: true,
            meta: {
                title: '车辆详情信息',
                requireAuth: true,
            }
        },
        {
            path: `/${name}_bindBank`,
            component: () => import(`@/pages/apply/${name}/bindBank`),
            hidden: true,
            meta: {
                title: '银行卡绑定',
                requireAuth: true,
            }
        },

        {
            path: `/${name}_address`,
            component: () => import(`@/pages/apply/${name}/address`),
            hidden: true,
            meta: {
                title: '收货资料',
                requireAuth: false,
            }
        }
    ];
};

//贵州省
export const guizhou =  getApplyRouterByName('guizhou');

//云南省
export const yunnan  = getApplyRouterByName('yunnan');

//广东省
export const guangdong =( (name) =>{
    const yunnan_ = getApplyRouterByName(name);
    return  [
        {
            path: `/${name}_checkLicencePlate`,
            component: () => import(`@/pages/apply/${name}/checkLicencePlate`),
            hidden: true,
            meta: {
                title: '车牌信息查询',
                requireAuth: false,
            }
        },
        yunnan_[0],
        yunnan_[1],
        yunnan_[3],
        yunnan_[2],
        // {
        //     path: `/${name}_pdf`,
        //     component: () => import(`@/pages/apply/${name}/pdf`),
        //     hidden: true,
        //     meta: {
        //         title: '查看协议',
        //         requireAuth: false,
        //     }
        // },
      ];

})('guangdong');


export default [
 ...guizhou,
 ...yunnan,
 ...guangdong
]