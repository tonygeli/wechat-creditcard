const app = getApp();

Page({
  data: {
    loadingHidden: false,
    id: 0,
    content: "",
    title: "",
    content: ''
  },
  onLoad: function (option) {
    this.data.id = option.id;
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    wx.cloud.callFunction({
      name: "getActivityInfo",
      data: {
        id: that.data.id
      },
      success: function (data) {
        let result = data.result;
        if (!result) {
          wx.showToast({
            icon: 'none',
            title: '数据为空',
          })
        }
        that.setData({
          title: result.title,
          content: result.content
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '请求失败',
        })
        console.error('[云函数] [getActivityInfo] 调用失败：', err)
      }
    })

  }
})