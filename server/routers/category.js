const express = require('express')

const router = express.Router()
const {db,genid} =require('../db/dbUtils')
const {v4:uuidv4} =require('uuid')

//获取全部分类
router.get('/getAllCategory',(req,res)=>{
    let getSql='select * from category'
    db.all(getSql,[],(err,data)=>{
        if(!err){
            res.send(data)
        }
    })
})

//根据id获取分类
router.get('/getCategoryById',(req,res)=>{
    let sql= 'select * from category where category_id=?'
    db.all(sql,[req.query.id],(err,data)=>{
        
        res.send(data)
    })
})


//新增分类
router.post('/token/addCategory',(req,res)=>{
    let addSql='INSERT INTO category (category_id,name) values (?,?)'
    db.all(addSql,[genid.NextId(),req.body.name],(err,data)=>{
        if(!err){
            res.send({
                success:1,
                alert:'增加分类成功'
            })
        }
       
    })
})
//删除分类
router.post('/token/deleteCategory',(req,res)=>{

    let deleteSql = 'delete from category where category_id=?'
    db.all(deleteSql,[req.body.category_id],(err,data)=>{
        if(!err){
            res.send({
                success:1,
                alert:'删除分类成功'
            })
        }
    })
})


module.exports = router