<template>
  <!-- 回顶部 -->
  <el-backtop :right="100" :bottom="100" />
  <!-- 导航栏 -->
  <NavMenu></NavMenu>
 <div class="all-container">
        <div class="note-container">
        <div  class="title"> {{ state.noteInfo.title }}</div>
        <div class="top" v-if="state.noteInfo.isTop==1"></div>
        <div class="category"><el-icon><PriceTag /></el-icon><span style="margin-left: 5px;">{{state.noteInfo.category }}</span></div>
        <div class="date"><el-icon><Calendar /></el-icon><span style="margin-left: 5px;">{{ state.noteInfo.finalDate }}</span></div>
          <div v-html="state.noteInfo.content" class="content"></div>
    
        </div>
</div> 
</template>

<script setup>
import NavMenu from '../../components/NavMenu.vue';
import { onMounted, reactive } from 'vue';
import { getNoteById } from '../../api/note';
import { useRoute } from 'vue-router';
const Route = useRoute()

const state = reactive({
  noteInfo:{}
})

function initData(){
  getNoteById(Route.query.id).then(res=>{
   state.noteInfo= res.data[0]
  })
}
onMounted(
  ()=>{
    initData()
  }
)
</script>

<style lang="less" scoped>
.all-container{
  width: 100vw;
  min-height: 100vh;
background-image: url('../../assets/img/4.jpg');
background-repeat: no-repeat;
background-size: cover;
}
 .note-container{
  box-sizing: border-box;
 min-height: 100vh;
  width: 80%;
  
  // box-sizing: border-box;
  margin: 0 10%  0 10%;
  padding: 50px 0;
  background-color: white;
  .title{
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  .category{
    margin-left:70%;
    font-size: 16px;
  }
  .date{
    margin-left:70%;
    font-size: 16px;
  }
  .content{
    padding: 0 10%;
    
  }
 }
</style>

