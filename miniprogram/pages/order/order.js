// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  userInfo: app.globalData.user.userInfo,
    userInfo:{
      appId:"wx400a701b7abbfeaf",
      openId:"okN0j5W0lf6fPV-f6S4JvxwmgObo"
  },   
    orderData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "j_getOrderByUserInfo",
      data:this.data.userInfo,
      success: res => {
        wx.hideLoading()
        console.log("res ==>",res)
        // 按订单时间排序 优先显示最近时间的
        // res.result.list.sort(function(a,b){
        //   var t1 = new Date(a.orderDate).getTime();
        //   var t2 = new Date(b.orderDate).getTime();
        //   if(t1<t2){
        //     return 1
        //   }else if(t1==t2){
        //     return 0
        //   }else{
        //     return -1
        //   }
        // })
        // this.setData({
        //   orderData:res.result.list
        // })
      },
      fail: err => {
        wx.hideLoading()
        console.log('出错了 err ==> ', err);
      }
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.callFunction({
      name: "j_getOrderByUserInfo",
      data:this.data.userInfo,
      success: res => {
        wx.hideLoading()
        console.log("res ==>",res)
        // 按订单时间排序 优先显示最近时间的
        // res.result.list.sort(function(a,b){
        //   var t1 = new Date(a.orderDate).getTime();
        //   var t2 = new Date(b.orderDate).getTime();
        //   if(t1<t2){
        //     return 1
        //   }else if(t1==t2){
        //     return 0
        //   }else{
        //     return -1
        //   }
        // })
        // this.setData({
        //   orderData:res.result.list
        // })
      },
      fail: err => {
        wx.hideLoading()
        console.log('出错了 err ==> ', err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})