const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var num1 = stars.toString().substring(1, 2);
  var array = [];
  if(num1=5){
    array.push(2);
  }
  for (var i = 1; i <= 5; i++) {
      if(i<=num){
        array.unshift(1)
      }else{
        array.push(0)
        
      }
  }
  array.length=5;
  return array;

}
function http(url, callBack) {
  wx.request({
    url: url,
    method: "GET",
    success: function (res) {
      callBack(res)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
function convertToCastString(casts){

  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name+ " /";

  }
  return castsjoin.substring(0,castsjoin.length - 2);
}

function convertToCastInfos(casts){
  
  var castsArray = [];
  for(var inx in casts){
    var cast = {
      img: casts[inx].avatars ? casts[inx].avatars.large : "",
      name: casts[inx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos

}