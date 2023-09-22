import axios  from '../utils/axios'

//获取全部分类  /api/getAllCategory
export const getAllCategory =()=>{
    return axios.get('/api/getAllCategory')
}

//根据id获取分类 /api/getCategoryById
export const getCategoryById = (id)=>{
    return axios.get(`/api/getCategoryById?id=${id}`)
}



//增加分类   /api/token/addCategory  params要求 ： {name：xxx}
export const addCategory = (params)=>{
    return axios.post('/api/token/addCategory',params)
}


//删除分类 /api/token/deleteCategory  params要求：{category_id:xxx}
export const delCategory = (params)=>{
    return axios.post('/api/token/deleteCategory',params)
}

