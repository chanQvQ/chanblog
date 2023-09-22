<template>
<el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/BackStage/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/BackStage/BoardManage' }">留言管理</el-breadcrumb-item>
    <el-breadcrumb-item>留言详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
    

      <div v-html="state.List.content" class="content"></div>
      <div class="username" >留言人:{{state.List.userName  }}</div>
      <div class="date">{{state.List.createDate }}</div>
      <div class="delThis"><el-button type="danger" @click="delThis" :disabled="state.visitorMode">删除</el-button></div>
      
  </div>
</template>

<script setup>
import { getMessageBoardById,delMessageBoardById } from '../../api/liuyan';
import { useRoute,useRouter } from 'vue-router';
import { onMounted, reactive ,computed} from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useMainStore } from '../../store/main';

const mainStore =useMainStore()

const Route =useRoute()
const Router =useRouter()

const state=reactive({
    List:{}
})

//判读是否为游客模式

state.visitorMode=computed(
    ()=>{
      if(mainStore.loginMode=='visitor'){
        return 1
      }else{
        return 0
      }

    }
  )



function initData(){
  getMessageBoardById(Route.query.id).then(res=>{
    console.log(res)
    state.List= res.data[0]
  })

}
function delThis(){
    delMessageBoardById(Route.query.id).then(res=>{
        Router.push('/BackStage/BoardManage')
    })
}

onMounted(()=>{
    initData()
})
</script>

<style scoped lang="less">
.container{
    margin-top: 50px;
}
.content{
    box-shadow: 0 0 5px black;
}
.username{
 font-size: 20px;
 margin: 50px 0;
}
.date{
    font-size: 20px;
    margin-bottom: 50px;
}
.delThis{
    display: flex;
    justify-content: center;
    
}

</style>