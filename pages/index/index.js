//index.js
//获取应用实例
var tetris = require("../../module/tetris").tetris;
var ajax = require("../../module/ajax").ajax;


const app = getApp()

Page({

  data: {
    motto: '寻缘 微信首页',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Recommendations: [],

    carouselList: ['../../res/app-date.png', '../../res/app-marry.png', '../../res/app-meet.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  //事件处理函数
  getRecommendation: function(isFirst) {
    var self = this;
    var option = {
      url: "../API/Service/VMatchService",
      postdata: {
          Action: "recommendation"
      },
      success: function (result) {
        self.setData({
          Recommendations : JSON.parse(result.data.list)
        })
      }
    }
    ajax.getData(option);
  },
  onLoad: function () {
    this.getRecommendation(true)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
