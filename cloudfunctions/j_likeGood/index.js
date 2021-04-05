// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event ==>",event)  
  try {
    return await db.collection("j_like").add({
      data:event
    })  
  } catch (error) {
    console.log("error =>",error)  
  }
}