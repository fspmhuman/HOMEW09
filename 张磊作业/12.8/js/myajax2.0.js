(function(){
  // 把myajax公布到window上
  var myajax = window.myajax = {};
  // 作者、版本号信息
  myajax.author = "minzer";
  myajax.version = "0.0.1";

  myajax.get = function(URLStr,queryJSON,callback){
    // xhr对象兼容
    var xhr;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
    }else{
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304){
          // 不管是否能正常拿到返回的数据，callback的第一个参数始终表示错误，第二个参数表示拿到的数据
          callback(null,xhr.responseText);
        }else{
          callback(new Error("获取数据异常"),undefined);
        }
      }
    };
    var queryString = myajax.queryJSON2queryString(queryJSON);
    xhr.open('get',URLStr + "?" + queryString,true);
    xhr.send(null);
  };


  myajax.post = function (URLStr, queryJSON, callback) {
    // xhr对象兼容
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304) {
          // 不管是否能正常拿到返回的数据，callback的第一个参数始终表示错误，第二个参数表示拿到的数据
          callback(null, xhr.responseText);
        } else {
          callback(new Error("获取数据异常"), undefined);
        }
      }
    };
    var queryString = myajax.queryJSON2queryString(queryJSON);
    xhr.open('post', URLStr, true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(queryString);
  };

myajax.jsonp =function(URLStr,callbackname,callback){
	window[callbackname] = callback;
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = URLStr;
	document.appendChild(oScript);
	document.removeChild(oScript);
};

  // 把json格式数据转化成字符串
  // 例如：{"name":"haha","age":12,"gender":"女"}转化完后
  // name=haha&age=12&gender=%E3%
  myajax.queryJSON2queryString = function(json){
    var arr = [];
    for(var k in json){
      arr.push(k + '=' + encodeURIComponent(json[k]));
    }
    return arr.join("&");
  };
})();