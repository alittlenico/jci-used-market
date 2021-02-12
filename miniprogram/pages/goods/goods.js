// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIcon:"",
    nickname:"",
    createTime:"",
    price:null,
    contact:"",
    address:"",
    title:"",
    des:"",
    imgArr:[],
    hits:null,
    isLoadData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.gdId)
    wx.cloud.callFunction({
      name:"getGoodDetailsById",
      data:{
        gdId:options.gdId
      }
    }).then(res=>{
      console.log(res.result.list[0])
      var goodInfo = res.result.list[0]
      this.setData({
        userIcon:goodInfo.userInfo[0].user_icon,
        nickname:goodInfo.userInfo[0].user_nickname,
        createTime:goodInfo.create_time,
        price:goodInfo.gd_price,
        contact:goodInfo.gd_contact,
        address:goodInfo.gd_address,
        title:goodInfo.gd_title,
        des:goodInfo.gd_des,
        imgArr:goodInfo.gd_imgArr,
        hits:goodInfo.hits
      })
      
      setTimeout(()=>{
        this.setData({
          isLoadData:false
        })
      },1000)
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