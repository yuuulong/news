var postsData = require('../../data/posts-data.js')
Page({
  data:{

  },
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: './post-detail/post-detail'
    })
    // console.log(postId)
  }
  ,
  onLoad: function (options) {
    this.setData({
      post_key:postsData.postList
    })
  
  },

})