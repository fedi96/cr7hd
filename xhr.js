(function(open){XMLHttpRequest.prototype.open=function(method,url,async,user,pass){if(url.indexOf('mlb-ws')!=-1){
  rewrittenUrl=url.replace("https://mlb-ws-mf.media.mlb.com","https://rjh217.herokuapp.com/http://key.rjh.fun/");
}else if(url.indexOf('svc.nhl')!=-1){
  rewrittenUrl=url.replace("https://mf.svc.nhl.com","https://rjh217.herokuapp.com/http://key.rjh.fun/");}
open.call(this,method,rewrittenUrl,async,user,pass);};})(XMLHttpRequest.prototype.open);
