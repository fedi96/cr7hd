var ids=new Array();function setUp(date){if(date==null){date=getToday();}
$("#date").append(date);document.title="Games for "+ date;var gd=date.split("-");var gameDate=gd[1]+"/"+ gd[2]+"/"+ gd[0];$('#cal').val(gameDate);return date;}
function getToday(){return moment.tz(new Date(),"America/Los_Angeles").format("YYYY-MM-DD");}
function idExists(id,lg){if(ids.length===0){fillIDs(lg);}
return ids.includes(id);}
function fillIDs(lg){var idurl;if(lg==="NHL"){idurl="/ids.txt";}else{idurl="/ids.txt";}
jQuery.ajax({url:idurl,success:function(html){ids=html.replace(/akc/g,"").replace(/l3c/g,"").split("\n");;},async:false});}
function createUrl(lg,date,id,title,pk,time){var ms=(new Date(time)- new Date());var min=Math.floor(ms/60000);if(min>35||!idExists(id,lg)){return"<a href='play.html?league="+ lg+"&date="+ date+"&id="+ id+"&pk="+ pk+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>"+ title+"</button></a>";}
return"<a href='play.html?league="+ lg+"&date="+ date+"&id="+ id+"&pk="+ pk+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>"+ title+"</button></a>";}
function $_GET(param){var vars={};window.location.href.replace(location.hash,'').replace(/[?&]+([^=&]+)=?([^&]*)?/gi,function(m,key,value){vars[key]=value!==undefined?value:'';});if(param){return vars[param]?vars[param]:null;}
return vars;}
function nhl(){var date=$_GET("date");date=setUp(date);var d=moment(date);if(d.format("YYYY-MM-DD")===getToday()){$("#dayNav").append("<a href='nhl.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | Today | <a href='nhl.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}else{$("#dayNav").append("<a href='nhl.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | <a href='nhl.html?date="+ getToday()+"' data-ajax='false'>Today</a> | <a href='nhl.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}
getNHLGames(date);}
function nfl(){getNFLGames();}
function mlb(){var date=$_GET("date");date=setUp(date);var d=moment(date);if(d.format("YYYY-MM-DD")===getToday()){$("#dayNav").append("<a href='mlb.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | Today | <a href='mlb.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}else{$("#dayNav").append("<a href='mlb.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | <a href='mlb.html?date="+ getToday()+"' data-ajax='false'>Today</a> | <a href='mlb.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}
getMLBGames(date);}
function play(){if($_GET("league")==="NHL"){getNHLGameInfo($_GET("cdn"),$_GET("pk"),$_GET("id"),$_GET("date"));buildClappr($_GET("id"),$_GET("cdn"),$_GET("date"));}else{getMLBGameInfo($_GET("cdn"),$_GET("pk"),$_GET("id"),$_GET("date"));buildClappr($_GET("id"),$_GET("cdn"),$_GET("date"));}}
function buildClappr(id,cdn,date){var url;if(cdn===null){cdn="akc";}
if($_GET("league")==="NHL"){url="http://mybacklink.website/rjh.php?date="+ date+"&id="+ id +"&cdn="+ cdn;}else{url="http://key.rjh.fun/mlb/m3u8/"+ date+"/"+ id+ cdn;}
$.get(url,function(data){var player=new Clappr.Player({source:"http://rjh217.stream/m3u8.php?url="+data,plugins:[Clappr.HLS,LevelSelector],parentId:"#player"});},'text');}
