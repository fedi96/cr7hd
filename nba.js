function getNBAGames() {
	var nbaAPI = "https://jokercros.herokuapp.com/https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2017/scores/00_todays_scores.json";
	$.getJSON(nbaAPI, function (json) {
		if (json.gs.mid > 0) {
			var games = json.gs.g;
			$.each(games, function (i, game) {
				if(game.stt.length>10){
        var gd = new Date(json.gs.gdte.replace(/(\d{4})\/(\d\d)\/(\d\d)/, "$1-$3-$2")+"T"+game.stt.substr(0, 5)+":00Z");
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
				switch (logoaway) {default: break;case 'NOP':logoaway = "no";break;case 'UTA':logoaway = "utah";break;}
				switch (logohome) {default: break;case 'NOP':logohome = "no";break;case 'UTA':logoaway = "utah";break;}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='http://rjh.fun/play.html?league=NBA&pk="+pk+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>HOME</button></a>";
				gameLinks = gameLinks + "</div></div>";
				$("#games").append(gameTitle + gameLinks);
			});
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
