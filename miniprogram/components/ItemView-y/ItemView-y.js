// components/ItemView-y/ItemView-y.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gdImgUrl: { // 商品图片
      type: String,
      value: ''
    },
    gdTitle: { // 商品标题
      type: String,
      value: ''
    },
    userIconUrl: { // 用户头像
      type: String,
      value: ''
    },
    gdPrice: { // 价格
      type: Number,
      value: ''
    },
    userNickname: { // 用户昵称
      type: String,
      value: ''
    },
    navUrl:{ //跳转到商品详情页
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
