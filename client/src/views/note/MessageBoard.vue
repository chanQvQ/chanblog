<template>
  <!-- 导航栏 -->
  <NavMenu ></NavMenu>
 <div class="container">
      <div class="content-box">
         <div class="showData">
          
          <ul 
          :infinite-scroll-distance="state.getMoreMarginBottom"
          v-infinite-scroll='getMore' 
          class="ul-list" 
          style="overflow: auto"
          infinite-scroll-immediate="false"
          ref="myUl"
          >
          <!-- 下面三个都是绝对定位 -->
          <div v-if="state.boardList.length==0" class="notice">空空如也~赶紧来留言吧<span>🤗</span></div>
          <div v-if="state.boardList.length!=0" class="notice">良言一句三冬暖,恶语伤人六月寒<span>🤗</span></div>
         
          <div class="to-top" @click="gofirstRef"><el-icon ><CaretTop /></el-icon></div> <!-- 向上跳转图标 -->
         

                    <li v-for="item in state.boardList" :key="item.id" class="li-item" :ref="setItemRefs" @click="goDetail(item.id)" >
                  <div class="content" v-html="item.content" style=" max-height: 300px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:11;-webkit-box-orient:vertical;" ></div>
                  <div class="usernameAndimg">
                          <div class="img"><img src="../../assets/img/visitor.jpg" alt=""></div>
                          <div class="username">{{ item.userName }}</div>
                  </div>
                  <div class="item-date">{{ item.createDate }}</div>

              </li>
          </ul>
          </div>
          <div class="editor"> <MyEditor editorHeight="250px"></MyEditor></div>

            <div class="btn">
          <el-button type="primary" @click="throttlSubmit" size="small">发布</el-button>
          <el-button type="danger" @click="cancel" size="small">撤销</el-button>
           </div>
      </div>
 </div>
 <!-- <el-button @click="clg">123</el-button> -->
</template>

<script setup>
import NavMenu from '../../components/NavMenu.vue';
import MyEditor from '../../components/MyEditor.vue';
import emitter from '../../utils/mitt'
import { nextTick, onBeforeUpdate, onMounted, onUpdated, reactive,ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '../../store/main';
import {addMessageBoard,getMessageBoard} from '../../api/liuyan'
import { getDate } from '../../utils/date';
import { ElMessage } from 'element-plus';

// function clg(){
//   console.log('内部高度',myUl.value.scrollHeight)
//   console.log('滚动条',myUl.value.scrollTop)
// }
//获取v-for的dom
function setItemRefs(el){
if(el){
state.itemRefs.push(el)
}
}
//跳转第一个留言 ref
function gofirstRef(){
let lastRef=state.itemRefs[0]

lastRef.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})

}

const Router= useRouter()
const myUl =ref(null)
const mainStore =useMainStore()
const state =reactive({
  boardList:[],
  pageSize:5 ,
  pageIndex:1,
  total:0,
  itemRefs:[],
  getMoreMarginBottom:1 ,//划到底部多少距离时加载数据，
  insertData:{}//发布时要插入到boardList
})
function goDetail(id){ //去详情
  Router.push({
    path:'/note/BoardDetail',
    query:{
      id:id
    }
  })
}
function getTotal(){//获取总数
getMessageBoard().then(res=>{
  state.total =res.data.length
  console.log('总数',state.total)
})
}

function initData(){//分页获取数据
getMessageBoard(state.pageIndex,state.pageSize).then(res=>{
  console.log(res)
  let moreList = res.data
  
  state.boardList=state.boardList.concat(moreList)
})
}


