<template>
  <div class="container">
     <!-- <MyEchart :ajaxData="state"></MyEchart> -->
     <!-- 图表 -->
    <div class="main" ref="mainDom"  v-loading="state.isLoading"></div>
    

        

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

const state = reactive({
 isLoading:true
})
let mainDom =ref('null')
async function initMainChart(){
      let res1 = await getAllNote()
      let noteCount =res1.data.length
      let res2 =await getAccessNum()
      let visitCount=res2.data[0].number
      let res3 =await getAllCategory()
      let categoryCount=res3.data.length
      let res4 = await getMessageBoard()
      let messageCount = res4.data.length
      state.isLoading=false
      let myEchart = echart.init(mainDom.value)
      
      myEchart.setOption({
          title: {
      text: '博客各数据情况'
    },
    tooltip: {},
    xAxis: {
      data: ['笔记总数', '访问总数', '分类总数', '留言总数', '人气值', ]
    },
    yAxis: {
      type:'log',
     
    },
    series: [
      {
        name: '值',
        type: 'bar',
        data: 
        [noteCount,
        visitCount,
        categoryCount,
        messageCount,
        visitCount*11

        ],
        color:'#ffc0cb'
      }
    ]
      })
}
onMounted(
    ()=>{
      initMainChart()
})
</script>

<style scoped lang=scss>
.container{
    .main{
  
  width: 500px;
  height: 500px;
}
}
</style>