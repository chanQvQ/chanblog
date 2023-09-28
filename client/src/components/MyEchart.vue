<template>
    <!-- 图表 -->
    <div class="main" ref="mainDom" v-loading="isLoading"></div>
  </template>
  
  <script setup>
  import { nextTick, onMounted, ref, watch } from 'vue'; 
  import { reactive ,defineProps} from 'vue'; 
  import * as echart from 'echarts'
  const props =defineProps(['ajaxData'])
  let isLoading =ref(true)
    
  
  let mainDom = ref('null')
  
  watch(()=>props.ajaxData.messageCount,(newv,oldv)=>{
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
        [props.ajaxData.noteCount,
        props.ajaxData.visitCount,
        props.ajaxData.categoryCount,
        props.ajaxData.messageCount,
        props.ajaxData.visitCount*11],
        color:'#ffc0cb'
      }
    ]
      })
    if(newv==oldv){
        isLoading=false
    }
    })

  </script>
  
  <style scoped lang=scss>
  
  
      
      .main{
  
           width: 500px;
           height: 500px;
      }
  
  </style>