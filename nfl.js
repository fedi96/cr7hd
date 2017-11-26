function getNFLGames() {
	var nflAPI = "https://feeds.nfl.com/feeds-rs/scores.json";
	$.getJSON(nflAPI, function (json) {
		var gametv='<div class="box-animate animated fadeInUp" style="animation-delay: 0.26s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">NFL TV</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://www.htcinc.net/media/images/NFL_Network_2012_Logo.png"></div><a data-ajax="false" href="http://rjh.fun/play.html?league=NFL&amp;cdn=nfltv"><button class="bttn-slant bttn-xs bttn-warning">WATCH</button></a></div></div><div class="box-animate animated fadeInUp" style="animation-delay: 0.33s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">NFL RedZone</div></div><hr><div class="button-wrapper animated fadeIn"><img style="" src="http://www.htcinc.net/media/images/NFL_Redzone_horz.png"></div><a data-ajax="false" style="" href="http://rjh.fun/play.html?league=NFL&amp;cdn=redzone"><button class="bttn-slant bttn-xs bttn-warning" style="">WATCH</button></a></div></div>';
		$("#games").append(gametv);
		if (json.week > 0) {
			var games = json.gameScores;
			$.each(games, function (i, game) {
				var gd = new Date(moment.tz(game.gameSchedule.gameTimeEastern, "hh:mm:ss", "America/Toronto").tz("UTC"));
				var time = gd.toLocaleTimeString([], {
				hour: '2-digit',
					minute: '2-digit'
				});
				var pk = game.gameSchedule.gameId;
				var away = game.gameSchedule.visitorNickname;
				var home = game.gameSchedule.homeNickname;
				var logoaway = game.gameSchedule.visitorTeamAbbr;
				var logohome = game.gameSchedule.homeTeamAbbr;
				var fullnv = game.gameSchedule.visitorDisplayName.toLowerCase().replace(" ", "-").replace(" ", "-");
				var fullnh = game.gameSchedule.homeDisplayName.toLowerCase().replace(" ", "-").replace(" ", "-");
				switch (logoaway) {default: break;case 'WAS':logoaway = "wsh";break;}
				switch (logohome) {default: break;case 'WAS':logohome = "wsh";break;}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 10px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+game.gameSchedule.gameDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")+'</button><button style="margin-top: 10px;" class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='http://rjh.fun/play.html?league=NFL&pk="+pk+"&date="+game.gameSchedule.gameDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")+"&cdn="+fullnh+"-vs-"+fullnv+"' data-ajax='false'><button class='bttn-slant bttn-xs bttn-warning'>WATCH</button></a>";
				gameLinks = gameLinks + "</div></div>";
				
				$("#games").append(gameTitle + gameLinks);
				

			});
		} else {
			$("#games").append("No games.");
		}
	});
}
function getNFLGameInfo(cdn, pk, id, date) {
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
