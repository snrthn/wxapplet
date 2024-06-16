// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    baseUrl: getApp().globalData.baseUrl,
    myCardList: []
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
    const { isLogin } = wx.getState();

    this.setData({ isLogin });
    if (isLogin && !this.data.myCardList.length) this.fetchData();
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

  /**
   * 请求我的学习卡片数据
   */
  fetchData () {
    let that = this;
    wx.get({
      url: 'classinfo/myclass',
      success (res) {
        that.setData({
          myCardList: res.data.CourseList
        })
      }
    })
  }
})