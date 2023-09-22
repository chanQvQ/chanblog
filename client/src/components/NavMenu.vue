<template>

    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#FFC0CB"
    @select="handleSelect"
  > 
    
    <div class="logo">CHAN'blog</div>
    <!-- <div class="flex-grow" /> -->
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="7">本站搜索</el-menu-item>
    <el-menu-item index="2">笔记分类</el-menu-item>
    <el-menu-item index="3">留言板</el-menu-item>
    <el-menu-item index="4">关于</el-menu-item>
    

    <el-sub-menu index="5">
      <template #title>游客</template>
      <el-menu-item index="5-1" v-if="mainStore.visitorLogin==0">登录</el-menu-item>
      <el-menu-item v-if="mainStore.visitorLogin==1" disabled="">欢迎您,{{ state.localUser.username }}</el-menu-item>
      <el-menu-item index="5-2" v-if="mainStore.visitorLogin==0">注册</el-menu-item>
      <el-menu-item index="5-3" v-if="mainStore.visitorLogin==1">退出登录</el-menu-item>
    </el-sub-menu>  


    <el-sub-menu index="6">
      <template #title>后台管理</template>
      <el-menu-item index="6-1">游客模式</el-menu-item>
      <el-menu-item index="6-2">博主模式</el-menu-item>
    </el-sub-menu>  
   </el-menu>
   


   <!-- 对话框 -->
   <el-dialog v-model="dialogVisible" :title="state.dialogTitle" width="30%" draggable @close="closeDialog">

    <!-- 搜索显示 -->
    <el-input v-show="state.whatToDo=='搜索'" v-model="state.searchContent" placeholder="请输入笔记标题(关键词即可,不输入则返回全部)" maxlength="50"></el-input>
    

    <!-- 登录显示 -->
   <el-form :model="state.loginForm"
    v-show="state.whatToDo=='登录'" 
    label-width="150"
    >
    <el-form-item label="游客名:" > <!-- prop="pass"-->
      <el-input v-model="state.loginForm.username"  autocomplete="off" maxlength="15" />
    </el-form-item>
    <el-form-item label="密码: " >
      <el-input v-model.number="state.loginForm.password" type="password" maxlength="20"/>
    </el-form-item>
  </el-form>
    
    <!-- 注册显示 -->
    <el-form :model="state.registerForm"
     v-show="state.whatToDo=='注册'" 
     label-width="150"
     >
    <el-form-item label="游客名:" > <!-- prop="pass"-->
      <el-input v-model="state.registerForm.username"  autocomplete="off" maxlength="15"/>
    </el-form-item>
    <el-form-item label="密码: ">
      <el-input v-model.number="state.registerForm.password" type="password" maxlength="20" />
    </el-form-item>
    <el-form-item label="确认密码: ">
      <el-input v-model.number="state.registerForm.confirmPassword" type="password" maxlength="20"/>
    </el-form-item>
  </el-form>




    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit">
          确定
        </el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
       
      </span>
    </template>
  </el-dialog>
</template>





<script setup>
import {useRouter} from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import {useMainStore} from '../store/main'
import emitter from '../utils/mitt';
const mainStore = useMainStore()

const Router=useRouter()
let dialogVisible =ref(0)
const state=reactive({
  searchContent:'',
 
  dialogTitle:'',
  whatToDo:'',
  loginForm:{
    username:'',
    password:''
  },
  registerForm:{
    username:'',
    password:'',
    confirmPassword:''
  },
  localUser:{

  }
})
// watch(()=>state.isLogin,(newV,oldV)=>{
//   if(newV == 1){
//     mainStore.visitorLogin=1
//   }
// })
function handleSelect(e){
 
 if(e==1){//首页
   Router.push('/home')
   console.log('去home')
 }

 if(e==2){//分类
   Router.push('/Category')

 }

 if(e==3){//去留言板
   Router.push('/MessageBoard')
 }
if(e==4){//去关于
 Router.push('/About')
}

if(e==7){//搜索
  state.whatToDo="搜索"
  state.dialogTitle='搜索'
  dialogVisible.value=1
}
if(e=='5-1'){
  state.whatToDo="登录"
  state.dialogTitle='登录(如果忘记密码重新注册即可)'
  dialogVisible.value=1
}
if(e=='5-2'){
  state.whatToDo="注册"
  state.dialogTitle='注册(已登录时注册会退出登录)'
  dialogVisible.value=1
}
if(e=='5-3'){
  state.whatToDo="退出登录"
  state.dialogTitle='退出登录'
  dialogVisible.value=1
}

if(e=="6-1"){//游客模式去后台
  mainStore.loginMode='visitor'
  Router.push('/BackStage/Home')

}
 if(e=="6-2"){//博主模式去后台
  mainStore.loginMode=0
  Router.push('/BackStage/Home')
 }
}

