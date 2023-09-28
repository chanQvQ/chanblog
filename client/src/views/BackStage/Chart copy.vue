<template>
  <div class="container">
     <MyEchart :ajaxData="state"></MyEchart>
     <!-- 该copy文件是以封装组件的形式使用echart，配合Mychart组件使用 -->
    

        

  </div>
</template>

<script setup>
import { nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'; 
import { reactive } from 'vue'; 
import * as echart from 'echarts';
import {getAllNote} from '../../api/note'
import{getAccessNum} from '../../api/access'
import {getAllCategory} from '../../api/category'
import {getMessageBoard} from '../../api/liuyan'
import MyEchart from '../../components/MyEchart.vue'
const state = reactive({
    noteCount:0,
    visitCount:0,
    categoryCount:0,
    messageCount:0,
    hot:1000
})


onMounted(
    async()=>{
      let res1 = await getAllNote()
      state.noteCount=res1.data.length
      let res2 =await getAccessNum()
      state.visitCount=res2.data[0].number
      let res3 =await getAllCategory()
      state.categoryCount=res3.data.length
      let res4 = await getMessageBoard()
      state.messageCount = res4.data.length
      
      
       
 
    
    

  
   
    
    
})




    



   






</script>

<style scoped lang=scss>
</style>