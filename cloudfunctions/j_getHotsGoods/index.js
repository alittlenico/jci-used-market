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
  return await db.collection('j_goods').aggregate()
  .lookup({
    from: 'j_user',      
    localField: 'userInfo',   
    foreignField: 'userInfo',  
    as: 'user'     
  })
  .skip(event.page)
  .sort({
    hits:-1 //按点击数降序排列
  })  
  .limit(event.num)
  .end()
}