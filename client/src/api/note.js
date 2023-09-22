import axios from '../utils/axios.js'

//插入笔记（发布）接口   /api/token/noteInsert 要求传{category:xxx,title:xxx,content:xxx,finalDate:xxx}
export const publish = (params)=>{
    return axios.post('/api/token/noteInsert',params)
}

//获取全部笔记接口  /api/getAllNote
export const getAllNote=(params)=>{
    return axios.get('/api/getAllNote')
}

//分页获取笔记接口   /api/getSomeNote    要求传pageindex，和pagesize
export const getSomeNote=(pageindex,pagesize)=>{
    return axios.get(`/api/getSomeNote?pageindex=${pageindex}&pagesize=${pagesize}`)
}

//根据id获取笔记     
export const getNoteById =(id)=>{
    return axios.get(`/api/getNoteById?id=${id}`)
}

//获取置顶的笔记  /api/getTopNote 置顶逻辑：改置顶的isTop=0，改想要置顶的isTop=1（用到2次更新笔记api）
export const getTopNote=()=>{
    return axios.get('/api/getTopNote')
}

//根据id更新笔记   /api/token/EditNoteById   params要求：{id：xxx，title：xxx，category：xxx ， content：xxx，finalDate：xxx  ， isTop选填 默认0}

export const updateNoteById= (params)=>{
    return axios.post('/api/token/EditNoteById',params)
}

//根据id删除笔记  /api/token/delNoteById  params要求：{id：xxx}

export const delNoteById = (params)=>{
    return axios.post('/api/token/delNoteById',params)
}

//根据标题模糊查询笔记  /api/getNoteByTitle

export const getNoteByTitle=(key)=>{
    return axios.get(`/api/getNoteByTitle?key=${key}`)
}
