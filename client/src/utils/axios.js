import axios from 'axios'
import { ElMessage } from 'element-plus'
import {baseUrl} from '../utils/serverBaseUrl'
axios.defaults.baseURL=baseUrl
// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.request.use(config=>{
    const passToken = localStorage.getItem('token')
    config.headers.token= passToken
    return config
})


axios.interceptors.response.use(config=>{
    if(config.data.success===1){
        ElMessage({
            message:config.data.alert,
            type:'success'
            
        })
        
    }
    
    if(config.data.success===0){
        ElMessage.error(config.data.alert)
      
    }
    return config
    
    // else{
    //     ElMessage.error('操作失败')
    // }
    
})

export  default axios