<template>
  <div class="container">
     <!-- 导航栏 -->
   <NavMenu></NavMenu>
   <!-- 回顶部 -->
   <el-backtop :right="100" :bottom="100" />
    <!-- 首页欢迎界面 -->
     <div class="first">
        <div class="first-content">
            <div class="icon"><el-icon color="pink" class="is-loading"><Star /></el-icon></div>
            <div class="hy" @click="goBottom">Welcome</div>
        </div>
        <!-- 向下跳转的箭头 -->
        <div class="go-bottom" @click="goBottom">
        <el-icon size="50" color="pink"><ArrowDownBold /></el-icon>
        
      </div>    
      
     </div>  <!-- first的div -->


    <!-- 内容区 -->
     <div class="content" ref="content" id="content">
       

        
             <!-- 笔记列表 -->
        <div class="note-container">
         
            <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
            <van-notice-bar scrollable text="欢迎来到我的个人博客------更多详情介绍请打开关于哟~" style="margin-bottom:20px;border-radius: 50px; background-color: white; color: pink;"  left-icon="smile-comment-o"/>
            <!-- 置顶笔记 -->
           <div class="note-item note-item-five-column " @click="goDetail(state.topData.id)" >
               <div class="note-title">{{ state.topData.title }}</div>
               <div class="note-date">
                  <div><el-icon><Position /></el-icon><span style="margin-left: 5px;">置顶</span></div>
                  <div><el-icon><PriceTag /></el-icon><span style="margin-left: 5px;">{{ state.topData.category }}</span></div>
                   <el-icon><Calendar /></el-icon><span style="margin-left: 5px;">{{ state.topData.finalDate }}</span>
               </div>
               <div v-html="state.topData.content" class="note-content" style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;"></div>   
           </div>
           <!-- 正常笔记-->
           <div v-for="(item,index) in state.noteList" :key="index" class="note-item" @click="goDetail(item.id)">
               <div class="note-title">{{ item.title }}</div>
               <div class="note-date">
                <div><el-icon><PriceTag /></el-icon><span style="margin-left: 5px;">{{ item.category }}</span></div>
                <el-icon><Calendar /></el-icon><span style="margin-left: 5px;">{{ item.finalDate }}</span>
               </div>
               <div v-html="item.content" class="note-content" style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;"></div>
            </div>
            <div @click="getMore" style="display:flex;justify-content: center;font-size: 24px;color: white;margin-bottom: 30px;cursor: pointer;">{{state.textcontent}}</div>
          </div>
           







           <!-- fixed博主信息 -->
          <div :class="state.isEnough?state.blogerFixed:state.blogerPrimary">
            <div></div>
            <div class="bloger-img"><img src="../assets/img/kunkun.jpg" alt=""></div>
            <div class="bloger-name">CHAN</div>
            <div class="bloger-category">
                <div class="note" @click="goCategory">
                    <div >笔记</div>
                    <div>{{state.allNoteList.length}}</div>
                </div>
                <div class="look">
                    <div>访问</div>
                    <div>{{state.accessNum}}</div>
                </div>
                <div class="category" @click="goCategory">
                    <div>分类</div>
                    <div>{{ state.allCategoryList.length }}</div>
                </div>
            </div>
            <!-- 音乐播放器 -->
          <div class="music"><Music></Music></div>
          </div>
          
          

     </div><!-- content的div -->


  </div> <!-- container的div -->
</template>

<script setup>
import Music from '../components/Music.vue'
import NavMenu from '../components/NavMenu.vue'
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { getAllCategory } from '../api/category'
import {getAllNote,getSomeNote,getTopNote} from '../api/note'
import {getAccessNum,addAccessNum} from '../api/access'


const Router = useRouter()
const content= ref('null')
const state= reactive({

    isEnough:false, //content到顶部的距离是否走狗
    blogerFixed:"bloger-fixed bloger-info",
    blogerPrimary:'bloger-primary bloger-info',
    topData:{},  //置顶的note数据
    noteList:[], //要渲染的note数据
    pageIndex:1,
    pageSize:5,
    textcontent:'点我加载更多...',
    allNoteList:[],
    allCategoryList:[],
    accessNum:0, //访问量
})

function getAndAddAccess(){//获取访问量并增加访问量
    getAccessNum().then(res=>{
        // 获取访问量
            state.accessNum = res.data[0].number
            //  增加访问量
                let data={
                oldNumber:res.data[0].number,
                addNumber:1
                }
                addAccessNum(data).then(res=>{
                    state.accessNum+=1
                })
    })
}

function getAllNoteData(){//获取全部笔记，主要是获得数量
     getAllNote().then(res=>{
        state.allNoteList=res.data
     })
}
function getAllCategoryData(){//获取全部分类，主要是获得数量
   getAllCategory().then(res=>{
     state.allCategoryList=res.data
   })
}
function  getTopData(){//获取置顶数据
    getTopNote().then(res=>{
        state.topData=res.data[0]
    })
}

