<template>

    <!-- 面包屑导航 -->
  <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom:50px">
    <el-breadcrumb-item :to="{ path: '/BackStage/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>留言管理</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 表格 -->
  <el-table :data="state.tableData" style="width: 100%">
    <el-table-column label="id" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span class="one-line-show" >{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="留言内容" width="380">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span v-html="scope.row.content" class="one-line-show"></span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="留言用户" width="280">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span class="one-line-show" >{{ scope.row.userName }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="留言时间" width="280">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </div>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          
          @click="handleDetail(scope.$index, scope.row)"
          >详情</el-button
        >
       
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" :disabled="state.visitorMode"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>



  <!-- 分页器  -->
  <el-pagination
      style="display: flex;justify-content: center;margin-top: 50px;"
      v-model:current-page="state.pageIndex"
      v-model:page-size="state.pageSize"
      :page-sizes="[5, 10]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { onMounted, reactive,computed } from 'vue'
import { getMessageBoard,delMessageBoardById } from '../../api/liuyan';
import { useRouter } from 'vue-router';
import { useMainStore } from '../../store/main';
const Router =useRouter()
const mainStore =useMainStore()
const state=reactive({
    tableData:[],
    pageIndex:1,
    pageSize:5,
    total:0
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

//获取total
function initTotal(){
    getMessageBoard().then(res=>{
        state.total=res.data.length
    })
}

//分页获取数据
function initData(){
    getMessageBoard(state.pageIndex,state.pageSize).then(res=>{
        console.log(res.data)
        state.tableData=res.data
    })
}
//删除
function handleDelete(index,row){
     delMessageBoardById(row.id).then(res=>{
        initData()
        initTotal()
     })

}
//查看详情
function handleDetail(index,row){
  Router.push({
    path:'/BackStage/BoardDetail',
    query:{
      id:row.id
    }
  })
               
}

//分页大小改变时触发
function handleSizeChange(e){
    state.pageSize=e
    initData()
}
//当前页改变时触发
function handleCurrentChange(e){
    state.pageIndex=e
    initData()


}


onMounted(()=>{
 
    initData()
    initTotal()

})

</script>

<style scoped lang="less">


.one-line-show{
  max-height: 90px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical
}

</style>
<style>

.el-table .el-table__cell{
 text-align: center;
}
.el-table td.el-table__cell div{
    justify-content: center;
}
</style>