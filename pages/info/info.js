// pages/info/info.js

var tetris = require("../../module/tetris").tetris;
var ajax = require("../../module/ajax").ajax;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetId : 0,
    BriefInfo : {},
    logintime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetId: options.userid
    })
    this.getList();
  },

  getList: function () {
    var self = this;
    var option1 = {
      url: "/API/User/VUserBriefInfo",
      postdata: {
        Action: "read",
        UserId: this.data.targetId,
        Scope: "Partial",
        ExternalToken: tetris.storageTool.getString("redisUser_ExternalToken")
      },
      success: function (res) {
        console.log(res)
        self.setData({
          BriefInfo : res.data,
          logintime : res.data.LatestLoginDate.replace("T"," ").split(".")[0]
        })
        console.log(self.data.BriefInfo)
      }
    }
    ajax.getData(option1);
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