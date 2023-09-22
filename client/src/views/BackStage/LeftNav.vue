<template>
    <div class="zhanwei">
      <div v-show="isCollapse==1" class="logo"><el-icon class="is-loading"><Star /></el-icon></div>
      <div v-show="isCollapse==0" class="logo-text">CHAN</div>
    </div>
 
  <el-menu
  background-color="#334157"
  :default-active="Router.currentRoute.value.path"
  text-color="#fff"
  active-color="#FF69B4"
    class="el-menu-vertical-demo"
    router
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    

  >
  

    <el-sub-menu index="1" >
      <template #title>
        <el-icon><Notebook /></el-icon>
        <span>笔记</span>
      </template>
      <el-menu-item index="/BackStage/NoteManage" class="all-style">
        <el-icon><Key /></el-icon>
         <span>笔记管理</span> 
     </el-menu-item>
      <el-menu-item index="/BackStage/Publish" @click="goPublish" class="all-style" >
        <el-icon><ChatRound /></el-icon>
          <span>笔记发布</span>
    </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Edit /></el-icon>
        <span>留言板</span>
      </template>
    <el-menu-item index="/BackStage/BoardManage" class="all-style">
      <el-icon><Key /></el-icon>
        <span>留言管理</span>
    </el-menu-item> 
  </el-sub-menu> 
       
    
        
  </el-menu>

  
</template>

<script setup>

import { onMounted, ref } from 'vue';
import emitter from '../../utils/mitt';
import { useRouter,useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const Router =useRouter()
const Route =useRoute

const isCollapse = ref(1)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
// function goPublish(){
//   if(Router.currentRoute.value.path=="/BackStage/Publish"){
//       ElMessage.error('禁止跳转相同路由,自动为你返回首页')
//       Router.push('/BackStage/Home')
//   }else{
//     Router.push('/BackStage/Publish')
//   }
// }
onMounted(
  ()=>{
    emitter.on('isCollapse',(a)=>{
      isCollapse.value= a
    })
  }
)
</script>

<style scoped lang="less">
.all-style{
padding: 0 !important;
justify-content: center !important;;
  

  
  
}
.el-menu-vertical-demo{
    background-color: rgb(51, 65, 87);
    border-right: none;
   
}
.zhanwei{
    height: 60px;
    display: flex;
      align-items: center;
      justify-content: center;
    .logo{
      
     font-size: 30px;
     color: pink;
    }
    .logo-text{
      font-size: 16px;
      color: pink;
    }
}

</style>


<style>
.el-menu-item.is-active{
  color:pink !important
}
</style>