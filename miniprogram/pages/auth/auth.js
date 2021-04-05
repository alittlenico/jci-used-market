// miniprogram/pages/auth/auth.js
//获取小程序实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取用户授权信息
  getUserInfo: function (res) { 
    console.log('res ==> ', res);
    var icon = res.detail.userInfo.avatarUrl
    var nickname = res.detail.userInfo.nickName
    var userInfo = null
    //已经授权
    if (res.detail && res.detail.userInfo) {
      // console.log("res.detail.userInfo =>",res.detail.userInfo)
      // console.log('app.globalData ==> ', app.globalData);
      // 返回userInfo
      wx.cloud.callFunction({//调用注册函数
        name:"login",
        success:res=>{
          console.log(res.result.event.userInfo)
          userInfo = res.result.event.userInfo
          wx.cloud.callFunction({//根据userInfo查找云数据库中是否有该用户
            name:"j_getUserByUserInfo",
            data:{
              userInfo:userInfo
            },
            success:res=>{
              console.log("res =>",res)
              var user = {//构造用户对象
                icon:icon,
                nickname:nickname,
                userInfo:userInfo
              }
              if(res.result.data.length==0){//数据库中没有此用户,添加用户
                wx.cloud.callFunction({
                  name:"j_addUser",
                  data:{
                    user:user
                  },
                  success:res=>{
                    console.log("res =>",res)
                  }
                })
              }
              app.globalData.isAuth = true;
              app.globalData.user=user
              console.log("-------------------")
              wx.navigateBack({
                url: '../index/index'
              })
            }
          })
        }
      })
      
      // 根据userInfo到j_user中查询，若没有用户，则添加用户(icon nickname userInfo)
      //在app.globalData设置当前用户的信息
      
    } else {
      wx.showToast({
        title: '没有授权',
      })
      app.globalData.isAuth = false;
    }
  }

  
})