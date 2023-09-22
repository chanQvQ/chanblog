const sqlite3 = require('sqlite3').verbose()
const GenId= require('./SnowflakeID')
const path = require('path')
const db=new sqlite3.Database(path.join(__dirname,'blog.sqlite3'))
const genid=new GenId({WorkerId:1})




db.async = {}

db.async.all = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, data) => {
            resolve({ err, data })
        })
    })
}

db.async.run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, data) => {
            resolve({ err, data })
        })
    })
}


module.exports ={db,genid}