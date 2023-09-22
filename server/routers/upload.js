const express = require('express')
const fs=require('fs')
const router = express.Router()
const {db,genid} =require('../db/dbUtils')




router.post("/richEditor/upload",(req,res)=>{
    console.log(req.files)
    if(!req.files){
        res.send({
            alert:'没有文件',
            success:0
        })
        return
    }

    let files = req.files
    let send_files=[]
   
    //解析全部文件 xxx.png  取png
    for(let file of files){
      let file_houzhui= file.originalname.substring(file.originalname.lastIndexOf('.'+1))
       let file_name =genid.NextId()+'.'+file_houzhui //文件名

       fs.renameSync(process.cwd()+'/public/upload/temp/'+file.filename,process.cwd()+'/public/upload/'+file_name)
       send_files.push("/upload/"+file_name)
    }
    
    res.send({
        "errno":0,
        "data":{
            "url":send_files[0]  //图片的src
        }
    })


})
module.exports=router

   