<template>
  <NoteEditor :isEdit="isEdit" :initData="state.initData"></NoteEditor> <!-- isEdite=0 =>发布 =1  =>编辑 -->
</template>
<!-- 1 -->
<script setup>
import NoteEditor from '../../components/NoteEditor.vue'
import { useRoute } from 'vue-router';
import { compile, computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { getNoteById } from '../../api/note';

const route =useRoute()
const isEdit=ref(0)
const state=reactive({
  initData:{
    
         title:'',
         category:'',
         content:''
         
  }
})

onMounted(()=>{
  if( Object.keys(route.query).length>0 ){
    isEdit.value=route.query.isEdit
  
   getNoteById(route.query.id).then(res=>{
    state.initData.title=res.data[0].title
    state.initData.category=res.data[0].category
    state.initData.content=res.data[0].content

   })
        
  }

  
  
    
})

</script>

<style>

</style>