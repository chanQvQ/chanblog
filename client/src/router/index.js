import {createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Category from '@/views/note/Category.vue'
import { useMainStore } from '../store/main'




const router= createRouter({
    history:createWebHashHistory(),
    routes:[
    {path:'/',
    redirect:'/home'
    },

    {
     name:'首页',
     path:'/home',
     component:Home,
     meta:{
        title:'欢迎'
     }
     
    },

    {
    name:'笔记分类',
     path:'/category',
     component:Category,
     meta:{
        title:'分类大全'
     }
        
    },

    {
        name:'后台管理首页',
        path:'/BackStage/Home',
        component:()=> import('../views/BackStage/Home.vue'),
        meta:{needToken:1,title:'后台首页'},
        children:[
            {
                name:'笔记发布和编辑',
                path:'/BackStage/Publish',
                component:()=>import('../views/BackStage/Publish.vue'),
                meta:{needToken:1,title:'笔记发布or编辑'}
                
            },
            {
                name:"笔记管理",
                path:'/BackStage/NoteManage',
                component:()=>import('../views/BackStage/NoteManage.vue'),
                meta:{needToken:1,title:'笔记管理'}
            },
            {
                name:"留言管理",
                path:'/BackStage/BoardManage',
                component:()=>import('../views/BackStage/BoardManage.vue'),
                meta:{needToken:1,title:'留言管理'}
            },
            {
                name:"后台查看留言详情",
                path:'/BackStage/BoardDetail',
                component:()=>import('../views/BackStage/BoardDetail.vue'),
                meta:{needToken:1,title:'留言详情'}
            },
            
        ]
        
    },

    {
        name:"前端查看留言详情",
        path:'/note/BoardDetail',
        component:()=>import('../views/note/BoardDetail.vue'),
        meta:{title:'留言详情'}
    },

    {
        name:"笔记详情",
        path:'/Note/NoteDetail',
        component:()=>import('../views/note/NoteDetail.vue'),
        meta:{
            title:'笔记详情'
         }
    },

    {
        name:'分类详情',
        path:'/category/detail',
       component:()=>import('../views/note/CateoryNoteDetail.vue'),
       meta:{
        title:'分类详情'
     }
    },

    {
        name:'关于',
        path:'/about',
       component:()=>import('../views/note/About.vue'),
       meta:{
        title:'关于'
     }
    },
    
    {
        name:'搜索详情界面',
        path:'/search/detail',
       component:()=>import('../views/note/SearchDetail.vue'),
       meta:{
        title:'搜索结果'
     }
    },

    {
        name:'留言板',
        path:'/MessageBoard',
       component:()=>import('../views/note/MessageBoard.vue'),
       meta:{
        title:'欢迎留言~'
     }
    },

    

    {
        name:'后台登录',
        path:'/BackStage/login',
       component:()=>import('../views/BackStage/login.vue'),
       meta:{
        title:'想绕过?进去也没有接口权限'
     }
    },

]
})

router.beforeEach(
    (to,from,next)=>{
        const mainStore =useMainStore()
        
      if(to.meta.needToken==1){
       let token=  localStorage.getItem('token')
       let accountId = localStorage.getItem('accountId')
        if( (token && accountId==425624219934789)){
            next()
        }else if(mainStore.loginMode=='visitor'){
            next()
        }
        else
        {router.push('/BackStage/login')}
        
      }
      
      else{
        next()
      }

      
    }
   
)


router.afterEach((to,from)=>{
    document.title=to.meta.title
})


export default router