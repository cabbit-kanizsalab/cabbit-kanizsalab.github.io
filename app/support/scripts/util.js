/**
 * Created by JesangYoon on 2015. 12. 3..
 */

function getURLParameter(name) {
  var ret = null;
  var nowAddress = unescape(window.location.href);
  var parameters = (nowAddress.slice(nowAddress.indexOf("?") + 1, nowAddress.length)).split("&");
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split("=")[0];
    if (varName.toUpperCase() === name.toUpperCase()) {
      ret = parameters[i].split("=")[1];
      if (typeof(ret) === 'string') {
        ret = ret.trim();
      }
      break;
    }
  }
  return ret;
}