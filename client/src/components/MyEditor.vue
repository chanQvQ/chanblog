<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        :style="{height: props.editorHeight, overflowY: 'hidden'}"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch, computed, onBeforeMount, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useMainStore } from '../store/main';
import { useRoute } from 'vue-router';
import { getNoteById } from '../api/note';
import emitter from '../utils/mitt'
import {baseUrl} from '../utils/serverBaseUrl'
import { defineProps } from 'vue';

const  editorConfig={placeholder:'请输入内容...'}
editorConfig.MENU_CONF={}
editorConfig.MENU_CONF['uploadImage'] = {//上传地址
     server: baseUrl+'/api/richEditor/upload',
}
editorConfig.MENU_CONF['insertImage'] = {
     parseImageSrc:(src)=>{
      if(src.indexOf('http')==-1){ //如果src不包含http 
        // return   `http://127.0.0.1:8081${src}`    
        return `${baseUrl}${src}` //带上服务器地址
      }

    return src

     }
}


 const Route= useRoute()
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    

    // 内容 HTML
    // const valueHtml = ref('<p>hello</p>')
    const mainStore =useMainStore()
    const props = defineProps(['content','editorHeight'])
   const state =reactive({
    content:''
   })
    let valueHtml = ref(null)
    
    
    
    
    watch(valueHtml,(newV,oldV)=>{
       mainStore.contentData=newV
    })
       
    

    // 模拟 ajax 异步获取内容
    onMounted(() => {
     
     
        if(Route.query.id){
          getNoteById(Route.query.id).then(res=>{
         state.content =res.data[0].content
         console.log(state.content)
        })
        setTimeout(() => {
            valueHtml.value = state.content
        }, 1000) 
        }
        
        
        emitter.on('clear',function(a){//清空的事件
           if (a==1){
            valueHtml.value=''
           }
        })
        
    })

    

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }


</script>  