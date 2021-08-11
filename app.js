// app.js

import './utils/util';
import './utils/request';

App({
  onLaunch () {
    // 应用启动时生命周期
  },
  onShow () {
    // 检测应用自动更新
    wx.checkedUpdate();
  },
  globalData: {
    // 配置结构静态资源基础路径
    baseUrl: 'https://www.snrthn.com/assets/applet',
    // 用户信息暂存
    userInfo: null
  }
})
