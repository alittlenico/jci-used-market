// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('j_order').add({
        data: {
          id: event.id,
          userAddress: event.userAddress,
          orderDate: event.orderDate,
          seller: event.seller,
          //买家
          buyer: event.buyer,
          //商品id
          productId: event.productId
        }
      })
  } catch (err) {
    console.log("err =>", err)
  }
}