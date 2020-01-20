// pages/loading/loading.js
var tetris = require("../../module/tetris").tetris;
var ajax = require("../../module/ajax").ajax;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    ExternalToken: "",
    vubi: {},
    UserId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.setData({
      ExternalToken: tetris.storageTool.getString("redisUser_ExternalToken"),
      vubi: tetris.storageTool.getString("vubi"),
      UserId: tetris.storageTool.getString("vubi")?tetris.storageTool.getString("vubi").UserId : 0,
    })
    if (this.data.ExternalToken == "" || this.data.vubi == null) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      ajax.getData({
        url:"../MAPI/Account/Authorization",
        postdata: {
          Action: 'syncUserInfo',
        },
        success: function (result) {
          console.log(result)
          if (result.data.type == "success") {
            self.setData({
              vubi: result.data.returnobject,
              UserId: result.data.returnobject ? result.data.returnobject.UserId : 0,
            })
            tetris.storageTool.setString("vubi", self.data.vubi);
            //重置心跳时间
            //heartBeat.reset();
            //跳转
            if (self.data.vubi.LivePlaceCity == '' || self.data.vubi.LivePlaceCity == null ||
            self.data.vubi.LivePlaceCountry == '' || self.data.vubi.LivePlaceCountry == null ||
            self.data.vubi.LivePlaceProvince == '' || self.data.vubi.LivePlaceProvince == null) {
              //完整信息
            } else {
              wx.switchTab({
                url: '../index/index',
              })
            }
          } else {
            self.setData({
              vubi: null,
              UserId: 0
            });
            wx.redirectTo({
              url: '../login/login',
            })
          }
        }
    })
    }

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
    return
  }
})