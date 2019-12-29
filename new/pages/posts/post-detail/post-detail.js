// 引入模拟数据文件
var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var globalData = app.globalData;
    var postId = options.id;
    this.setData({
      postId: postId
    })
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync(this.data.postId)
    if (postsCollected) {
      var collected = true
      this.setData({
        collected: collected
      })
    } else {
      collected = false
      this.setData({
        collected: collected
      })
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId = this.data.postId
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function(event) {
    var collected = !this.data.collected;
    this.setData({
      collected: collected
    })
    if (this.data.collected) {
      var a = wx.setStorageSync(this.data.postId, true)
    } else {
      wx.setStorageSync(this.data.postId, false)

    }
    wx.showToast({
      title: this.data.collected ? "已收藏" : "取消收藏",
    })


  },
  onShareTap: function() {
    var itemList;
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'],
      success(res) {
        wx.showModal({
          title: '用户' + res.tapIndex + ",您好",
          content: "现在无法实现分享功能."

        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function(event) {
    var postId = this.data.postId
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{

    wx.playBackgroundAudio({
      dataUrl: postsData.postList[postId].music.url,
      title: postsData.postList[postId].music.title,
      coverImgUrl: postsData.postList[postId].music.coverImg
    })
      this.setData({
        isPlayingMusic: true
      })
    }
  }


})