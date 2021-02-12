// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //用openid查询云数据库中是否有该用户
  //若没有，则写入数据完成注册
  const wxContext = cloud.getWXContext()
  db.collection('user').where({
    user_id: wxContext.OPENID
  }).get().then(res=>{
    console.log("res:"+res.data)
  })
  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}