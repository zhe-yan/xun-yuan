var environment = require("./environment").environment;
var storageTool = require("./tetris").tetris.storageTool;

/*****通用ajax功能*****/
//Ajax锁：避免多次请求后台
//Ajax提交前要检查是否加锁，有锁则直接报警。无锁则创建Ajax请求，加锁，提交请求。
//Ajax请求完成后（不论成功还是失败），解锁。
var ajaxlock = false;
var ajaxurl;
var ajaxasync = true;       //是否异步。个别页面需要根据返回的结果 修改控件状态，则设置ajaxasync=false
var ajaxjson;               //发送的数据包
var ajaxreturn;             //回传的结果
var ajaxresult = false;     //是否成功


function getAjaxApiPath(apiUrl) {
  var prefix = apiUrl.split("/")[0];
  var ApiPath;
  switch (prefix) {
    case "MainSite":
      ApiPath = apiUrl.replace(prefix, environment.api.MainSite);
      break;
    case "MallSite":
      ApiPath = apiUrl.replace(prefix, environment.api.MallSite);
      break;
    default: //以 ..开始，根据每个项目不同：手机App默认调用MainSite的Api
      ApiPath = apiUrl.replace(prefix, environment.api.MainSite);;
      break;
  }
  return ApiPath;
}

function clearHtmlTags(obj) {
  if (typeof (obj) == "object") {
      obj = JSON.stringify(obj);
      obj = obj.replace(/<\/?[^>]*>/g, "");
      obj = JSON.parse(obj);
  }
  if (typeof (obj) == "string") {
      obj = obj.replace(/<\/?[^>]*>/g, "");
  }
  return obj
}

var ajaxglobal = {
  type: "POST",
  async: true,
  timeout: environment.ajax.timeout,          //ajax请求超时设置
  //增加超时处理
  complete: function (XMLHttpRequest, status) {   //请求完成后最终执行参数
      if (status == 'timeout') {                  //超时,status还有success,error等值的情况
          //ajaxTimeoutTest.abort();              //var ajaxTimeoutTest = $.ajax({
          dialog.showMessage("warning", "超时", "请求超时，系统繁忙，请稍后重试!");
      }
  },
  //增加错误处理
  error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.statusText);
      switch (jqXHR.status) {
          case (0):
              message.show("warning", "错误-网络无法连接!<br />" + jqXHR.statusText, "center", "exclamation-sign");
              break;
          case (500):
              message.show("warning", "错误-500：服务器系统内部错误，请稍后重试...", "center", "exclamation-sign");
              break;
          case (401):
              message.show("warning", "错误-401：未登录!", "center", "exclamation-sign");
              break;
          case (403):
              message.show("warning", "错误-403：无权限执行此操作!", "center", "exclamation-sign");
              break;
          case (408):
              message.show("warning", "错误-408：请求超时!", "center", "exclamation-sign");
              break;
          default:
              message.show("warning", "错误-?：系统繁忙或未知错误，请稍后重试...", "center", "exclamation-sign");
      }
  } 
}


var ajax = {
  getData: function (option) {
    option.postdata["ExternalToken"] = storageTool.getString("redisUser_ExternalToken");
    if (option.postdata["UserId"] == undefined && storageTool.getString("vubi") != undefined) {
      option.postdata["UserId"] = V_VUBI.UserId;
    }
    wx.request({
      method: ajaxglobal.type,
      timeout: ajaxglobal.timeout,
      url: getAjaxApiPath(option.url),
      data: clearHtmlTags(option.postdata), //要发送的数据
      success: option.success,
      complete: ajaxglobal.complete,
      error: ajaxglobal.error
    });
  }
}

module.exports.ajax = ajax;