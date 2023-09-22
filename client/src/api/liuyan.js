import axios from '../utils/axios'


//添加留言数据  /api/addMessageBoard  params要求：{content：xxx，createDate：xxx，userName：xxx}
export const  addMessageBoard=(params)=>{
  return axios.post("/api/addMessageBoard",params)
}

// 获取全部留言或者分页获取 /api/getMessageBoard   如果传pageIndex和pageSize 就是分页获取 否则获取全部
export const getMessageBoard=(pageIndex,pageSize)=>{
  return axios.get(`/api/getMessageBoard?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

//根据id获取留言  /api/getMessageBoardById
export const  getMessageBoardById=(id)=>{
    return axios.get(`/api/getMessageBoardById?id=${id}`)
}

//根据id删除留言   /api/token/delMessageBoardById  要求传{id：xxx}
export const delMessageBoardById  =(passid)=>{
    return axios.post('/api/token/delMessageBoardById',{id:passid})
}