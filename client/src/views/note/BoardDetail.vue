<template>
    <NavMenu></NavMenu>
<div class="container">
        
    <div class="detail-container">
          <div v-html="state.List.content" class="content"></div>
          <div class="username" >留言人:{{state.List.userName  }}</div>
          <div class="date">{{state.List.createDate }}</div>
    </div>      
          
</div>
    </template>
    
    <script setup>
    import { getMessageBoardById,delMessageBoardById } from '../../api/liuyan';
    import { useRoute } from 'vue-router';
    import { onMounted, reactive ,computed} from 'vue';
    import NavMenu from '../../components/NavMenu.vue'
  
    const Route =useRoute()
    
    
    const state=reactive({
        List:{}
    })
    
   

    
    function initData(){
      getMessageBoardById(Route.query.id).then(res=>{
        console.log(res)
        state.List= res.data[0]
      })
    
    }
   
    
    onMounted(()=>{
        initData()
    })
    </script>
    
    <style scoped lang="less">
    .container{
        
  width: 100vw;
  min-height: 100vh;
background-image: url('../../assets/img/4.jpg');
background-repeat: no-repeat;
background-size: cover;
}
  
   
    .username{
     font-size: 20px;
     margin: 50px 0;
    }
    .date{
        font-size: 20px;
        margin-bottom: 50px;
    }
 


    .detail-container{
  box-sizing: border-box;
 min-height: 100vh;
  width: 80%;
  
  // box-sizing: border-box;
  margin: 0 10%  0 10%;
  padding: 50px 0;
  background-color: white;
  
  .username{
    margin-left:70%;
    font-size: 16px;
  }
  .date{
    margin-left:70%;
    font-size: 16px;
  }
  .content{
    box-shadow: 0 0 10px pink;
    
    padding: 0 10%;
   
  }

  
 }

 
    
    </style>