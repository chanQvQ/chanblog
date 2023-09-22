<template>
    <!-- 面包屑导航 -->
    <div style="margin-bottom: 50px;">
    <el-breadcrumb :separator-icon="ArrowRight">
     <el-breadcrumb-item :to="{ path: '/BackStage/Home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item  v-if="props.isEdit==0"> 笔记发布</el-breadcrumb-item>
     <el-breadcrumb-item :to="{ path: '/BackStage/NoteManage' }" v-if="props.isEdit==1"> 笔记管理</el-breadcrumb-item>
     <el-breadcrumb-item  v-if="props.isEdit==1"> 笔记编辑</el-breadcrumb-item>


   </el-breadcrumb>
 </div>
 
 
     <el-form :model="state.form" label-width="120px">
       <el-form-item label="标题">
         <el-input v-model="state.form.title"  placeholder="请输入标题"/>
       </el-form-item>
       
       <el-form-item label="分类">
       <el-select v-model="state.form.category" placeholder="请选择分类">
         <el-option v-for="(item,index) in state.categoryList" :key="item.id" :label="item.name" :value="item.name" />
         
       </el-select>
       <el-button type=" primary" style="margin-left: 10px ;" @click="add">新增</el-button>
       <el-button type=" primary" @click="delCategory">删除</el-button>
       <Dialog :isVisible="state.DialogVisible" @initCategory="initCategory"></Dialog>

     </el-form-item> 


        <el-form-item label="内容">
         <!-- <el-input
     v-model="state.form.textarea"
     :rows="15"
     type="textarea"
     placeholder="Please input"
   /> -->
      <MyEditor :content="state.form.content" ref="myeditor" editorHeight="40vh"></MyEditor>
        </el-form-item>
       
        <el-form-item>
       <el-button type="primary" @click="onSubmit" :disabled="state.visitorMode">{{sumbitOrEdit}}</el-button>
       <el-button @click="cancel">撤销</el-button>  
      
     </el-form-item>
       
     </el-form>
   </template>
   
   <script  setup>
   import Dialog from '../components/Dialog.vue'
   import { ArrowRight } from '@element-plus/icons-vue'
   import { computed, nextTick, onMounted, reactive, ref } from 'vue'
   import {publish,updateNoteById} from '../api/note'
   import MyEditor from '../components/MyEditor.vue';
   import {getDate} from  '../utils/date'
   import { useMainStore } from '../store/main';
   import { useRoute,useRouter } from 'vue-router';
    import emitter from '../utils/mitt'
    import {getAllCategory} from '../api/category'
import { ElMessage } from 'element-plus';

   const myeditor=ref(null)
   const mainStore =useMainStore()
   const props = defineProps(['isEdit','initData'])
   const Route =useRoute()
   const Router=useRouter()
   let state =reactive({
     form:{
         title:'',
         category:'',
         content:''
         
     },
     categoryList:[],
     isEdit:'',
     DialogVisible:0
   })
   
   //判读是否为游客模式
state.visitorMode=computed(
    ()=>{
      if(mainStore.loginMode=='visitor'){
        return 1
      }else{
        return 0
      }

    }
  )

   state.isEdit= computed(()=>{
    return props.isEdit
   })
   state.form =computed(()=>{
    return props.initData
   })
  let sumbitOrEdit = computed(
      ()=>{
           if(state.isEdit==0){
            return '发布'
           }else{
            return '编辑'
           }
      }
     )
  //  初始化获取全部分类
 function initCategory(){
     getAllCategory().then(res=>{
      state.categoryList =res.data
      console.log(state.categoryList)
     })
 }
  
 
  function onSubmit(){
        
     let now =getDate()
    //  当是发布功能时
    if(state.isEdit==0){
      if(state.form.category!='' && state.form.title!='' && mainStore.contentData!='<p><br></p>'){
        publish({
       category:state.form.category,
       title:state.form.title,
    //    content:state.form.content,
       content:mainStore.contentData,
       finalDate:now
    }).then(res=>{
     setTimeout(function(){
      Router.push('/BackStage/NoteManage')
     },2000)
    })

      }
      else{
        ElMessage.error('请完善所有内容!')
      }
        
     }

    //  当是编辑功能时
     if(state.isEdit==1){
            if(state.form.category!='' && state.form.title!='' && mainStore.contentData!='<p><br></p>'){//输入不为空时
                 
              let data={
              id:Route.query.id,
              title:state.form.title,
              category:state.form.category,
              content:mainStore.contentData,
              finalDate:now,
              isTop:Route.query.isTop
              
            }
            updateNoteById(data).then(res=>{
              setTimeout(function(){
            Router.push('/BackStage/NoteManage')
          },2000)

          })
            }
            else{
              ElMessage.error('请完善所有内容!')
            }
            
          }
        }
  //清空
  function cancel(){
    emitter.emit('clear',1)//MyEditor里绑定了清空内容的事件 =》clear
    state.form.category='',
    mainStore.contentData='',
    state.form.title=''
  }
  //新增分类
  function add(){
    state.form.category=''
    const passdata={
      DV:1,
      title:'新增分类',
      isAdd:1
    }
    emitter.emit('dialogVisible',passdata)
  }
  //删除分类
  function delCategory(){
    state.form.category=''
    const passdata={
      DV:1,
      title:'删除分类',
      isAdd:0
    }
    emitter.emit('dialogVisible',passdata)
  }
   
  onMounted(()=>{
    initCategory()
    
  
  })
 
   </script>