// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:'',
    searthData:[],
    hotGoods:[],//推荐数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        
    this.getHotGoods()
  },

  onChange(e) {
    this.setData({
      keyWord: e.detail,
    });
  },

  onClick:function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:"j_getGoodsByKeyWord",
      data:{
        keyWord:this.data.keyWord
      },
      success:res=>{
        wx.hideLoading()
        this.setData({
          searthData:res.result.list
        })
        console.log("res =>",res)
      },
      fail:err=>{
        wx.hideLoading()
        console.log("err =>",err)
      }
    }) 
  },

  getHotGoods(num=8,page=0){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:"j_getHotsGoods",
      data:{
        num:num,
        page:page
      },
      success:res=>{
        console.log("res =>",res)
        wx.hideLoading()
        var oldData = this.data.hotGoods
        var newData = [...oldData,...res.result.list]
        this.setData({
            hotGoods:newData
        })
        console.log(this.data.hotGoods)
      },
      fail:err=>{
        wx.hideLoading()
        console.log("err =>",err)
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