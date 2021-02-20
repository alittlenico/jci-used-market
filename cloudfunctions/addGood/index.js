// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // var form = event.form
  // console.log(form.gd_imgArr)
  try {
    return await db.collection('j_goods').add({
      data: {
        create_time:form.create_time,
        address:form.gd_address,
        contact:form.gd_contact,
        des:form.gd_des,
        imgArr:form.gd_imgArr,
        price:parseFloat(form.gd_price),
        title:form.gd_title,
        type:form.gd_type,
        hits:1,//点击数 初始为0，
        userInfo:event.userInfo  
      }
    });
  } catch (err) {
    console.log("err =>".err)  
  }
}