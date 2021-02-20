// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('j_goods').add({
      data: {
        title:event.title,
        des:event.des,
        type:event.type,
        imgArr:event.imgArr,
        price:event.price,
        address:event.address,
        contact:event.contact,
        create_time:event.create_time,
        hits:event.hits,
        userInfo:event.userInfo  
      }
    })
  } catch (err) {
    console.log("err =>".err)  
  }
}