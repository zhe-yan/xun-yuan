// pages/searchcondition/searchcondition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marriage: ["未婚", "离异", "丧偶"],
    marriageValue: 1,
    liveplaceValue: ["重庆市","重庆市","万州区"],
  },

  search: function () {
    
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("getSearchConditions", {
      marriage:this.data.marriageValue,
      liveProvince: this.data.liveplaceValue[0],
      liveCity: this.data.liveplaceValue[1],
      liveContry: this.data.liveplaceValue[2],
    });
    wx.navigateBack({
      complete: (res) => {},
    })
  },

  marriageChange: function (e) {
    this.setData({
      marriageValue: parseInt(e.detail.value) + 1
    })
  },

  

  placeChange: function (e) {
    this.setData({
      liveplaceValue:e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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