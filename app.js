// app.js

import './utils/util';
import './utils/request';
import { initState } from './store/index';

// 初始化全局状态
initState();

App({
  onLaunch () {
    // 应用启动时生命周期
  },
  onShow () {
    // 检测应用自动更新
    wx.checkedUpdate();
  },
  onHide () {
    // 页面隐藏
    console.log('App Hide');
  },
  onError () {
    // 错误监听函数
    console.log('onError');
  },
  onPageNotFound () {
    // 页面不存在监听函数
    console.log('onPageNotFound');
  },
  onUnhandledRejection () {
    // 未处理的 Promise 拒绝事件监听函数
    console.log('onUnhandledRejection');
  },
  onThemeChange () {
    // 监听系统主题变化
    console.log('onThemeChange');
  },
  globalData: {
    // 配置结构静态资源基础路径
    baseUrl: 'https://www.snrthn.com/files/',
    // 用户信息暂存
    userInfo: null,
    // 用户登录状态
  }
})
