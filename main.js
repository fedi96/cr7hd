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
function nba(){getNBAGames();}
//function mlb(){var date=$_GET("date");date=setUp(date);var d=moment(date);if(d.format("YYYY-MM-DD")===getToday()){$("#dayNav").append("<a href='mlb.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | Today | <a href='mlb.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}else{$("#dayNav").append("<a href='mlb.html?date="+ d.subtract(1,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Previous</a> | <a href='mlb.html?date="+ getToday()+"' data-ajax='false'>Today</a> | <a href='mlb.html?date="+ d.add(2,"days").format("YYYY-MM-DD")+"' data-ajax='false'>Next</a>");}
//getMLBGames(date);}
function play(){
	if($_GET("league")==="NHL"){
		getNHLGameInfo($_GET("cdn"),$_GET("pk"),$_GET("id"),$_GET("date"));
		rjhply($_GET("id"),$_GET("cdn"),$_GET("date"));
	}
else if($_GET("league")==="NBA"){
	rjhply($_GET("pk"),$_GET("cdn"),$_GET("date"));
	$("#games").append('<style>#cdn,#feed{display: none;}<\/style>');
}
else if($_GET("league")==="NFL"){
		rjhply($_GET("id"),$_GET("cdn"),$_GET("date"));
		$("#games").append('<style>#cdn,#feed{display: none;}<\/style>');
}
//else{getMLBGameInfo($_GET("cdn"),$_GET("pk"),$_GET("id"),$_GET("date"));buildClappr($_GET("id"),$_GET("cdn"),$_GET("date"));}}
function rjhply(id,cdn,date){
	var url;
	var chatx;
	if(cdn===null){cdn="akc";}
	if($_GET("league")==="NHL"){url="https://spark-cinema.glitch.me/https://key.rjh.fun/m3u8/"+ date+"/"+ id + cdn;chatx="nhl"}
	else if($_GET("league")==="NBA"){//url="http://rjh217.stream/nba.php?date="+date+"&cdn="+ cdn;
		url="https://spark-cinema.glitch.me/https://separate-mimosa.glitch.me/"cdn;
		chatx="nba"}
	else if($_GET("league")==="NFL"){
		//url="http://rjh217.stream/nfl.php?date="+date+"&cdn="+ cdn;
		url="https://spark-cinema.glitch.me/https://separate-mimosa.glitch.me/"cdn;
		chatx="nfl"}
	else{url="http://key.rjh.fun/mlb/m3u8/"+ date+"/"+ id+ cdn;chatx="mlb"} 
	if($_GET("league")==="NHL"){
	$.get(url,function(data){
		$("#player").append('<script src="//rjh.fun/vjs.js"></script><video class="video-js vjs-default-skin col my-4" poster="" width="100%" height="480" controls><source src="'+data+'" type="application/x-mpegURL"></video><script>(function(){window.hola_player();})();<\/script>');
		$("#sidebar").append('<script id="cid0020000172461619766" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 100%;height: 480;">{"handle":"'+chatx+'rjhfun","arch":"js","styles":{"a":"021926","b":100,"c":"FFFFFF","d":"FFFFFF","e":"021926","g":"feab3a","h":"ffffff","k":"021926","l":"000000","m":"021926","n":"FFFFFF","p":"10","q":"021926","r":100,"t":0,"ab":false,"surl":0}}<\/script>');
	});}
	else{
	$.get(url,function(data){
		var retVal = "";
                $.each(data, function (index, data) {
                    retVal += data;
                });
		$("#player").append('<script src="//rjh.fun/vjs.js"></script><video class="video-js vjs-default-skin col my-4" poster="" width="100%" height="480" controls><source src="'+retVal+'" type="application/x-mpegURL"></video><script>(function(){window.hola_player();})();<\/script>');
		$("#sidebar").append('<script id="cid0020000172461619766" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 100%;height: 480;">{"handle":"'+chatx+'rjhfun","arch":"js","styles":{"a":"021926","b":100,"c":"FFFFFF","d":"FFFFFF","e":"021926","g":"feab3a","h":"ffffff","k":"021926","l":"000000","m":"021926","n":"FFFFFF","p":"10","q":"021926","r":100,"t":0,"ab":false,"surl":0}}<\/script>');
	},'json');
	}

}}
