var util = require('../../utils/util.js')
var app = getApp();
var doubanbase = app.globalData.doubanBase
Page({

  data: {
    containerShow: true,
    serachPanelShow: false,
    clear:""
  },

  onLoad: function(options) {
    var inTheaters = doubanbase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSonUrl = doubanbase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = doubanbase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheaters, "inTheaters", "正在热映");
    this.getMovieListData(comingSonUrl, "comingSon", "即将上映");
    this.getMovieListData(top250Url, "top250", "Top250");


  },
  onMoreTap: function(event) {

    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
  onMovieTap: function (event){
    //这个地方有个坑，event输出的id不是movieId了，而是变成movieid
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },
  getMovieListData: function(url, settedKey, cagetoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      success: function(res) {
        that.processDoubanData(res, settedKey, cagetoryTitle)
        // console.log(res)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  onCancelImgTap: function(event) {
      
      this.setData({
        containerShow: true,
        serachPanelShow: false,
        searchResult:{},
        clear:''
      })

  },
  //电影的搜索查询功能
  onBindBlur: function(event) {
    var text = event.detail.value;
    var searchUrl = doubanbase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult","")
  },
  onBindfocus: function(event) {
    this.setData({
      containerShow: false,
      serachPanelShow: true
    })
  },
  processDoubanData: function(moviesDouban, settedKey, cagetoryTitle) {
    var movies = [];
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
    var readyData = {};
    readyData[settedKey] = {
      cagetoryTitle: cagetoryTitle,
      movies: movies
    };
    this.setData(readyData);

  }


})