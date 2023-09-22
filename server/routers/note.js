const express = require('express')

const router = express.Router()
const {db,genid} =require('../db/dbUtils')
const {v4:uuidv4} =require('uuid')
// 笔记添加接口（已完成）  token
router.post('/token/noteInsert',(req,res)=>{
     
    let insert='INSERT INTO note (id,category,title,content,finalDate) values (?,?,?,?,?)'
    db.all(insert,[genid.NextId(),req.body.category,req.body.title,req.body.content,req.body.finalDate],(err,data)=>{

        if(!err){
            res.send({
                success:1,
                alert:'发布成功'
            })
        }
        
    })
    
})

// 全部笔记获取接口（已完成）
router.get('/getAllNote/',(req,res)=>{
     db.all("select * from note  ",(err,data)=>{    
       if(!err){
        res.send(data) 
       }
    })     
})

//分页获取笔记接口（已完成）
router.get('/getSomeNote',(req,res)=>{
    let pageIndex=req.query.pageindex-1
    let pageSize=req.query.pagesize
    let getsql='select * from note limit ?,?'
    db.all(getsql,[pageIndex*pageSize,pageSize],(err,data)=>{
       
        if(!err){
            res.send(data)
        }
    })
})

//根据id获取一条笔记（已完成）
router.get('/getNoteById',(req,res)=>{
    let id=req.query.id
    let getsql='select * from note where id = ?'
    db.all(getsql,[id],(err,data)=>{
        if(!err){
            res.send(data)
        }
    })
})
//获取置顶的笔记
router.get('/getTopNote',(req,res)=>{
    let getTopSql= 'select * from note where isTop = 1'
    db.all(getTopSql,[],(err,data)=>{
        if(!err){
            res.send(data)
        }
    })
})

//根据id更新笔记  token
router.post('/token/EditNoteById',(req,res)=>{
    let a =req.body
    let updateSql = 'update note set  title=?,category=?,content=?,finalDate=?,isTop=? where id=?'
    db.all(updateSql,[a.title,a.category,a.content,a.finalDate,a.isTop||0,a.id],(err,data)=>{
        
        if(!err){
            res.send({
                success:1,
                alert:'更新成功'
            })
        }
    })
})
//根据id删除笔记  token
router.post('/token/delNoteById',(req,res)=>{
 let id = req.body.id
 let deletSql = 'delete from note where id=?'
 db.all(deletSql,[id],(err,data)=>{
    
    if(!err){
        res.send({
            success:1,
            alert:'删除成功'
        })
    }
 })
})
//根据标题关键词获取笔记  
router.get('/getNoteByTitle',((req,res)=>{
    let key =req.query.key
    let sql= "select * from note where title like ? "  
    let a="%"+key+"%"
    db.all(sql,[a],(err,data)=>{
        
        if(!err){
            res.send(data)
        }
    }) 
}))

module.exports = router