<template>
  <div class="audio-container">
    <audio ref="audio" >
        <source :src="state.nowPlay">
    </audio>
    <div :class="state.isPlay?'play-title':'title-opc'">正在播放:{{ state.songTitle }}</div>
    <div class="controls">
        <div class="left">
            <div ><img src="../assets/img/唱片.webp" alt="" class="img-rotate" ref="img"></div>
            <div><el-icon size="30" @click="pre" class="color"><CaretLeft /></el-icon></div>
            <div><el-icon size="30" v-show="state.isPlay==0" @click="play" class="color" ><VideoPlay /></el-icon></div>
            <div><el-icon size="30" v-show="state.isPlay==1" @click="pause" class="color"><VideoPause /></el-icon></div>
            <div><el-icon size="30" @click="next" class="color"><CaretRight /></el-icon></div>
        </div>
        <div class="right">
            <div>
                <el-icon size="30" class="color"><Service /></el-icon></div>
                <div class="slider">
          <el-slider v-model="state.volume" vertical height="100px" :max="1" :min="0" :step="0.1" />
        </div>
            </div>
       
        
       
       
    </div>
    <div class="list-change">
    <div class="primarySong" ref="primary" @click="checkPrimary">正常的歌</div>
    <div class="blogerSong" ref="blog" @click="checkBloger">博主的歌</div>
    </div>
    
  </div>
</template>

<script setup>
import {compile, computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import zuiai from '../assets/music/最爱.mp3'
import qingyijie from '../assets/music/情意结.mp3'
import guangdong from '../assets/music/广东爱情故事.mp3'
import qingtian from '../assets/music/周杰伦 - 晴天.mp3'
import yequ from '../assets/music/周杰伦 - 夜曲.mp3'
import bandao from '../assets/music/周杰伦 - 半岛铁盒.mp3'






const audio = ref('null')
const img = ref('null')
const blog = ref('null')
const primary = ref('null')

let state =reactive({
    isPlay:0,
    volume:1,
    nowPlay:qingtian,
    check:'primary',
    songTitle:'周杰伦 - 晴天',
    BlogerPlayList:[
        {
            id:1,
            src:zuiai,
            
            title:'CHAN - 最爱'
        },
        {
            id:2,
            src:qingyijie,
            title:'CHAN - 情意结'
        },
        {
            id:3,
            src:guangdong,
            title:'CHAN - 广东爱情故事'
        },
        
    ],
    primaryList:[
         {
            id:1,
            src:qingtian,
            title:'周杰伦 - 晴天'
        },
        {
            id:2,
            src:yequ,
            title:'周杰伦 - 夜曲'
        },
        {
            id:3,
            src:bandao,
            title:'周杰伦 - 半岛铁盒'
        },
    ]
    

})
function checkBloger(){//选择博主的歌
  blog.value.style.borderColor='pink'
  primary.value.style.borderColor='white'
  state.nowPlay=zuiai
  state.isPlay=1
  state.songTitle='CHAN - 最爱'
  state.check='bloger'
  img.value.style.animationPlayState='running'
  audio.value.load()
  audio.value.play()
}
function checkPrimary(){
    primary.value.style.borderColor='pink'
  blog.value.style.borderColor='white'
  state.nowPlay=qingtian
  state.isPlay=1
  state.songTitle='周杰伦 - 晴天'
  state.check='primary'
  img.value.style.animationPlayState='running'
  audio.value.load()
  audio.value.play()
  
}

watch(()=>state.volume,(newV,oldV)=>{
      audio.value.volume=newV
})
function pause(){
   audio.value.pause()
   img.value.style.animationPlayState='paused'
   state.isPlay=0

   
}
function play(){
    audio.value.play()
    img.value.style.animationPlayState='running'
   state.isPlay=1
   console.log(audio.value.volume)
}
function preAndNext(preOrnext){//pre传-1，next传1，
    let list
    if(state.check=='primary'){
        list=state.primaryList
    }else{
        list=state.BlogerPlayList
    }
        let playIndex
        list.forEach(a=>{
         //找到playindex
            if(state.nowPlay==a.src){
            playIndex = a.id
          if(preOrnext==1){
            if(playIndex<list.length){
               playIndex+=preOrnext
               console.log(playIndex)
         }else{
            playIndex=1
            console.log(playIndex)
         }
          }

          if(preOrnext==-1){
            if(playIndex>1){
               playIndex+=preOrnext
            }else{
                playIndex=list.length
            }
          }
            
         }
         
         
    
        })
        //  切换播放（nowPlay）
        list.forEach(b=>{
            if(playIndex==b.id){
            state.nowPlay=b.src
            state.songTitle=b.title
            audio.value.load()
            audio.value.play()
            console.log(state.nowPlay)
         }
         })
    
} 
function next(){
    if(state.isPlay==1){
        preAndNext(1)
    }
  
}
function pre(){
    if(state.isPlay==1){
        preAndNext(-1)
    }
    
}
onMounted(
    ()=>{
        audio.value.addEventListener("ended", function() {
                preAndNext(1)
           })
               
    }
)
onBeforeUnmount(()=>{
    audio.value.removeEventListener('ended',()=>{})
}
             
)
</script>

<style scoped lang="less">
.color{
    color: pink;
}
.audio-container:hover{
  transform: scale(1.2,1.2);
}
.audio-container{
    transition: all 2s;
}
.controls{
    cursor: pointer;
    
    background-color: white;
    box-shadow: 0 0 10px pink;
    width: 18vw;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
   .img-rotate{
    margin-left:1vw;
    width: 2vw;
    border-radius: 50%;
    animation: xuanzhuan 4s linear infinite;
    animation-play-state: paused;
    // animation-fill-mode: forwards;
   }
   .left{
    display: flex;
    align-items: center;
    @keyframes xuanzhuan {
        0%{
         transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);

        }
        
    }
    
   }
   .right{
    margin-right: 2vw;
    position: relative;
   }
   .right:hover .slider{
       display: block;
   }
}

.list-change{
    display: flex;
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    .primarySong{
        cursor: pointer;
        margin-right: 10px;
        border: 3px solid pink;
        box-shadow: 0 0 5px gray;
    }
    .blogerSong{
        cursor: pointer;
        
        border: 3px solid white;
        
        box-shadow: 0 0 5px gray;
    }
}
.play-title{
    font-size: 8px ;
    width: 100%;
    text-align: center;
}
.title-opc{
    font-size: 8px ;
    
    width: 100% ;
    text-align: center;
    opacity: 0;
}

.slider{
  display: flex;
  align-items: center;
  position: absolute;
  left: -20px;
  top: -70px;
  display: none;
}
.slider .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

</style>