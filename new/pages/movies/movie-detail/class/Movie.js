var util = require('../../../../utils/util.js')
class Movie {
  constructor(url) {
    this.url = url;
  }
  // 接受豆瓣的数据
  getMovieData(cb) {
    this.cb = cb;
    // bind(this)绑定上下文this
    util.http(this.url, this.processDouBanData.bind(this));
  }
  //处理豆瓣的数据
  processDouBanData(data) {
    var data = data.data
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] !== null) {
      if (data.directors[0].avatars !== null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;

      director.id = data.directors[0].id;

    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.cb(movie)
  }
}
export {Movie}