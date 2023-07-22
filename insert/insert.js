//import modules
const express = require('express')
let mongodb = require('mongodb')

//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest API
router.post("/", (req, res) =>{
  let obj = req.body
  //connect to mongodb
  mcl.connect(url, (err, conn)=>{
    if(err)
    console.log("error in connection : ", err)
    else {
      let db = conn.db("nodedb")
      db.collection('products').insertOne(obj, (err)=> {
        if(err)
          res.json({'insert': 'Error ' + err})
        else {
          console.log("Data inserted")
          res.json({'insert': 'success' })
          conn.close()
        }
      })
    }
  })
})
//export router
module.exports = router