//  利用localStorage做游客登录思路:
//   {  localStorage.XXX 代表localStorage里的XXX，  store.isLogin代表store里的isLogin     ，state.xxx代表本组件里的xxx
//     1.先注册,注册成功后 =》 localStorage.user = {username:xxx,password:xxx} ； state.localUser = localStorage.user ；localStorage.isLogin=0 ；store.isLogin=0
//     2.登录验证:在onMounted里 state.localUser= localStorage.user ，然后登录时验证输入的和state.localUser是否一样
//     3.登录成功后 =》 localStorage.isLogin=1 ； store.isLogin = 1
//     4.每次加载页面时（onMounted） 判断localStorage.user 是否存在 localStorage.isLogin 是否为1 如果都满足 则是登录状态 赋值store.isLogin=1 (判断localStorage.user是否存在的原因:发布留言时需要用到localStorage.user里的username)
      //  5.如果用户忘记密码 或者手动清理了localStorage里的数据,按原来的账号密码登录会密码错误，会引导重新注册，如果非前两种情况都去重复注册那么会覆盖掉原来的localStorage.user
      
      // 一切的一切只是为了游客发布留言时能获取到username 传递给后端数据库（为什么不直接在发布留言时输入一个username？ 因为这样太没有技术含量了，而且游客可以很方便的变无数个username）
//   }


function submit(){//搜索或者登录或者注销
  if(state.whatToDo=="搜索"){
    if(Router.currentRoute.value.path=='/search/detail'){
    ElMessage.error('无法在搜索结果界面搜索')
    Router.push('/home')
  }else{
    Router.push({
    path:'/search/detail',
    query:{
      key:state.searchContent
    }
  })
  }
  }

  if(state.whatToDo=="登录"){
     if(state.loginForm.username!='' && state.loginForm.password!=''){//输入内容不为空时
          
      if(state.loginForm.username==state.localUser.username && state.loginForm.password==state.localUser.password){
      ElMessage({
      message:'登录成功',
      type:'success'
       })
       dialogVisible.value=0
       localStorage.setItem('isLogin',1)
       mainStore.visitorLogin=1 //改变store里的游客登录状态
     }
     else{
      ElMessage.error('游客名或密码错误')
     }

     }else{//输入内容为空时
      ElMessage.error('请完善登录内容')
     }

     
  }



  if(state.whatToDo=="注册"){

    if(state.registerForm.username!='' && state.registerForm.password!='' &&  state.registerForm.confirmPassword!=''){//输入内容不为空时
      if(state.registerForm.password!==state.registerForm.confirmPassword){
      ElMessage.error('两次输入密码不一致,请重新输入')
    }
    
    else{
    let data =JSON.stringify({
     username:state.registerForm.username,
     password:state.registerForm.password
   })
   localStorage.setItem('user',data)
   localStorage.setItem('isLogin',0)

   let initData= localStorage.getItem('user')//初始化登录验证对错的用户表
    state.localUser=JSON.parse(initData)//初始化登录验证对错的用户表

   mainStore.visitorLogin=0//改变store里的游客登录状态
   dialogVisible.value=0
   ElMessage({
    message:'注册成功',
    type:'success'
   })
   
  }

    }
    else{//输入内容为空时
      ElMessage.error('请完善注册内容')
    }
   

  }

  if(state.whatToDo=="退出登录"){
    localStorage.setItem('isLogin',0)
    dialogVisible.value=0
    mainStore.visitorLogin=0
    ElMessage({
    message:'退出登录成功',
    type:'success'
   })
  }

}

function closeDialog(){//弹窗关闭的回调
  state.searchContent=''
  state.loginForm.username=''
  state.loginForm.password=''
  state.registerForm.username='',
  state.registerForm.password='',
  state.registerForm.confirmPassword=''

}
onMounted(()=>{
  let initData= localStorage.getItem('user')
  if(initData){//初始化登录验证对错的用户表
    state.localUser=JSON.parse(initData)
  }
  let loginStatus = localStorage.getItem('isLogin')
  
  if(initData ){//条件1
    if(loginStatus==1){//条件2
      mainStore.visitorLogin=1//改变store里的状态
    }
    
  }

  emitter.on('openLogin',(a)=>{
    state.whatToDo=a.whatToDo
    state.dialogTitle=a.dialogTitle
    dialogVisible.value =a.dialogVisible
  })

})









</script>

<style scoped lang="less">
.logo{
    line-height: 40px;
    color: white;
    font-size: 25px;
    position: absolute;
    left: 10px;
}
// .flex-grow {
//   flex-grow: 1;
// }
.el-menu-demo{
    background-color: none;
    
    height: 40px;
    display: flex;
    justify-content: right;
    opacity: 0.5;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 99999999;
}
.el-menu-demo:hover{
    opacity: 1;
}
</style>

<style>
.el-message {
  height: 50px !important;
  top: 65% !important;
  margin-top: -100px !important;
  z-index: 100000002 !important;
}
</style>