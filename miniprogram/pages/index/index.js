
const app = getApp()
Page({

  
  switchTop:function(e){
    let activeIdx = e.currentTarget.dataset.idx
    this.setData({
      activeIdx
    })
    //根据idx去查找数据
    var gd_type = ""
    switch(activeIdx){
      case 1 :
        gd_type="学习"
        break
      case 2 :
        gd_type="运动"
        break
      case 3 :
      gd_type="生活"
      break
      case 4 :
      gd_type="智能"
      break
      default:
        console.log("为0加载全局数据")
    }
    
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true   //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
  },
  searchGoods:function(){
    console.log("search触发")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  getGoodsData(){

  },
  // 页面的初始数据
  data: {
    inputShowed: false,  //初始文本框不显示内容
    //类别框
    activeIdx:0,
    goodList:[],
    hotGoods:app.globalData.hotsGoods,
    topType:[{
      tyName:"推荐",iconUrl:"/images/type0.png",iconUrl_s:"/images/type0_s.png"},
      {tyName:"学习",iconUrl:"/images/type1.png",iconUrl_s:"/images/type1_s.png"},
      {tyName:"运动",iconUrl:"/images/type2.png",iconUrl_s:"/images/type2_s.png"},
      {tyName:"生活",iconUrl:"/images/type3.png",iconUrl_s:"/images/type3_s.png"},
      {tyName:"智能",iconUrl:"/images/type4.png",iconUrl_s:"/images/type4_s.png"}]
  },

  getHotsGoods(){
    wx.cloud.callFunction({
      name:"getHotsGoods"
    }).then(res=>{
      console.log(321)
      console.log(res)
    }).catch(err=>{

    })
  },
  onLoad: function (options) {
    console.log("userID:"+app.globalData.userID)
    wx.cloud.callFunction({
      name:"getHotsGoods"
    }).then(res=>{
      console.log(res.result)
      app.globalData.hotsGoods=res.result.list
      this.setData({
        hotGoods:app.globalData.hotsGoods
      })
    }).catch(err=>{

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
    console.log("上拉触底")   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})