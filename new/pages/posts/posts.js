var postsData = require('../../data/posts-data.js')
Page({
  data: {

  },
  onPostTap: function(event) {
    
    var postId = event.currentTarget.dataset.postid;
    this.setData({
      postId: postId
    })
    
  

    // 文章跳转
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId
    })
  },
  onLoad: function(options) {
    this.setData({
      postdata: postsData.postList
    })

  },

})