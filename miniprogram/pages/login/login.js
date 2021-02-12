// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  setUserInfo_Promise(){
    return new Promise(function(resolve,reject){
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo = res.userInfo
          resolve()
        },
        fail:err=>{
          reject()
        }
      })
    })
  },

  setUserID_promise(){
    return new Promise(function(resolve,reject){
      wx.cloud.callFunction({
        name:"login",
        data:{
          userInfo:app.globalData.userInfo
        },
        success:res=>{
          app.globalData.userID = res.result.openid 
          resolve() 
        },
        fail:err=>{
          reject()
        }
      })
    })
  },

  getUserInfoFromCloudByUserID_promise(_user_id){
    return new Promise(function(resolve,reject){
      db.collection("user").where({
        user_id:_user_id
      }).get({
        success:res=>{
          if(res.data.length==0){
            wx.showToast({
              title: '已经为您注册'
            })
            db.collection("user").add({
              data:{
                user_id:app.globalData.userID,
                user_nickname:userInfo.user_nickname,
                user_icon:userInfo.avatarUrl
              }
            }).then(res => {
              console.log(res)
            })
            .catch(console.error)  
          }else{
            wx.showToast({
              title: '已注册用户'
            })
          }
          resolve();          
        },
        fail:err=>{
          console.log("查询失败")
          reject();          
        }
      })  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
     success: function (res) {
     //如果已经授权，跳转到主页
      if(res.authSetting['scope.userInfo']){
        //这段代码测试使用，因为在开发时，默认自己的微信已经授权
        that.setUserInfo_Promise().then(function(){
          //成功执行,后的处理
          that.setUserID_promise().then(function(){
            //成功执行,后的处理
            that.getUserInfoFromCloudByUserID_promise(app.globalData.userID).then(function(){
              //成功执行,后的处理
              console.log(app.globalData.userInfo)
              console.log(app.globalData.userID)
              wx.showModal({
                title:'提示',
                content:'检测到您已经授权过了，不需要重复授权，请问要直接前往主页吗？',
                showCancel:false,
                confirmText:'确定',
                success:function(res){
                 if (res.confirm) {
                   console.log(123)
                   wx.reLaunch({
                    url: '../index/index'
                  })
                 } 
                }
               })
          },function(){
              //失败后的处理
          })
        },function(){
            //失败后的处理
        })
        },function(){
          //失败后的处理
        })      
      }  
  },
  getUserInfo(){

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
})}})