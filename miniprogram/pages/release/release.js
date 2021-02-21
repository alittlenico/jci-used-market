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
    imgList: [],// 图片上传列表 临时路径
    gdHolder: '必填 请选择商品类别',
    release_sucess:false,// 是否发布成功
    btn_disabled:false,//发布按钮是否禁用
    fileIDs:[],//云存储数据路径
    good:{
        address:"",
        contact:"",
        des:"",
        price:"",
        title:"",
        type:"",
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (!app.globalData.isAuth) {
    //   wx.navigateTo({
    //     url: '../auth/auth'
    //   })
    //   return;
    // }
  },
  // 选择商品类别
  PickerChange(e) {//点击确认才会调用
    console.log("e =>",e)
    this.setData({
      gdHolder: this.data.categoryList[e.detail.value]
    })
    this.data.good.type = this.data.gdHolder
    this.setData({
      good:this.data.good
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
          this.data.good.imgList = this.data.imgList
          this.setData({
            good:this.data.good
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
          this.data.good.imgList = this.data.imgList
          this.setData({
            good:this.data.good
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
          this.data.good.imgList = this.data.imgList
          this.setData({
            good:this.data.good
          })
        }
      }
    })
  },

  // textarea 绑定的是bindblur 输入数据后 失去焦点才触发 
  modifyTitle(e){
    console.log(e.detail.value)
    this.data.good.title = e.detail.value
    this.setData({
      good:this.data.good
    })
  },
  modifyDes(e){
    this.data.good.des = e.detail.value
    this.setData({
      good:this.data.good
    })
  },
  modifyPhone(e){
    console.log('e ==> ', e);
    var phoneReg = /^1[3456789]\d{9}$/
    //如果验证失败，设空
    if (!phoneReg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      this.data.good.contact = ""
      this.setData({
        good:this.data.good
      })
    }else{//设置数据
      this.data.good.contact = e.detail.value
      this.setData({
        good:this.data.good
      }) 
    }
  },
  modifyPrice(e){
    // 微信小程序不想vue可以双向绑定,前端更改了数据，js中不会更改
    console.log(e.detail.value)
    // console.log(this.data.good.price)
    var price = parseFloat(e.detail.value)  
    // 仅排除两种情况，无法转化为数值 和 价格小于0
    if(isNaN(price)){
      wx.showToast({
        title: '当前数值不符合规范',
        icon:"none",
        duration:1000
      })
    }else{
      if(price<0){
        wx.showToast({
          title: '价格不能小于0',
          icon:"none",
          duration:1000
        })
      }
      // 校验通过
      this.data.good.price = price+""
      this.setData({
        good:this.data.good
      })
    }
    
  },
  modifyAddress(e){
    this.data.good.address = e.detail.value
    this.setData({
      good:this.data.good
    })
  },
  pubGood(e){
    console.log("e =>",e)
    //构造数据验证表单
    var data = {
      title:{
        value:"",
        msg:"标题不能为空"
      },
      des:{
        value:"",
        msg:"描述不能为空"
      },
      type:{
        value:"",
        msg:"请选择商品类别"
      },
      price:{
        value:"",
        msg:"价格不能为空"
      },
      address:{
        value:"",
        msg:"地址不能为空"
      },
      contact:{
        value:"",
        msg:"联系方式不能为空"
      }
    }
    for(var key in data){
      if(this.data.good[key] == data[key].value){
        wx.showToast({
          title: data[key].msg,
          icon:"none",
          duration:1000
        })
        return
      }
    }
    // 判断图片 至少选中一张图片
    if(this.data.imgList.length < 0){
      wx.showToast({
        title: '请至少选中一张图片',
        duration:2000
      })
      return
    }
    // 验证成功 
    // 先上传图片到云端
     //上传图片
    let that = this
    let promiseArr = [];
    var pre = Date.parse(new Date())
    pre = pre/1000
    console.log(pre)
    for(let i = 0; i < that.data.imgList.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = that.data.imgList[i];
        wx.cloud.uploadFile({
          cloudPath: "jci-used-market/goods/"+pre+"-"+i+".png", // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID)
            });
            console.log(res.fileID)//输出上传后图片的返回地址
            reslove();
          },
          fail: err=>{
            console.log("err =>",err)
            console.log("图片上传失败")
          }
        })
      }));
    }
    Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
      console.log("图片上传完成后再执行")
      console.log(this.data.fileIDs)
      // 构造商品数据
      var good = {
        title:this.data.good.title,
        des:this.data.good.des,
        type:this.data.good.type,
        imgArr:this.data.fileIDs,
        price:this.data.good.price,
        address:this.data.good.address,
        contact:this.data.good.contact,
        create_time:util.dateToString(new Date()),
        hits:1
      }
      wx.showLoading({
        title: '发布中...',
      }) 
      //上传商品数据到数据库
      wx.cloud.callFunction({
        name:"j_addGood",
        data:good,
        success:res=>{
          wx.hideLoading()
          // 发布成功后 休眠1秒
          this.setData({
            release_sucess:true
          })
          // 更改发布状态 设空数据
          this.data.good = {
              address:"",
              contact:"",
              des:"",
              price:"",
              title:"",
              type:""
          }
          setTimeout(res=>{
            this.setData({
              good:this.data.good,
              imgList:[],
              release_sucess:false,
              btn_disabled:false,
              gdHolder:"必填 请选择商品类别"
            })
          },2000)
          console.log("res =>",res) 
        },
        fail:err=>{
          console.log("err =>",err)
        }
      })
    })
  }
})