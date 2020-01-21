// pages/search/search.js
var tetris = require("../../module/tetris").tetris;
var ajax = require("../../module/ajax").ajax;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    UCI: {
      MaritalStatus: "1",
      ResidenceProvince1: "",
      ResidenceCity1: "",
      ResidenceCounty1: "",
      IsDefiniteAge: true,
      DefiniteAge1: 30 - 15,
      DefiniteAge2: 50 + 15,
      RelativeAge1: 0,
      RelativeAge2: 0,
      Height1: 150 - 20,
      Height2: 170 + 20,
      HonestyGrade: 12,
      EducationDegree: "01",
      AnnualIncome: "01",
      HouseStatus: "01",
      Has_Photo: true,
      Nation: "01",
      Religion: "01"
    },
    V_VUBI: {},
    searchPageIndex: 1,
    searchResult: [],
  },

  condition: function () {
    var self = this;
    wx.navigateTo({
      url: '../searchcondition/searchcondition',
      events: {
        getSearchConditions: function (conditions) {
          self.setData({
            UCI: {
              MaritalStatus: "1",
              ResidenceProvince1: "",
              ResidenceCity1: "",
              ResidenceCounty1: "",
              IsDefiniteAge: true,
              DefiniteAge1: 15,
              DefiniteAge2: 70,
              RelativeAge1: 0,
              RelativeAge2: 0,
              Height1: 130,
              Height2: 190,
              HonestyGrade: 11,
              EducationDegree: "01",
              AnnualIncome: "01",
              HouseStatus: "01",
              Has_Photo: true,
              Nation: "01",
              Religion: "01"
            }
          })
          self.getNewChoiceList(true);
        }
      }
    })
    
  },

  getNewChoiceList(isFirst) {
    var self = this;
    if (isFirst) {
      this.searchPageIndex = 1;
    }
    var option = {
      url: "/API/Service/VMatchService",
      postdata: {
        Action: "choicematchByUCI",
        GroupBy: "default",
        UserId: this.data.V_VUBI.UserId,
        Gender: this.data.V_VUBI.Gender,
        Object: JSON.stringify(this.data.UCI),
        PageIndex: this.data.searchPageIndex,
        isFirst: isFirst,
        Age: this.data.V_VUBI.CalcAge
      },
      success: function (res) {
        self.setData({
          searchResult: JSON.parse(res.data.list)
        })
      }
    }
    ajax.getData(option);
  },

  getUserChoiceList(isFirst) {
    var self = this;
    if (isFirst) {
      this.data.searchPageIndex = 1;
    }
    var option = {
      url: "../API/Service/VMatchService",
      postdata: {
        Action: "choicematch",
        GroupBy: "default",
        PageIndex: this.data.searchPageIndex,
        isFirst: isFirst,
        UserId: this.data.V_VUBI.UserId
      },
      success: function (res) { 
        self.setData({
          searchResult: JSON.parse(res.data.list)
        })
      }
    }
    ajax.getData(option);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      V_VUBI: tetris.storageTool.getString("vubi")
    });
    this.getUserChoiceList(true);
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