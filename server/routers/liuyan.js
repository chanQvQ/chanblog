const express = require('express')

const router = express.Router()
const {db,genid} =require('../db/dbUtils')
const {v4:uuidv4} =require('uuid')

//获取所有留言（或者分页获取）
router.get('/getMessageBoard',(req,res)=>{
    
    
    
        
    
    
   
    if(req.query.pageSize=='undefined' & req.query.pageIndex=='undefined'){
        console.log(req.query.pageSize)

        let sql = 'select * from liuyan'
        
         db.all(sql,[],(err,data)=>{
            
            if(!err){
                res.send(data)
            }
         })
    }
    
    if(req.query.pageSize!='undefined' & req.query.pageIndex!='undefined') {
        console.log(req.query.pageSize)
        let pageSize=req.query.pageSize
       let  pageIndex=req.query.pageIndex-1
       let  sql = 'select * from liuyan limit ?,?'
         db.all(sql,[pageIndex*pageSize,pageSize],(err,data)=>{
            // console.log(err)
            if(!err){
                
                res.send(data)
                
            }
        })
    }

  })

  //根据ID获取留言数据
  router.get('/getMessageBoardById',(req,res)=>{
    let id= req.query.id
    let sql='select * from liuyan where id = ?'
    db.all(sql,[id],(err,data)=>{
        console.log(err)
        if(!err){
            res.send(data)
        }
    })
})

//增加留言数据
router.post('/addMessageBoard',(req,res)=>{
    let a= req.body
    let sql='INSERT INTO liuyan (id,content,createDate,userName) values (?,?,?,?)'
    db.all(sql,[genid.NextId(),a.content,a.createDate,a.userName],(err,data)=>{
        if(!err){
            res.send({
                success:1,
                alert:"留言成功"
            })
        }
    })
})
//根据id删除留言
router.post('/token/delMessageBoardById',(req,res)=>{
    let a= req.body.id
    let sql='delete from liuyan where id = ?'
    db.all(sql,[a],(err,data)=>{
        if(!err){
            res.send({
                success:1,
                alert:"删除成功"
            })
        }
    })
})

module.exports = router