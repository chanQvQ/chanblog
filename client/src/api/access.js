import axios  from '../utils/axios'

//获取访问量 /api/getAccessNum
export const getAccessNum = ()=>{
    return axios.get('/api/getAccessNum')
}

// 增加访问量  /api/addAccessNum  params要求:{oldNumber：xxx ， addNumber：xxx}
export const addAccessNum =(params)=>{   
    return axios.post('/api/addAccessNum',params)
}