import { defineStore } from "pinia";

export const useMainStore= defineStore('main',{
    state:()=>{
        return{
         contentData:'',
         visitorLogin:0,
         loginMode:0 // 为admin 表示登录进入后台，为visitor表示游客模式进入后台，只有这两种情况才能访问后台路由地址
        }
    },
    getters:{

    },
    actions:{

    }
})