function getSomeData(){//分页获取数据
    getSomeNote(state.pageIndex,state.pageSize).then(res=>{
        //每次分页获取数据只要非置顶数据
        let filterList =res.data.filter(a=>{
          return  a.isTop==0
        })
        state.noteList=state.noteList.concat(filterList) 
        
        // 如果没有数据了提示没有更多
        if(filterList.length<1){
           state.textcontent='暂无更多~'
        }
    })
}

function getMore(){//点我加载更多
  state.pageIndex+=1
  getSomeData()
}

function goBottom(){
    content.value.scrollIntoView({behavior: "smooth"})
}
function handleScrollx(){
    // console.log('滚动高度',window.pageYOffset)
    let top =content.value.getBoundingClientRect().top //content距离顶部高度
    if(top<=0){state.isEnough=true}else{state.isEnough=false}
    // console.log('距离顶部高度',top)
    
}
function goDetail(passid) {
    
    Router.push({
        path:'/Note/NoteDetail',
        query:{
            id:passid
        }
    })
}
function goCategory(){
    Router.push('/category')
}
onMounted(
    ()=>{
        window.addEventListener('scroll',handleScrollx,true)

        // getAllData()
        getSomeData()
        getTopData()
        getAllNoteData()
        getAllCategoryData()
        getAndAddAccess()
    },

   
)

onBeforeUnmount(
    ()=>{
        window.removeEventListener('scroll',handleScrollx,true)
    }
)

    


</script>

<style scoped lang="less">
.container{
    min-width: 996px;
}
// 5行展示通用
.note-item-five-column{
        overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:5;
            -webkit-box-orient:vertical;
    }

// 首页欢迎
.first{
//  position: relative;
 height: 100vh;
 background-image: url('../assets/img/1.png');
//  background-repeat: no-repeat;
 background-size:cover;

 display: flex;
 align-items: center;
 justify-content: center;
  .first-content{
    
    font-size: 40px;
    .hy{
        cursor: pointer;
        margin-top: 10px;
        box-shadow: 0 0 5px pink;
     font-size: 40px;
    color: white;
    transition: all 6s;
}
    .hy:hover{
        background-color: pink;

    }
    .icon{
        width: 100%;
        display: flex;
        justify-content: center;
    }
  }
  @keyframes down {
    0%{
        bottom: 50px;
    }
    100%{
        bottom: 30px;
    }
  }
  .go-bottom{
    cursor: pointer;
    position: absolute;
    bottom: 50px;
    animation-name: down;
    animation-duration: 2s;
    animation-iteration-count:infinite
}
}



// 内容区
.content{
  
    // opacity: 0.9;
    padding-top: 60px;
    padding-right: 40px;
    padding-left: 10%;
    // height: 1000px;
    display: flex;
    justify-content: space-between;
    background-image: url('../assets/img/4.jpg');
background-repeat: no-repeat;
background-size: cover;
    
    
    .bloger-fixed{// 当滑动到足够距离时博主信息
       
        @media screen and (min-width: 1200px){
            position: fixed;
         right: 40px;
         top: 60px;
        }
        width: 20vw;
        height: 400px;
        background-color: white;
        
         border-radius: 10px;
        box-shadow: 0 0 5px gray;
    }
    .bloger-primary{//正常情况博主信息
        width: 20vw;
        height: 400px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 5px gray;
    }
    .bloger-info{//两者博主信息排版公有
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-between;
        padding: 20px 0;
        .bloger-img{
            width: 50%;
           
            img{
                width: 100%;
                border-radius: 50%;
                transition: all 2s;
            }
            img:hover{
                transform: scale(1.2,1.2);
            }
        }
        
        .bloger-name{
            font-size: 20px;
            margin:20px 0;
        }
      .bloger-category{
        width: 100%;
        display: flex;
        justify-content: space-between;
        
        .note{
            cursor: pointer;
            width: 20%;
            text-align: center;
            div{
                &:nth-child(1){
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                &:nth-child(2){
                    font-size: 10px;
                }
            }
        }
        .look{
            width: 20%;
            text-align: center;
            div{
                &:nth-child(1){
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                &:nth-child(2){
                    font-size: 10px;
                }
            }
        }
        .category{
            cursor:pointer;
            width: 20%;
            text-align: center;
            div{
                &:nth-child(1){
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                &:nth-child(2){
                    font-size: 10px;
                }
            }
        }
      }
    }
    
    .note-item{
        overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:4;
            -webkit-box-orient:vertical;
        cursor: pointer;
        white-space: pre-wrap;
        width: 60vw ;
        height: 150px;
        background-color: white;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 5px gray;
       
    // white-space: nowrap;
        
        .note-title{
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
        .note-content{
            padding: 0 5%;
            // display: none;
        }
        .note-date{
            font-size: 14px;
            padding-left: 70%;
        }

    }
    
}




</style>