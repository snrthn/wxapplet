// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: getApp().globalData.baseUrl,
    isLogin: false,
    avatarUrl: '',
    nickName: '',
    gender: '',
    address: '',
    showDialog: false
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

  },

  /**
   * 获取用户信息
   */
  getUserInfo () {
    let that = this;
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于信息展示',
      success (res) {
        console.log(res);
        let info = res.userInfo;
        that.setData({
          isLogin: true,
          avatarUrl: info.avatarUrl,
          nickName: info.nickName,
          gender: info.gender,
          address: info.country + info.province + info.city,
        })
      },
      fail (err) {
        console.log(err);
      }
    })
  },

  /**
   * 显示弹窗
   */
  showDialogHandle () {
    this.setData({
      showDialog: true
    })
  },

  /**
   * 弹窗回调事件
   */
  tapDialogButton (obj) {
    let label = obj.detail.item.text;
    if (label === '取消') {
      console.log('你点击了' + label);
      this.hideDialogHandle();
    } else if (label === '确认') {
      console.log('你点击了' + label);
      this.hideDialogHandle();
    }
  },

  /**
   * 隐藏弹窗
   */
  hideDialogHandle () {
    this.setData({
      showDialog: false
    })
  },
})