function getMore(){//留言板划到底部触发
  if(state.boardList.length == state.total){
      ElMessage({
          message:"没有更多啦",
          type:"warning"
      })
  }else{
      state.pageIndex += 1
     initData()
  }

}
function move (){//发布后滚到底部动画
  let speed =20
  let time =3
function donghua(){
  
   myUl.value.scrollTop+=speed
if(myUl.value.scrollHeight-myUl.value.scrollTop<=500){
   console.log('停止')
   clearInterval(stop)
  
}
}
let stop = setInterval(donghua,time) 
}  
function throttle(fun,delay){//节流函数
   let t = null
   return function(){
    if(t!=null){
      ElMessage.error('别刷屏')
      return
    }
    t=setTimeout(()=>{
      fun.call(this)
      t=null
    },delay)
   }
}
function throttlSubmit(){//节流形式发布
  throttle(submit,2000)()
}
function submit(){//发布
  console.log(mainStore.contentData)
   
   if(mainStore.visitorLogin){//登录状态
        if(mainStore.contentData!='<p><br></p>'){//输入不为空
                                            let now = getDate()
                                    let localData = JSON.parse(localStorage.getItem('user')) 
                                    
                                    let data={
                                        content:mainStore.contentData,
                                        createDate:now,
                                        userName:localData.username||"匿名"
                                    }
                                    
                                    addMessageBoard(data).then(res=>{//添加成功后的操作
                                      emitter.emit("clear",1)//清空留言板内容
                                      state.total+=1
                                         getMessageBoard().then(res=>{
                                             state.boardList=res.data
                                            // move()  方案二：写一个动画滚动到最底部   两者都是为了留言后跳转至刚刚留言的内容
                                            nextTick(()=>{//方案一 利用nextTick找到更新后最后一个v-for的dom 
                                              let lastRef=state.itemRefs[state.itemRefs.length-1]

                                           lastRef.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                                            })                               
                                         })
                                        
                                     
                                        
                                    })
  }
    
      else{//输入为空
          ElMessage.error('请输入留言内容')

        }
  
  }
  else{//非登录状态
      ElMessage.error('请先登录')
      emitter.emit('openLogin',{whatToDo:'登录',dialogVisible:1,dialogTitle:"登录(如果忘记密码重新注册即可)"})
  }
  
  console.log('登录状态',mainStore.visitorLogin)
   


    
   





}
function cancel(){//清空内容
emitter.emit("clear",1)//MyEditor里绑定了清空内容的事件 =》clear
// console.log('离顶部高度',myUl.value.scrollTop)
// console.log('可滚动高度',myUl.value.scrollHeight)
// gofirstRef()



}


onMounted(()=>{

initData()
getTotal()
console.log('游客登录状态',mainStore.visitorLogin)
})
onBeforeUpdate(()=>{

state.itemRefs=[] //动态获取ref 需要在更新前清空


})
onUpdated(()=>{


})

</script>

<style scoped lang="less">
.container{
background-image: url('../../assets/img/7.jpg');
background-repeat: no-repeat;
background-size: cover;
min-width: 996px;

// overflow: hidden;

}

.content-box{
  height: 100vh;
  box-sizing: border-box;
  background-color: white;
  // margin: 40px 10% 0 10%;
  margin: 0 10%;
  padding: 50px 50px;
  opacity: 1;
  position: relative;
    .showData{
      .notice{
          font-size: 20px;
          text-align: center;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          opacity: .9;
      }
      .to-top{
        font-size: 20px;
        position: absolute;
        right: 5px;
        bottom:58%;
        background-color: pink;
        color: white;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        transition: all 2s;
        
      }
      .to-top:hover{transform: scale(1.1,1.1);}
        
               .ul-list {
                  box-shadow: 0 0 5px pink;
                  height: 300px;
                  padding-bottom:30px ;
                  margin: 0;
                  list-style: none; 
                  // position: relative;
                  .li-item{
                    cursor: pointer;
                      margin-top: 30px;
                      padding-right: 50px;
                      border: 1px solid pink;
                      border-radius: 10px;
                      box-shadow: 0 0 5px pink;
                       .content{
                          padding-left: 50px;
                       }
                       .usernameAndimg{
                          display: flex;
                          justify-content: flex-end;
                          
                          .username{
                            font-size: 14px;
                            line-height: 30px;
                            margin-left: 10px;
                            width: 90px;
                            overflow:hidden;text-overflow:ellipsis;white-space: nowrap;
                           
                          }
                          img{
                             
                              width: 30px;
                              height: 30px;
                              border-radius: 50%;
                          }
                       }
                       .item-date{
                              font-size: 14px;
                              display: flex;
                              justify-content: flex-end;
                          }
                  }
              }
    }
}



.btn{
  display: flex;
  justify-content: flex-end;
  padding-top:20px; 
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