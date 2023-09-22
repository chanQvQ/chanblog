const express = require('express')

const router = express.Router()
const {db,genid} =require('../db/dbUtils')
const {v4:uuidv4} =require('uuid')

//获取访问量
router.get('/getAccessNum',(req,res)=>{
    let sql = 'select * from fangwen where id = ?'
    db.all(sql,[1],(err,data)=>{
        if(!err){
            res.send(data)
        }
    })
})

// 增加访问量
router.post('/addAccessNum',(req,res)=>{
    let number = req.body.oldNumber + req.body.addNumber
    let sql = 'update fangwen set number=? where id=?'
    db.all(sql,[number,1],(err,data)=>{
        
     if(!err){
        res.send(data)
     }
    })
})

module.exports = router
