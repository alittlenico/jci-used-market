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

    //已经授权
    if (res.detail && res.detail.userInfo) {
      // console.log('app.globalData ==> ', app.globalData);
      app.globalData.isAuth = true;
    } else {
      app.globalData.isAuth = false;
    }
  }

  
})