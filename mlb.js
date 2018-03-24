function getMLBGames(date) {
	var nhlAPI = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date="+date+"&hydrate=team,linescore,game(content(summary,media(epg)))&language=en";
	$.getJSON(nhlAPI, function (json) {
		if (json.totalGames > 0) {
			var games = json.dates[0].games;
			$.each(games, function (i, game) {
				var gd = new Date(game.gameDate);
				var time = gd.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});
				var pk = game.gamePk;
				var away = game.teams.away.team.teamName;
				var home = game.teams.home.team.teamName;
				var logoaway = game.teams.away.team.abbreviation;
				var logohome = game.teams.home.team.abbreviation;
				switch (logoaway) {
				    default: 
					break;
				    case 'CWS':
					logoaway = "chw";
					break; 
				}
				switch (logohome) {
				    default: 
					break;
				    case 'CWS':
					logoaway = "chw";
					break; 
				}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				$.each(game.content.media.epg, function (j, media) {
					if (media.title === "MLBTV") {
						$.each(media.items, function (k, item) {
							var feedName = "";
							if (item.mediaFeedType === "ISO" || item.mediaFeedType === "COMPOSITE") {
								var feedNamek = item.feedName;
							} else {
								feedName = item.mediaFeedType;
								if (item.callLetters !== "") {
									feedName = feedName + " (" + item.callLetters + ")";
								}
								gameLinks = gameLinks + createUrl("MLB", date, item.id, feedName, pk, gd.toLocaleString());
							}
						});
					}
				});
				gameLinks = gameLinks + "</div></div>";
				$("#games").append(gameTitle + gameLinks);
			});
		} else {
			$("#games").append("No games.");
		}
	});
}

