(function(open){XMLHttpRequest.prototype.open=function(method,url,async,user,pass){if(url.indexOf('svc.nhl')!=-1){rewrittenUrl=url.replace("https://mf.svc.nhl.com","https://spark-cinema.glitch.me/http://sawlive.tv");rewrittenUrl=rewrittenUrl.replace("/ws/media/mf/v2.3/key/silk/","/m/streams?");rewrittenUrl=rewrittenUrl.replace("mediaid/","ci=");rewrittenUrl=rewrittenUrl.replace("/kid/","&k=");}else{rewrittenUrl=url;}
open.call(this,method,rewrittenUrl,async,user,pass);};})(XMLHttpRequest.prototype.open);
(function(open){XMLHttpRequest.prototype.open=function(method,url,async,user,pass){
  if(url.indexOf('mlb-ws')!=-1){rewrittenUrl=url.replace("https://mlb-ws-mf.media.mlb.com","https://spark-cinema.glitch.me/http://key.rjh.fun");}
  //else if(url.indexOf('svc.nhl')!=-1){rewrittenUrl=url.replace("https://mf.svc.nhl.com","https://spark-cinema.glitch.me/http://key.rjh.fun");}
  else if(url.indexOf('fun/')!=-1){rewrittenUrl=url.replace("https://cdn.rjh.fun/","");}
  else{rewrittenUrl=url;}
open.call(this,method,rewrittenUrl,async,user,pass);};})(XMLHttpRequest.prototype.open);
var replacekey = ["hls/securekey","op-generatekey/v-2.3"];
(function (open) {XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {isKeyUrl = false;$.each(replacekey, function (key, value) {
if (url.toLowerCase().indexOf(value) >= 0) {isKeyUrl = true;}});
if(url.indexOf('21&url=')!=-1){         rewrittenUrl=url.replace("http://nlsk.neulion.com/nlsk1/hls/securekey","http://rjh217.stream/key.php");
                           }     
else if(url.indexOf('16&url=')!=-1){    rewrittenUrl=url.replace("https://nlsk3.neulion.com/nlsk3/hls/securekey","http://rjh217.stream/key.php");
                           } 
else if (isKeyUrl) {rewrittenUrl = "/keyn.txt?url="+ btoa(url);}
else {rewrittenUrl = url;}
open.call(this, method, rewrittenUrl, async, user, pass);};})(XMLHttpRequest.prototype.open);

