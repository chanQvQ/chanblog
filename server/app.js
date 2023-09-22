const express = require('express')
const app = express()
const {db,genid} =require('./db/dbUtils')
const path=require('path')
const multer =require('multer')
const uploda=multer({
    dest:'./public/upload/temp'
})//指定存放文件缓存地方

// 解决跨域问题
app.all("*",function(req,res,next){
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','*');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    if(req.method.toLowerCase() == 'options')
        res.send(200); // 让options 尝试请求快速结束
    else
        next();
})


app.use(uploda.any())//任何文件都可以上传

app.use(express.json())
app.use(express.static('./public'))
//token拦截中间件
let path_limit="/token"
app.all("*",async (req,res,next)=>{
    if(req.path.indexOf(path_limit)>-1){

        let passToken = req.headers.token
        
      const{err,data} = await  db.async.all('select * from account where token = ? ',[passToken])
      
      if( !err && data.length >0){
         next()
                            
    
    
      }else{
        res.send({
            success:0,
            alert:"没有权限,请先登录"
        })
      } 

    }else{
        next()
    }
    
})






app.use('/api',require('./routers/note.js'))
app.use('/api',require('./routers/login.js'))
app.use('/api',require('./routers/liuyan.js'))
app.use('/api',require('./routers/category.js'))
app.use('/api',require('./routers/fangwen.js'))
app.use('/api',require('./routers/upload.js'))





app.listen('8081',function(){
    console.log('start')
})
