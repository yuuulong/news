// pages/welcome.js
Page({

  onTap: function() {
    // 执行unhide周期函数，所以有返回。
    // wx.navigateTo({
    //   url: './posts/posts'
    // })
    // 执行unload周期函数，所以不能返回。
    wx.redirectTo({
      url: './posts/posts',
    })
  },
  data: {

  },

})