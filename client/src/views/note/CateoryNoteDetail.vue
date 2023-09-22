<template>
    <!-- 导航栏 -->
    <NavMenu></NavMenu>
<div class="container">


    <div class="category-note-container">
        <div v-if="state.isNull" class="no-data">
            <div class="tishi">哦豁~</div>
            <div class="tishi">{{ Route.query.categoryName }}分类下空空如也~</div>
            <!-- <img src="../../assets/img/kunkun.jpg" alt=""> -->
        </div >



        <div v-if="!state.isNull">
        <van-notice-bar class="notice" scrollable :text="state.noticeText"  left-icon="location-o"/>

        <div v-for="(item,index) in state.noteList" :key="index" class="note-item" @click="goDetail(item.id)">
               <div class="note-title">{{ item.title }}</div>
               <div class="note-date">
                <div><el-icon><PriceTag /></el-icon><span style="margin-left: 5px;">{{ item.category }}</span></div>
                <el-icon><Calendar /></el-icon><span style="margin-left: 5px;">{{ item.finalDate }}</span>
               </div>
               <div v-html="item.content" class="note-content" ></div>
            </div>
        </div>
      <!-- 分页器       -->
      <el-pagination 
      style="justify-content: center;margin:50px 0;"
      v-if="!state.isNull"
      v-model:current-page="state.pageIndex"
      v-model:page-size="state.pageSize"
      :page-sizes="[2, 3]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />



    </div>
</div>
</template>

<script setup>
import NavMenu from '../../components/NavMenu.vue';
import { onMounted, reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getAllNote } from '../../api/note';

const Router= useRouter()
const Route =useRoute()
const state=reactive({
    noteList:[],
    pageIndex:1,
    pageSize:3,
    total:0,
    noticeText:`您当前所在分类为:${Route.query.categoryName}`,
    isNull:0
})


function initData(pageindex,pagesize){
    getAllNote().then(res=>{
        let filterList = res.data.filter(a=>{
            return a.category == Route.query.categoryName
        })
        if(filterList.length==0){
            state.isNull=1
        }
        state.total =filterList.length
        let fenyeList = filterList.slice((pageindex-1) * pagesize,(pageindex-1) * pagesize + pagesize)
        state.noteList = fenyeList
    })
    
}
// size发生变化时
function handleSizeChange(e){
    state.pageSize=e
    initData(state.pageIndex,state.pageSize)
}

//当前页发生变化时
function handleCurrentChange(e){
    state.pageIndex=e
    initData(state.pageIndex,state.pageSize)

}
//跳转详情
function goDetail(passid){
    Router.push({
        path:'/Note/NoteDetail',
        query:{
            id:passid
        }
    })
}


onMounted(()=>{
    initData(state.pageIndex,state.pageSize)
})
</script>

<style scoped lang="less">
 
 .container{
  background-image: url('../../assets/img/7.jpg');
  background-repeat: no-repeat;
  background-size: cover;
 }
 .category-note-container{
    min-height: 100vh;
    box-sizing: border-box;
    background-color: white;
    // margin: 40px 10% 0 10%;
    margin: 0 10%;
    padding: 50px 50px;
    opacity: 0.7;
    
    

 }
 .notice{
    width: 60vw;
    margin: 0 auto 20px auto;
    border-radius: 50px; 
    background-color: white; 
    color: black;
 }
 .note-item{
    cursor: pointer; 
    overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:4;
            -webkit-box-orient:vertical;



        white-space: pre-wrap;
        width: 60vw ;
        height: 150px;
        background-color: white;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 5px gray;
        margin: 0 auto 20px auto;
       
    // white-space: nowrap;
        
        .note-title{
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
        .note-content{
            overflow:hidden;
            text-overflow:ellipsis;
            
            display:-webkit-box;
            -webkit-line-clamp:1;
            -webkit-box-orient:vertical;
           padding: 0 5%;
            // display: none;
            
        }
        .note-date{
            font-size: 14px;
            padding-left: 70%;
        }

    }
    .no-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        .tishi{
            font-size: 24px;
            
        }
        img{
            margin-top: 200px;
        }
    }

</style>