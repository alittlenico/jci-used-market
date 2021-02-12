// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //返回promise 由小程序来处理数据 
  return db.collection('goods').aggregate()
  .lookup({
    from: 'user',      
    localField: 'user_id',   
    foreignField: 'user_id',  
    as: 'userInfo'     
  })
  .match({
    _id:event.gdId
  })
  .end()
}