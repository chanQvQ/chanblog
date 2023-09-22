import axios from "../utils/axios";

//登录接口 /api/login  要求传{account：xxx，password：xxx}
export const login=(params)=>{
    return axios.post('/api/login',params)
}

//修改密码  /api/updatePassword 要求传{account：xxx，password：xxx，anser：xxx}

export const updatePassword = (params)=>{
    return axios.post('/api/updatePassword',params)
}
