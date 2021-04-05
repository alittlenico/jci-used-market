// miniprogram/pages/commit/commit.js

/**
 * 存在bug:点击选择收货地址，弹出地址列表，点击新增地址，保存后跳转到地址管理页面，这时再退到提交页面，地址数据没有更新
 * 
 * 解决方法：，在commit页面的onShow方法中再次请求地址数据
 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //是否显示地址列表
    isShow: false,

    //地址数据
    addressData: [],

    //地址下标
    addressIndex: -1,

    address: '选择收货地址',



    //商品总数量
    count: 0,

    //总金额
    total: 0,

    //购物车id
    ids: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id)
    // options.id = 'ad81686b602886810095245b4559f5a9'
    this.getCommitData(options.id)

    //获取收货地址
    // this.getAddress();

  },

  //根据商品id获取 提交订单数据
  getCommitData: function (id) {
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({ //根据商品id去获取 商品和卖家信息
      name: 'j_getGoodDetailsById',
      data: {
        gdId: id
      },
      success: res => {
        //关闭加载提示
        wx.hideLoading();
        console.log('123res ==> ', res.result.list[0]);
        this.setData({
          commitData: res.result.list[0]
        })
        console.log(this.data.commitData)

      },
      fail: err => {
        //关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },


  //提交订单
  commit: function () {

    //如果没有选择地址，则不能提交订单
    if (this.data.addressIndex === -1) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //1-获取收货地址
    var address = this.data.addressData[this.data.addressIndex];


    var userAddress = {
      address: address.address + address.detail,
      phone: address.phone,
      user: address.user
    };

    console.log('userAddress ==> ', userAddress);
    //生成订单编号, 利用时间戳实现编号
    //一个订单编号对应多个商品
    var date = new Date();
    var orderNo = 'NO' + date.getTime();
    console.log('orderNo ==> ', orderNo);

    //订单时间, 不足十，补零
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    var d = date.getDate();
    d = d >= 10 ? d : '0' + d;
    var hour = date.getHours();
    hour = hour >= 10 ? hour : '0' + hour;
    var minute = date.getMinutes();
    minute = minute >= 10 ? minute : '0' + minute;
    var second = date.getSeconds();
    second = second >= 10 ? second : '0' + second;

    var orderDate = year + '-' + month + '-' + d + ' ' + hour + ':' + minute + ':' + second;

    //保存订单数据
    var orderData = {

      //订单编号
      id: orderNo,

      //地址数据
      userAddress: userAddress,

      //订单时间
      orderDate: orderDate,
      //卖家  userInfo唯一标识一个用户
      seller:this.data.commitData.userInfo[0].userInfo,
      //买家
      buyer:app.globalData.user.userInfo,
      //商品id
      productId:this.data.commitData._id
    };

    //将订单数据写入到订单集合
    this.saveOrder(orderData);
  },

  //将订单数据写入到订单集合
  saveOrder: function (order) {
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'j_addOrder',
      data: order,
      success: res => {
        wx.hideLoading();
        // console.log('写入订单数据 res ==> ', res);
        wx.navigateTo({
          url: '../order/order',
        })
      },
      fail: err => {
        //关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },

  onShow() {
    //获取收货地址
    this.getAddress();
  },
  //新增地址
  newAddress: function () {
    wx.navigateTo({
      url: '../new/new'
    })
  },

  //切换地址列表
  toggleAddressList: function () {
    this.setData({
      isShow: !this.data.isShow
    })
  },

  //获取地址数据
  getAddress: function () {
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'coffee_get_address',
      success: res => {
        //关闭加载提示
        wx.hideLoading();
        console.log('地址数据 res ==> ', res);

        this.setData({
          addressData: res.result.data
        })
      },
      fail: err => {
        //关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },

  //选择收货地址
  selectAddress: function (e) {

    var index = e.currentTarget.dataset.index;

    var address = this.data.addressData[index];

    this.setData({
      address: address.address + address.detail,
      addressIndex: index
    })
  },

  

  //根据购物车id删除购物车商品
  removeShopcartById: function (ids) {
    //ids: 购物车id集合，类型：array
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'coffee_remove_shopcart_byid',
      data: {
        ids: ids
      },
      success: res => {
        //关闭加载提示
        wx.hideLoading();
        console.log('删除购物车商品 res ==> ', res);

        wx.switchTab({
          url: '../order/order'
        })

      },
      fail: err => {
        //关闭加载提示
        wx.hideLoading();
        console.log('删除购物车商品 出错了 err ==> ', err);
      }
    })
  },



})