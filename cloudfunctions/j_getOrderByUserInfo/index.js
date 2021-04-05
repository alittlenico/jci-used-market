// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('j_order').aggregate()
      .match(_.or([{
          buyer: event
        },
        {
          seller: event
        }
      ]))
      .lookup({
        from: 'j_user',
        localField: 'seller',
        foreignField: 'userInfo',
        as: 'seller'
      })
      .lookup({
        from: 'j_user',
        localField: 'buyer',
        foreignField: 'userInfo',
        as: 'buyer'
      })
      .lookup({
        from: 'j_goods',
        localField: 'productId',
        foreignField: '_id',
        as: 'goodDetail'
      })
      .end()
  } catch (err) {
    console.log("err =>", err)
  }
}