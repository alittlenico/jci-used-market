// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var form = event.form
  console.log(form.gd_imgArr)
  db.collection('goods').add({
    data: {
      create_time:form.create_time,
      gd_address:form.gd_address,
      gd_contact:form.gd_contact,
      gd_des:form.gd_des,
      gd_imgArr:form.gd_imgArr,
      gd_price:parseFloat(form.gd_price),
      gd_title:form.gd_title,
      gd_type:form.gd_type,
      hits:0,//点击数 初始为0，
      user_id:form.user_id  
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(console.error)  
}