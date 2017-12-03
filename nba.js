function getNBAGames() {
	var nbaAPI = "http://rjh217.stream/nbajs.php";
	$.getJSON(nbaAPI, function (json) {
		var gametv='<div class="box-animate animated fadeInUp" style="animation-delay: 0.33s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">NBA TV</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://www.htcinc.net/media/images/NFL_Network_2012_Logo.png"></div><a data-ajax="false" href="http://rjh.fun/play.html?league=NBA&amp;cdn=nbatv"><button class="bttn-slant bttn-xs bttn-warning">WATCH</button></a></div></div>';
		$("#games").append(gametv);
		if (json.gs.mid > 0) {
			var games = json.gs.g;
			$.each(games, function (i, game) {
				if(game.stt.length>10){
        			var gd = new Date(moment.tz(game.stt, "hh:mm A", "America/Toronto").tz("UTC"));
				var time = gd.toLocaleTimeString([], {
				hour: '2-digit',
					minute: '2-digit'
				});} else {
        			var time= game.stt;}
				var pk = game.gid;
				var away = game.v.tn;
				var home = game.h.tn;
				var logoaway = game.v.ta;
				var logohome = game.h.ta;
				var strmv = game.v.tc.toLowerCase().replace(" ", "-")+"-"+game.v.tn.toLowerCase().replace(" ", "-");
				var strmh = game.h.tc.toLowerCase().replace(" ", "-")+"-"+game.h.tn.toLowerCase().replace(" ", "-");
				if(strmv == "la-clippers")
					strmv ="los-angeles-clippers";
				if(strmh == "la-clippers")
					strmh ="los-angeles-clippers";
				if(logohome == "UTA")
					logohome = "utah";
				if(logohome == 'NOP')
					logohome = "no";
				if(logoaway == "UTA")
					logoaway = "utah";
				if(logoaway == 'NOP')
					logoaway = "no";
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='http://rjh.fun/play.html?league=NBA&date="+json.gs.gdte+"&pk="+pk+"&cdn="+strmh+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>HOME</button></a><a href='http://rjh.fun/play.html?league=NBA&date="+json.gs.gdte+"&pk="+pk+"&cdn="+strmv+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>AWAY</button></a>";
				gameLinks = gameLinks + "</div></div>";

				$("#games").append(gameTitle + gameLinks);
			});
			var gamedatec ='<input type="text" class="datetf" style="width: 288;text-align: center;font-size: x-large;" tabindex="-1" value="'+json.gs.gdte.replace(/(\d{4})\/(\d\d)\/(\d\d)/, "$1-$3-$2")+'" id="cal"/><br>'
			$("#time").append(gamedatec);
		} else {
			$("#games").append("No games.");
		}
				
	});
}

function getNBAGameInfo(cdn, pk, id, date) {
	var nhlAPI = "https://statsapi.web.nhl.com/api/v1/schedule?gamePk=" + pk + "&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=";
	var gameTitle;
	$.getJSON(nhlAPI, function (json) {
		if (json.totalGames > 0) {
			var games = json.dates[0].games;
			$.each(games, function (i, game) {
				var away = game.teams.away.team.name;
				var home = game.teams.home.team.name;
				gameTitle = away + " at " + home;
				$.each(game.content.media.epg, function (j, media) {
					if (media.title === "NHLTV") {
						$.each(media.items, function (k, item) {
							var feedName = "";
							if (item.mediaFeedType === "ISO" || item.mediaFeedType === "COMPOSITE") {
								feedName = item.feedName;
							} else {
								feedName = item.mediaFeedType;
								if (item.callLetters !== "") {
									feedName = feedName + " (" + item.callLetters + ")";
								}
								$('#feed').append($('<option>', {
									value: item.mediaPlaybackId
								}).text(feedName));
								if (item.mediaPlaybackId === id) {
									$("#feed option[value='" + id + "']").prop('selected', true);
									if (item.callLetters !== "") {
										gameTitle = gameTitle + " (" + item.callLetters + ")";
									}
									$("#gmTitle").append(gameTitle);
								}
							}
						});
					}
				});
			});
		}
	});
	if (cdn !== null) {
		$("#cdn option[value='" + cdn + "']").prop('selected', true);
	}
	$("#back-link").append("<a href=nhl.html?date=" + date + ">Back</a>");
}
