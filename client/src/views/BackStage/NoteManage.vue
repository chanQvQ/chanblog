<template>
 <!-- 面包屑导航 -->
 <div style="margin-bottom: 50px;">
    <el-breadcrumb :separator-icon="ArrowRight">
     <el-breadcrumb-item :to="{ path: '/BackStage/Home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item :to="{ path: '/BackStage/NoteManage' }" > 笔记管理</el-breadcrumb-item>
     


   </el-breadcrumb>
 </div>




    <!-- 搜索 -->
    <el-form :inline="true" :model="state.searchForm" class="demo-form-inline">
    <el-form-item label="搜索:"> 
      <el-input style="width:500px" v-model="state.searchForm.searchTitle" placeholder="请输入笔记标题(关键词即可)"  />
    </el-form-item>
    
    <el-form-item >
      <el-button type="primary" @click="search(state.pageIndex,state.pageSize)">搜索</el-button>
    </el-form-item>

  </el-form>
  
  <el-form>
      <el-form-item label="分类展示:">
       <el-select v-model="state.checkCategory" placeholder="请选择分类" :disabled="state.searchForm.searchTitle.length>0? true:false">
        <el-option label="全部" value="all" @click="tableDataByCategory()" />
         <el-option v-for="item in state.categoryList" :key="item.id" :label="item.name" :value="item.name" @click="tableDataByCategory()" />
         
       </el-select>
     </el-form-item>
  </el-form>
      

    <el-table :data="state.tableData" style="width: 100%" sum-text>

          <!--id -->
      <el-table-column label="id" width="150">
        <template #default="scope">
          <div style="display: flex; align-items: center;justify-content: center;">
            
            <span style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
        <!-- 标题 -->
      <el-table-column label="标题" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center;justify-content: center;">
            
            <span style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="分类" width="180">
        <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center;">
            <span style="">{{ scope.row.category }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="内容" width="300">
        <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center;">
            
            <span v-html="scope.row.content" style="max-height:90px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;"></span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="置顶" width="100">
        <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center;">
            <span style="">{{ scope.row.isTop }}</span>
          </div>
        </template>
      </el-table-column>
     
       
      
      <el-table-column label="最后修改时间" width="280" class="time">
        <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center;">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px;">{{ scope.row.finalDate }}</span>
          </div>
        </template>
      </el-table-column>
      
      
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"  
            >编辑</el-button
          > 
          <!-- scope.$index, scope.row-->
          <el-button size="small"  @click="toTop(scope.$index, scope.row)" :disabled="state.visitorMode"  
            >置顶</el-button
          > 
          <el-button
            size="small"
            type="danger"
            @click="handledel(scope.$index, scope.row) "  :disabled="state.visitorMode" 
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
    style="margin-top:50px;justify-content: center;"
      v-model:current-page="state.pageIndex"
      v-model:page-size="state.pageSize"
      :page-sizes="[2, 5]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    
  </template>
  
  <script  setup>
   import { ArrowRight } from '@element-plus/icons-vue'

  import { Timer } from '@element-plus/icons-vue'
  import { computed, onMounted, reactive } from 'vue'
  import { getSomeNote,delNoteById,getAllNote,getNoteByTitle,updateNoteById } from '../../api/note';
  import { getAllCategory} from '../../api/category';
  import { useRouter } from 'vue-router';
  import { getDate } from '../../utils/date';
  import { ElMessage } from 'element-plus'
  import { useMainStore } from '../../store/main';
  const mainStore =useMainStore()
  const Router =useRouter()

  const state =reactive({
    searchForm:{
        searchTitle:''
    },
    tableData:[],
    categoryList:[],
    pageSize:5,
    pageIndex:1,
    total:'',
    checkCategory:'all',
    allSearchList:[],
    isSearch:0,
    // visitorMode:0//游客模式来控制按钮是否可用
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
//   初始化全部数据条数
function getTotal(pageindex,pagesize){
    // 正常情况用不到pageindex等
  getAllNote().then(res=>{
    if(state.checkCategory=='all'){
        state.total=res.data.length
    }
    
    // 分类展示要用到
    else{
        let arr =res.data.filter(a=>{
            return a.category == state.checkCategory
        })
        state.total=arr.length
        state.tableData=arr.slice((pageindex-1)*pagesize,(pageindex-1)*pagesize + pagesize)
    }
    
  })
}
//   初始化分页数据

  function init(){
    getSomeNote(state.pageIndex,state.pageSize).then(res=>{
        if(state.checkCategory=='all'){
           state.tableData = res.data
        }
        })
  }
// 初始化搜索数据

function initSearch(pageindex,pagesize){
    state.checkCategory='all'
    state.isSearch=1
   getNoteByTitle(state.searchForm.searchTitle).then(res=>{
    state.allSearchList=res.data
    state.total=state.allSearchList.length
    state.tableData=state.allSearchList.slice((pageindex-1)*pagesize,(pageindex-1)*pagesize + pagesize)
    console.log(state.tableData)

   })
}
  //获取全部分类
   function initCategory(){
    getAllCategory().then(res=>{
        state.categoryList=res.data
    })
   }

//tableDataByCategory
function tableDataByCategory(){
    state.isSearch=0
    getTotal(state.pageIndex,state.pageSize)
    init()
    
    
}
  function search(pageindex,pagesize){//   搜索
    initSearch(pageindex,pagesize)
  }


  function handleEdit(index,row){//编辑
   Router.push({
    path:'/BackStage/Publish',
    query:{
        isEdit:1,
        id:row.id,
        isTop:row.isTop
        
    }
   })
//    function toTop(index,row){//置顶
//     // {id：xxx，title：xxx，category：xxx ， content：xxx，finalDate：xxx}
//     console.log(111)

//    }
  }


  function toTop(index,row){//置顶
    let now = getDate()
   //得到isTOP=1的数据
   getAllNote().then(res=>{
    let filterList=res.data.filter(a=>{
        return a.isTop==1
    })

      updateNoteById({//将isTop=1的数据变为isTop=0
      id:filterList[0].id,
      title:filterList[0].title,
      category:filterList[0].category,
      content:filterList[0].content,
      finalDate:now,
      isTop:0
      }).then(res2=>{
        //将isTop=0的数据变为isTop=1
    let data={
      id:row.id,
      title:row.title,
      category:row.category,
      content:row.content,
      finalDate:now,
      isTop:1
   }
    updateNoteById(data).then(res=>{
        // 更新显示的数据
        getTotal(state.pageIndex,state.pageSize)
    init()
    if(state.isSearch==1){
        initSearch(state.pageIndex,state.pageSize)
    }
    })


      })
   })
  }
 

  function handledel(index,row){ //删除
    if(row.isTop==1){
        ElMessage.error('删除失败,请先置顶其他笔记')
    }
    else{
        
        delNoteById({id:row.id}).then(res=>{
    getTotal(state.pageIndex,state.pageSize)
    init()


    if(state.isSearch==1){
        initSearch(state.pageIndex,state.pageSize)
    }
    
   })
    }
   
  }
//   分页大小改变时触发
  function handleSizeChange(e){
    if(state.isSearch==0){
        console.log(e)
    state.pageSize=e
    getTotal(state.pageIndex,state.pageSize)
    init()
    
    }
  //可删
    if(state.isSearch==1){
        initSearch(state.pageIndex,state.pageSize)
    }
    
  
  }

function handleCurrentChange(e){
    if(state.isSearch==0){
    console.log(e)
   state.pageIndex=e
   getTotal(state.pageIndex,state.pageSize)
   init()
   }

   if(state.isSearch==1){
    initSearch(state.pageIndex,state.pageSize)
   }
}

  onMounted(
    ()=>{
        init()
        getTotal()
        initCategory()
    }
  )
  

  </script>

 <style lang="less">
 //居中 
 .el-table .cell{
    text-align: center ;
 }
</style>

<style scoped lang="less">

</style>