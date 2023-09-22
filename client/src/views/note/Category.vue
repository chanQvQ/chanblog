<template>
  <!-- 导航菜单 -->
  <NavMenu></NavMenu>

  <div class="container">
      <div class="category-container">
         <div class="name" v-for="item in state.categoryList" :key="item.category_id" @click="goDetail(item.name)">{{item.name }}</div>
      </div>

  </div>
</template>

<script setup>
 import NavMenu from '../../components/NavMenu.vue'
 import { getAllCategory } from '../../api/category';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const Router= useRouter()

const state= reactive({
  categoryList:[]
})

function initData(){
  getAllCategory().then(res=>{
     state.categoryList =res.data
  })
}

function goDetail(name){
  Router.push({
    path:'/category/detail',
    query:{
      categoryName:name
    }
  })
}

onMounted(
  ()=>{
    initData()
  }
)




</script>

<style scoped lang="less">
 
 .container{
    background-image: url('../../assets/img/12.jpg');
    background-repeat: no-repeat;
    background-size: cover;
 }

 .category-container{
  opacity: 0.6;
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 200px 0;
  margin: 0 10%;

   .name{
    cursor: pointer;
    text-align: center;
    line-height: 50px;
       width: 20%;
       height: 50px;
       font-size: 20px;
       border: 1px solid pink;
       border-radius: 50px;
       box-shadow: 0 0 10px pink;
       color: black;
       transition: all 4s;
   }
   .name:hover{
    background-color: rgb(202,225,255);
   }

 }

</style>