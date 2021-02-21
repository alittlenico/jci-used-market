// pages/goods/goods.js
// bug 存在 imgList换为imgArr渲染不出
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
    imgList:[
      "cloud://miniapp-nico-5gfu2agi3ab5e320.6d69-miniapp-nico-5gfu2agi3ab5e320-1304805989/jci-used-market/goods/00a97f23-f616-4318-97c4-44f974b53c92.jpg",
      "cloud://miniapp-nico-5gfu2agi3ab5e320.6d69-miniapp-nico-5gfu2agi3ab5e320-1304805989/jci-used-market/goods/00e310bd-03e6-4739-ab35-3a3bbf7e3b92.jpg"
    ],
    hits:null,
    isLoadData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    // 点击数加1
    wx.cloud.callFunction({
      name:"j_updateGoodHits",
      data:{
        id:options.id   
      },
      success:res=>{
        console.log(res)
      },
      fail:err=>{
        console.log(err)
      }
    })
    var that = this
    wx.cloud.callFunction({
      name:"j_getGoodDetailsById",
      data:{
        gdId:options.id
      },
      success:res=>{
        console.log(res.result.list[0])
        var info = (res.result.list[0])
        that.setData({
          userIcon:info.userInfo[0].icon,
          nickname:info.userInfo[0].nickname,
          createTime:info.create_time,
          price:info.price,
          contact:info.contact,
          address:info.address,
          title:info.title,
          des:info.des,
          imgList:info.imgArr,
          hits:info.hits
        })
      },
      fail:err=>{
        console.log(err)
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