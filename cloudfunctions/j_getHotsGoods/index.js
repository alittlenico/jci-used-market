/**
 * 获取推荐商品
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // num 一次加载的数据数
  // page 跳过的数据数，用于触底刷新
  console.log("page =>",event.page)
  try {
    return await db.collection('j_goods').aggregate()
    .sort({
      hits:-1 //按点击数降序排列
    }) 
    .skip(event.page)
    .limit(event.num)
    .lookup({
      from: 'j_user',      
      localField: 'userInfo',   
      foreignField: 'userInfo',  
      as: 'userInfo'     
    })
    .end()
  } catch (err) {
    console.log("err =>",err)
  }
}