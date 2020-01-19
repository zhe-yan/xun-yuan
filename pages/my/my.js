// pages/my/my.js
var environment = require("../../module/environment").environment;
var tetris = require("../../module/tetris").tetris;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "useravatar":"https://lover-match.oss-cn-hangzhou.aliyuncs.com/DEV%2FFemale%2FAvatar%2F5_UserBasicInfo6_HeadPhoto.jpg",
    "function":["注册资料", "基本资料", "诚信资料", "隐私资料", "择偶条件", "个性问答", "偏好", "文章", "视频", "相册", ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vubi: tetris.storageTool.getString("vubi")
    })
    console.log(this.data.vubi)
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