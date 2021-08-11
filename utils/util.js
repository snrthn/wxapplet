
// 检查版本更新
wx.checkedUpdate = () => {
  if (wx.canIUse('getUpdateManager')) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
          if (res.hasUpdate) {
              // 程序检测到当前有新版本了

              updateManager.onUpdateReady(() => {
                  wx.showModal({
                      title: '更新提示',
                      content: '新版本已经准备好，是否重启应用？',
                      success: function (res) {
                          if (res.confirm) {
                              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                              updateManager.applyUpdate();
                          }
                      }
                  })
              });

              updateManager.onUpdateFailed(() => {
                  // 新的版本下载失败
                  wx.showModal({
                      title: '更新提示',
                      content: '已有新版本，请您删除当前小程序，重新搜索打开！'
                  })
              });

          }
      })
  } else {
      let isTips = wx.getStorageSync('noVerTips');
      if (!isTips) {
          // 微信低版本提示只会弹出一次
          wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法检测最新版本，请升级后再试!',
              complete () {
                  wx.setStorage({
                      key: 'noVerTips',
                      data: true
                  })
              }
          });
      }
  }
}