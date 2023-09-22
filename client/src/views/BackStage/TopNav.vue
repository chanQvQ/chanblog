<template>
  <el-menu
  background-color="#334157"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#fff"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" @click="openLeft" v-show="state.showExpand==1"><el-icon><Expand /></el-icon></el-menu-item>
    <el-menu-item index="0"  @click="closeLeft" v-show="state.showExpand==0"><el-icon><Fold /></el-icon></el-menu-item>

    <div class="flex-grow" />
    <el-sub-menu index="2">
      <template #title>{{state.rightText}}</template>
      <el-menu-item index="2-1" v-if="mainStore.loginMode!='visitor'">退出登录</el-menu-item>
      <el-menu-item index="2-2">返回前台首页</el-menu-item>
     
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { computed, reactive } from 'vue';
import emitter from '../../utils/mitt';
import { useMainStore } from '../../store/main';
import { useRouter } from 'vue-router';
const Router= useRouter()
const mainStore = useMainStore()
const state=reactive({
  showExpand:1,//显示展开或收起图标
  rightText:'' //右上角显示admin 或者游客模式
})
state.rightText=computed(()=>{
  if(mainStore.loginMode=='visitor'){
    return '游客模式'
  }else{
    return 'admin'
  }
})
function handleSelect(e){
  if(e=="2-1"){
    localStorage.removeItem('token')
    localStorage.removeItem('accountId')
    Router.go(0)
  }

  if(e=='2-2'){
     Router.push('/')
  }
}
function openLeft(){
  emitter.emit('isCollapse',0)
  state.showExpand=0
}
function closeLeft(){
  emitter.emit('isCollapse',1)
  state.showExpand=1

}
 
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu-demo{
    background-color: rgb(51, 65, 87);
    
    height: 60px;
    
}
</style>


<style>
.el-menu--horizontal>.el-menu-item.is-active{
   border-bottom: none;
}
</style>