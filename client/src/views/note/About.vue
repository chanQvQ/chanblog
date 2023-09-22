<template>
    <!-- 导航栏 -->
    <NavMenu></NavMenu>
    <!-- 回顶部 -->
   <el-backtop :right="100" :bottom="100" />
    <div class="container">
         <div class="content-box">
             <div class="title">感谢您浏览本站介绍</div>
             <div class="content" v-html="state.content"></div>

             <div class="welcome">欢迎加博主交流</div>
             <div class="wechat-QQ">
                <img src="../../assets/img/wechat.jpg" alt="">
                <img src="../../assets/img/qq.png" alt="">
            </div>



             <div class="ikun" >
                <div class="bgimg"></div>
     <div class="all">
        <div class="first-box">
            <div class="front">
                <span>永远的ikun <br>鼠标放上来</span>
                
                <!-- <span class="iconfont love">&#xe85c;</span> -->
                <span class="love"><el-icon ><StarFilled /></el-icon></span>
            </div>
            <video    loop src="../../assets/resource/1.mp4" ref="Myvideo"></video>
            
            </div>
        <div class="second-box">
            <span>迎面走来的你让我如此蠢蠢欲动，这种感觉我曾未有cause I got a crush on you who you <br><br>建议不要反复观看,多看一眼就会爆炸</span>
            <div class="play-pause">
            <el-button type="primary" @click="playV">播放</el-button>
            <el-button type="primary" @click="pauseV">暂停</el-button>
        </div>

            <a href="https://tieba.baidu.com/f?kw=ikun">点我加入ikun俱乐部！！！</a>
            
        </div>
     </div>
             </div>
         </div>
    </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import NavMenu from "../../components/NavMenu.vue";

const Myvideo = ref(null)
const state = reactive({
    content:'<h1><span style="background-color: rgb(255, 77, 79); font-size: 19px;">------本站还有很多地方没有做到适配手机或平板，只建议电脑访问</span></h1><h1><span style="font-size: 19px;">------为何开发本站</span></h1><p style="text-indent: 2em;"><span style="font-size: 19px;">本人只是个前端工作2年经历的菜鸟（也可以说是</span><span style="background-color: rgb(255, 173, 210); font-size: 19px;">时长两年半的前端练习生</span><span style="font-size: 19px;">🙄），平时在B站看了很多很漂亮的用Hexo框架做的个人博客，个人对后端也比较感兴趣，工作之余自学了一点express，大学期间有学习mysql的经历，加之公司最新的项目都是用Vue3了。本着熟练自己的技术知识的目的，毕竟对程序员来说，多记多学多敲才是成长的最好途径，故以</span><span style="background-color: rgb(255, 173, 210); font-size: 19px;">NodeJS+express框架+sqlite</span><span style="font-size: 19px;">为后端，以</span><span style="background-color: rgb(255, 173, 210); font-size: 19px;">Vue3全家桶+elementPlus+pinia(代替了Vuex)+wangEditor</span><span style="font-size: 19px;">为前端，全栈开发了本站。</span></p><h1><span style="font-size: 19px;">------开发本站干嘛</span></h1><p style="text-indent: 2em;"><span style="font-size: 19px;">主要是拿来记录自己平时的学习笔记，copy一些好的文章，分享分享歌曲（</span><span style="background-color: rgb(255, 173, 210); font-size: 19px;">本站简单做了音乐播放器，还有自己唱的</span><span style="font-size: 19px;">），分享分享自己的日常，或许也能交到志同道合的学友，可以当做是自己的个人空间站(记得高中和大学的时候，经常在贴吧记录一些日常，不过都是私密，现在有缘的人总能看到了，哈哈哈)</span></p><h1><span style="font-size: 19px;">------最后的最后</span></h1><p style="text-indent: 2em;"><span style="font-size: 19px;">有缘看到本站的都是朋友，如果有觉得不好的地方欢迎留言，</span><span style="background-color: rgb(255, 173, 210); font-size: 19px;">良言一句三冬暖，恶语伤人六月寒。🤔</span></p><p><span style="background-color: rgb(225, 60, 57); font-size: 19px;"><strong>------底部有彩蛋（👻）</strong></span></p>'
})
// 播放视频
function playV(){
 Myvideo.value.play()
}
function pauseV(){
 Myvideo.value.pause()
}
</script>

<style scoped lang="less">
 .container{
    background-image: url('../../assets/img/4.jpg');
background-repeat: no-repeat;
background-size: cover;
 }

 .content-box{
    min-height: 100vh;
    box-sizing: border-box;
    background-color: white;
    // margin: 40px 10% 0 10%;
    margin: 0 10%;
    padding: 50px 50px;
    

    .title{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    .welcome{
        font-size: 19px;
        margin: 50px 0;
    }
    .wechat-QQ{
        display: flex;
        justify-content: center;
        img{
            width: 200px;
            height: 300px;
            &:nth-child(1){
                margin-right: 100px;
            }
        }
    }
 }



 .ikun{
    margin-top: 50px;
    margin-left: 15%;
    

.all{


    width: 600px;
    height: 400px;
    
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    /* border: 1px solid black; */
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: 2s;
}
.all .first-box,.all .second-box{
    width: 300px;
    height: 400px;
    position: absolute;
    left: 300px;
    top: 0;
    transform-style: preserve-3d;
}
.all .first-box{
    z-index: 1;
    transform-origin: left;
    transform: rotateY(0);
    transition: all 2s;
    transform-style: preserve-3d;
    backface-visibility: hidden;

}
.all .front{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: 	#CAE1FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.all:hover .first-box{
    transform: rotateY(-180deg);
}
.all:hover{
    transform: translateX(-20%);
}

.all video{
    
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-style: preserve-3d;
    transform: rotateY(180deg);
    z-index: -1;
}

/* 爱心 */
.front span:nth-child(1){
    font-size: 30px;
    color: pink;
    justify-self: end;
}
.front span:nth-child(2){
   
    font-size: 20px;
    color: pink;
    animation-name: love;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-direction:alternate;
}
@keyframes love{
    100%{
        font-size: 50px;
    }
}



.second-box{
    background-color: #CAE1FF;
    /* z-index: 2; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.second-box span{
    font-size: 20px;
    color: white;
    
}
.second-box a{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 100px;
    color: red;
    /* background-color: red; */
}
 }

</style>