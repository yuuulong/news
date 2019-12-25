var util = require('../../../utils/util.js')
var app = getApp();
var doubanbase = app.globalData.doubanBase
Page({

  data: {
    totalCount:0,
    movies:[]
  },

  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category:category
    })
    var dataUrl = ''
    switch (category){
      case "正在热映":
        dataUrl = doubanbase + "/v2/movie/in_theaters";
        
        break;
      case "即将上映":
        dataUrl = doubanbase + "/v2/movie/coming_soon";

        break;  
      case "Top250":
        dataUrl = doubanbase + "/v2/movie/top250";

        break;
    }
    this.setData({
      dataUrl:dataUrl
    })
    util.http(dataUrl, this.processDoubanData)
  },
  // 滑动加载更多图片
  onScrollLower:function(event){
    var nextUrl = this.data.dataUrl +
      "?start=" + this.data.totalCount  + "&count=" + (this.data.totalCount + 20)
    util.http(nextUrl, this.processDoubanData)
    // 滑动加载数据时候，loading小图标在顶部出现
    wx.showNavigationBarLoading()
  },
  //清理数据
  processDoubanData: function (moviesDouban){
    var movies = this.data.movies
    for (var idx in moviesDouban.data.subjects) {
      var subject = moviesDouban.data.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,

      }
      movies.push(temp)
    }
    
    this.setData({
      movies:movies,
      totalCount: this.data.totalCount +=20
    });
    // 加载完数据后顶部loading小圆标消失
    wx.hideNavigationBarLoading()
  },
  onReady:function(){
    wx.startPullDownRefresh
    // 动态设定导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.category,
      success:function(res){

      }
    })
  },

  
})