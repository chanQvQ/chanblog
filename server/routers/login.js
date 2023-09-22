const express = require('express')

const router = express.Router()
const {db,genid} =require('../db/dbUtils')
const {v4:uuidv4} =require('uuid')

//用户登录
router.post('/login',async (req,res)=>{
    let {account,password} =req.body
   let {err,data} =  await db.async.all('select * from account where account=? AND password=?',[account,password])
   
   if(err == null && data.length>0){
       let token =uuidv4()
       let updateSql = 'update account set token=? where id=?'
        await db.async.all(updateSql,[token,data[0].id])
        data[0].token=token
        data[0].password=''
        let login_info=data[0]
        res.send({
            success:1,
            alert:'登录成功',
            data:login_info
        })
   }
   else{
        res.send({
            success:0,
            alert:'用户名或密码错误'
        })
   }
   

})
//修改密码（忘记密码）
router.post('/updatePassword',(req,res)=>{
    let password=req.body.password
    let account =req.body.account
    let anser =req.body.anser
    if(anser !="XXX"){//配合前端的回答情况
        res.send({
            success:0,
            alert:'调用接口失败'
        })
    }else
    {

        db.all('select account from account',[],(err,data)=>{
            if(!err){
                   
                  
                 if(data[0].account==account){

                    let sql ='update account set password = ? where account =?'
                    db.all(sql,[password,account],(err,data2)=>{
                        if(!err){
                            res.send({
                                success:1,
                                alert:'修改密码成功'
                            })
                        }
                    })

                 }else{
                    res.send({
                        success:0,
                        alert:'没有该用户'
                    })
                 }

            

              }
        })
   
   
        
   
   
   
    }
    
})
module.exports = router