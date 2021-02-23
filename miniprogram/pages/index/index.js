
const app = getApp()
Page({

  // 页面的初始数据
  data: {
    //类别框
    activeIdx:0,//当前选中tab的下标
    comGoods:[],//其他类别数据
    hotGoods:[],//推荐数据
    topType:[{
      tyName:"推荐",iconUrl:"/images/type0.png",iconUrl_s:"/images/type0_s.png"},
      {tyName:"学习",iconUrl:"/images/type1.png",iconUrl_s:"/images/type1_s.png"},
      {tyName:"运动",iconUrl:"/images/type2.png",iconUrl_s:"/images/type2_s.png"},
      {tyName:"生活",iconUrl:"/images/type3.png",iconUrl_s:"/images/type3_s.png"},
      {tyName:"智能",iconUrl:"/images/type4.png",iconUrl_s:"/images/type4_s.png"}],
    bannerData:[
      {
        imgUrl:'cloud://miniapp-nico-5gfu2agi3ab5e320.6d69-miniapp-nico-5gfu2agi3ab5e320-1304805989/jci-used-market/banner/1.jpg'
      },
      {
        imgUrl:'cloud://miniapp-nico-5gfu2agi3ab5e320.6d69-miniapp-nico-5gfu2agi3ab5e320-1304805989/jci-used-market/banner/2.jpg'
      },
      {
        imgUrl:'cloud://miniapp-nico-5gfu2agi3ab5e320.6d69-miniapp-nico-5gfu2agi3ab5e320-1304805989/jci-used-market/banner/3.jpg'
      }
    ],
    //轮播图配置
    swiperOptions: {
      //显示面板指示点
      indicatorDots: true,

      //未选中指示点颜色
      indicatorColor: '#fff',

      //选中指示点颜色
      indicatorActiveColor: '#165dad',

      //开启自动轮播
      autoplay: true,

      //每隔一定时间切换一张图片, 单位为：ms
      interval: 3000,

      //衔接滑动
      circular: true

    }
  },
  onLoad: function (options) {
    // 如果没有授权的，则跳到授权认证页面
    
    console.log("userID:"+app.globalData.userID)
    this.getHotGoods()
    if (!app.globalData.isAuth) {
      wx.navigateTo({
        url: '../auth/auth'
      })
      return;
    }
    console.log("user =>",app.globalData.user)
  },
  onSearch(e){
    console.log("value =>",e.detail)
  },
  onFocus(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goDetail(e){
    console.log("goDetail e==>",e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../goods/goods?id='+e.currentTarget.dataset.id,
    })
  },
  backTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onReachBottom:function(e){
    console.log("触底")
    if(this.data.activeIdx==0){//推荐被选中 加载hotGoods
      this.getHotGoods(8,this.data.hotGoods.length)
    }else{//其他tab被选中 加载comGoods
      this.getGoodsByType(this.data.topType[this.data.activeIdx].tyName,this.data.comGoods.length,8)
    }
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
  getGoodsByType(type,page=0,num=8){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:"j_getGoodsByType",
      data:{
        type:type,
        page:page,
        num:num
      },
      success:res=>{
        wx.hideLoading()
        console.log("res =>",res)
        var oldData = this.data.comGoods
        var newData = [...oldData,...res.result.data]
        this.setData({
            comGoods:newData
        })
      },
      fail:err=>{
        wx.hideLoading()
        console.log("err =>",err)
      }
    })    
  },
  switchTab:function(e){
    let activeIdx = e.currentTarget.dataset.idx
    // 如果当前选中，则不做任何操作
    if(activeIdx==this.data.activeIdx){
      return
    }
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
    if(gd_type.length==0){
      this.getHotGoods()
    }else{
      this.getGoodsByType(gd_type,0,8)
    }
    
  }
})