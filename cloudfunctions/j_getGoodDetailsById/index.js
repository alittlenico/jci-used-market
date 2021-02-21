// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //返回promise 由小程序来处理数据
  console.log("event=>",event) 
  try {
    return await db.collection('j_goods').aggregate()
  .lookup({
    from: 'j_user',      
    localField: 'userInfo',   
    foreignField: 'userInfo',  
    as: 'userInfo'   
  })
  .match({
    _id:event.gdId
  })
  .end()   
  } catch (err) {
    console.log("err =>",err) 
  }
  
}