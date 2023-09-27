<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="" height="auto"><LeftNav></LeftNav></el-aside>
        <el-container style="height: 100vh;">
          
                <el-header><TopNav></TopNav></el-header>
                <el-main>
                      
                  <router-view></router-view> 
                  </el-main>
       
        </el-container>
      </el-container>
    </div>
  </template>
  

<script setup>
 import LeftNav from './LeftNav.vue';
import TopNav from './TopNav.vue';
 
</script>

<style scoped lang="less">
.el-header{
    padding:0 !important;
}
.el-aside{
    width: auto;
    // max-height: 200vh;
    
    background-color: rgb(51, 65, 87);
    
  
}
.el-main{
  min-width: 
  1140px;
}
.el-header{
  min-width: 1140px;
}



</style>

<style>

</style>