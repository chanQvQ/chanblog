<!--
登录流程思路（访问后台界面）：
前端：1.用户名和密码正确：
                 1-1.拿到token，跳转到后台，
                 1-2.在store里修改 state下的 loginMode="admin"
                 1-3.把token存进locaStoreage，封装axios请求拦截器里每次请求带上token请求头，
      2.进入后台时可以通过游客模式和博主模式（登录模式）进入后台
        游客模式：点击时会在store里修改 state下的 loginMode="visitor"
        注：loginMode默认为0
        后台路由守卫：如果store里的loginMode为0，则跳转登录页（预防直接访问后台路由地址）

      ！！！  每次都需要登录才能进后台，并且刷新页面就就会跳转登录界面（pinia数据不具有持久化） 但是可以预防手动在locaStoreage里输入token获得跳转后台的权限

后端设置token：
    1.设置登录路由接口，每次登录成功时修改该用户的token（通过uuid）
    2.设置中间件 根据请求头里的tonken 在账号表里查询是否存在该token，如果不存在接口请求中断并返回"您没有权限，请先登录"
    3.在所有需要token的接口里加入第2步设置的中间件
-->

<template>
<div class="container">
    <!-- 登录表单 -->
    <div class="login">

        <!-- 登录 -->
            <el-form
            v-show="state.isLogin==1"
            ref="ruleFormRef"
            :model="state.loginForm"
            status-icon
            :rules="rules"
            label-width="150px"
            class="demo-ruleForm"
            >
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="account">
                <el-input
                v-model="state.loginForm.account"
                autocomplete="off"
                
                />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="state.loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
           
           
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>
            <div class="forget" @click="forgetP">忘记密码?</div>
            </el-form>

            <!-- 忘记密码 -->
            <el-form :model="state.forgetForm" v-show="state.isLogin==0" label-width="150px">

              <el-form-item label="用户名">
                <el-input
                v-model="state.forgetForm.account"
                autocomplete="off"
                />
              </el-form-item>

              <el-form-item label="新密码">
                <el-input
                type="password"
                v-model="state.forgetForm.password"
                autocomplete="off"
                />
              </el-form-item>
              <!-- //这里是找回密码的验证 ，可通过此处修改密码 -->
              <el-form-item label="小学班主任+常用密码+电话"> 
                <el-input
                v-model="state.forgetForm.anser"
                autocomplete="off"
                :placeholder="state.questionText"
                />
              </el-form-item >
              <el-form-item >
              <el-button type="primary" @click="restPassword(ruleFormRef)" 
                >重置密码</el-button
                >
            </el-form-item>
            <div class="forget" @click="returnLogin">返回登录</div>
            </el-form>
       
    </div>

</div>
</template>

<script setup>

import { reactive,ref } from 'vue';
import { useMainStore } from '../../store/main';

import {login} from '../../api/login'
import { useRouter } from 'vue-router';
import { ElMessage, messageConfig } from 'element-plus';
import {updatePassword} from '../../api/login'

const ruleFormRef = ref(null)
const mainStore= useMainStore()

const Router = useRouter()
const state=reactive({
    isLogin:1,
 loginForm:{
    account:"",
    password:''
 },
 forgetForm:{
    account:'',
    password:'',
    anser:''
 },
 questionText:"格式:'a'+'b'+'c'"
})

const rules=reactive({
    account:[
        {
            required:'true',
            message:"账号不可为空",
            trigger:'blur',
            
        }
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ]
})

function submitForm(){//登录
    ruleFormRef.value.validate((valid) => {
    if (valid) {//这里校验成功开始写代码
     
        let data={
            account:state.loginForm.account,
            password:state.loginForm.password
        }
        login(data).then(res=>{
            console.log(res)
            if(res.data.success){ 
                let token =res.data.data.token
                let accountId=res.data.data.id
                mainStore.loginMode="admin"
                localStorage.setItem('token',token)
                 localStorage.setItem('accountId',accountId)
                Router.push('/BackStage/Home')
            }
            
            
            
           

        })

    } 


  })
 
}
// 忘记密码
function forgetP(){
 state.isLogin=0 //显示找回密码界面
}
//返回登录
function returnLogin(){
    state.isLogin=1
}


//重置密码按钮
function restPassword(){
  if(state.forgetForm.anser!=="XXX"){//这里是找回密码的验证 ，可通过此处修改密码，""内为自定义的验证答案
     ElMessage({
      message:'回答错误',
      type:'error',
      duration:1000
     })
  }
  else{
    let data={
        account:state.forgetForm.account,
        password:state.forgetForm.password,
        anser:state.forgetForm.anser
    }
    updatePassword(data).then(res=>{
        if(res.data.success){
            state.forgetForm={}
        state.isLogin=1
        }
        



    })
  }
}

function resetForm(){//清空

}



</script>

<style scoped lang="less">
  
  .container{
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100vh;
       background-image: url(../../assets/img/7.jpg);
       background-repeat: no-repeat;
       background-size: cover;
       
  }
  .login{

    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 30vw;
    background-color: white;
    box-shadow: 0 0 5px pink;
    opacity: .9;
    .forget{
        font-size: 14px;
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
        color: pink;
    }

  }


</style>

<style>
.el-form-item__label{
    justify-content: flex-start;
}
</style>