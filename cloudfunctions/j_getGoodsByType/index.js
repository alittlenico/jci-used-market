// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
// 根据类型查找商品数据,传入的字段
// page 跳过的数据数，用于触底刷新
// type 指定数据的type
// num 一次加载的数据数
exports.main = async (event, context) => {
  return await db.collection('j_goods').aggregate()
  .lookup({
    from: 'j_user',      
    localField: 'userInfo',   
    foreignField: 'userInfo',  
    as: 'user'     
  })
  .skip(event.page)
  .sort({
    create_time:-1
  })
  .match({
    type:event.type
  })
  .limit(event.num)
  .end()
  
}