<template>
    
  
    
  
    <!-- Form -->
    
    <!-- 添加分类 -->
    <el-dialog v-model="state.dialogVisible" :title="state.title">
      <el-form :model="form">
        <el-form-item label="分类名称:" :label-width="formLabelWidth" v-if="state.isAdd===1">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
      <!-- 删除分类 -->
        <el-form-item label="分类名称:" :label-width="formLabelWidth"  v-if="state.isAdd==0">
          <el-select v-model="state.form.delCategory_id" placeholder="请选择分类">
            <el-option v-for="(item,index) in state.categoryList" :key="item.id" :label="item.name" :value="item.category_id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit" :disabled="state.visitorMode" >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script  setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import emitter from '../utils/mitt';
  import { addCategory,getAllCategory,delCategory,getCategoryById } from '../api/category';
  import { getAllNote } from '../api/note';
  import { ElMessage } from 'element-plus'
  import { useMainStore } from '../store/main';
  const mainStore =useMainStore()
  const emit = defineEmits(['initCategory'])
  const formLabelWidth = '140px'
  const props = defineProps(['isVisible'])
 const state=reactive({
    dialogVisible:0,
    title:'',
    isAdd:1,
    form:{
        name:'',
        delCategory_id:''  //想要删除的分类id
    },
    categoryList:[],
    wantDelCategoryName:'',
    allNoteList:[]
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

 //初始获得全部分类分类
  function initCategory(){
    getAllCategory().then(res=>{
        state.categoryList=res.data
    })
  }
 function submit(){
    //增加分类时
    if(state.isAdd ==1){
        // 思路:先拿到所有分类,取name,如果要加的name和取的name有相同的.则不可加
        if(state.form.name !=''){
          getAllCategory().then(res=>{
        let allNameArr = res.data.map(a=>{
            return a.name
        })
        
        for(let a in allNameArr){
          allNameArr[a]=allNameArr[a].toLocaleLowerCase()
        }

         let flag= allNameArr.indexOf(state.form.name.toLocaleLowerCase())
        console.log(flag)
        
        if( flag==-1){
            addCategory({name:state.form.name}).then(res=>{
            initCategory()
            state.dialogVisible=0
            state.form.name=''
            emit('initCategory',null)
   })
        }
        else{
            ElMessage.error('已存在!')
        }
     })
        }else{//不为空的else
          ElMessage.error('分类不可为空')


        }
    

    }


    //删除分类时
    if(state.isAdd==0){
          
    //思路:先根据id拿到分类的名称 再拿到所有note,如果note里存在该分类,则不可删 
    getCategoryById(state.form.delCategory_id).then(res=>{
            state.wantDelCategoryName=res.data[0].name

            getAllNote().then(res2=>{
            state.allNoteList=res2.data
             let flagArr= state.allNoteList.filter(a=>{
        return a.category == state.wantDelCategoryName
       })
        console.log(flagArr)


       if(flagArr.length>0){
         ElMessage.error('请先删除该分类下的所有笔记')
         
       }

       else{
       

        delCategory({category_id:state.form.delCategory_id}).then(res=>{
            initCategory()
            state.dialogVisible=0
            emit('initCategory',null)
            state.form.delCategory_id=''
        })
       }
    })
          })

    }
}
 
function cancel(){
    state.dialogVisible=0
    state.form.name='',
    state.form.delCategory_id=''


}

  onMounted(()=>{
    initCategory()
    emitter.on('dialogVisible',(a)=>{
       state.dialogVisible=a.DV
       state.title=a.title
       state.isAdd=a.isAdd
    })
  })
  
  </script>
  <style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>