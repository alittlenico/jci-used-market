// pages/release/release.js
var base = require("../../utils/base.js")
var util = require('../../utils/util1.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //type: 0,// 发布类型
    categoryList:["学习","运动","生活","智能"],// 商品类别列表
    imgList: [],// 图片上传列表
    gdHolder: '必填 请选择商品类别',
    user_id:null,
    release_sucess:false,// 发布成功
    btn_disabled:false,//发布按钮是否禁用
    fileIDs:[]//云存储数据路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: app.globalData.userID
    })
    console.log("user_id:"+this.data.user_id)
    // 获取发布商品信息
    

  },
  
  // 获取闲置商品类别
  getCategoryList() {
    //闲置商品类别应从云端获取

    // let that = this
    // base.getRq('/category').then(function (res) {
    //   // console.log('获取类别', res)
    //   that.setData({
    //     categoryList: res.data.data
    //   })
    // })
  },
  // 选择商品类别
  PickerChange(e) {
    this.setData({
      gdHolder: this.data.categoryList[e.detail.value]
    })
  },
// 选择上传图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册和拍照选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    })
  },
// 查看大图
  ViewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
// 删除选择的图片
  DelImg(e) {
    wx.showModal({
      content: '确定要删除图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 提交闲置表单
  goodFormSubmit(e) {
    let form = e.detail.value
    if (form.gd_title ==""){
      wx.showToast({
        title: '请填写商品标题',
        icon:'none'
      })
    } else if (form.gd_type == null){
      wx.showToast({
        title: '请选择商品类别',
        icon:'none'
      })

    } else if (form.gd_price == ''){
      wx.showToast({
        title: '请填写商品出手价',
        icon: 'none'
      })
    } else if (form.gd_contact == '') {
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none'
      })
    }else{// 校验通过
      let that = this
      form["gd_type"] = this.data.categoryList[form.gd_type];
      form["user_id"] = this.data.user_id
      form['create_time'] = util.dateToString(new Date())
      that.setData({
        btn_disabled: true
      })
      // 判断是否上传图片
      if (that.data.imgList.length > 0) {
        //上传图片
        let promiseArr = [];
        var pre = Date.parse(new Date())
        pre = pre/1000
        for(let i = 0; i < that.data.imgList.length; i++) {
          promiseArr.push(new Promise((reslove, reject) => {
            let item = that.data.imgList[i];
            wx.cloud.uploadFile({
              cloudPath: this.data.user_id+"-"+pre+"-"+i+".png", // 上传至云端的路径
              filePath: item, // 小程序临时文件路径
              success: res => {
                this.setData({
                  fileIDs: this.data.fileIDs.concat(res.fileID)
                });
                console.log(res.fileID)//输出上传后图片的返回地址
                reslove();
              },
              fail: res=>{
                console.log("图片上传失败")
              }
            })
          }));
        }
        Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
          console.log("图片上传完成后再执行")
          console.log(this.data.fileIDs)
          form["gd_imgArr"]=this.data.fileIDs
          wx.showLoading({
            title: '发布中...',
          }) 
          that.addGood(form).then(function(){
            //成功执行,后的处理
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '发布成功',
                })
              },
            })
            if (getCurrentPages().length != 0) {
              //刷新当前页面的数据
              console.log("刷新页面")
              // getCurrentPages()[getCurrentPages().length - 1].onReady()
              wx.reLaunch({
                url: '../release/release',
              })
            }
          },function(){
            //失败后的处理
          })
        })
      }
      
    }
    
  },
  // 把表单数据写入云数据库中
  addGood(form){
    return new Promise(function(resolve,reject){
      wx.cloud.callFunction({
        name:"addGood",
        data:{
          form:form
        },
        success:res=>{
          console.log("发布中。。。。")
          resolve()
        },
        fail:err=>{
          reject()
        }
      })
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
   
  },
})