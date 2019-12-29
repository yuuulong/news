// var util = require('../../../utils/util.js');
import {
  Movie
} from "class/Movie.js"
var app = getApp()
Page({
  data: {
    movie: {}
  },
  onLoad: function(options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    // util.http(url, this.processDouBanData)
    var movie = new Movie(url);
    // 利用回调的方法拿到结果,因为数据http方法异步请求
    var that = this
    movie.getMovieData(function(movie) {
      that.setData({
        movie: movie
      })
    })
  },
  // 点击查看图片
  viewMoviePostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src], //需要预览的图潘http链接列表
      current: src //当前显示图潘的http链接
    })
  }
})