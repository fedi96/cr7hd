function getNHLGames(date) {
	var nhlAPI = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" + date + "&endDate=" + date + "&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=";
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
				var away = game.teams.away.team.name;
				var home = game.teams.home.team.name;
				var logoaway = game.teams.away.team.abbreviation;
				var logohome = game.teams.home.team.abbreviation;

				var gameTitle = '<div class="btn btn-info" data-toggle="collapse" data-target="#'+ pk +'"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/' + logoaway + '.png&amp;h=55&amp;w=55">' + away + " at " + home + " - " + time + '<img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div><br/><br/><div id="'+ pk +'" class="collapse">';
				var gameLinks = "";
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
							}
							gameLinks = gameLinks + createUrl("NHL", date, item.mediaPlaybackId.toString(), feedName, pk, gd.toLocaleString());
						});
					}
				});
				gameLinks = gameLinks + "</div><br />";
				$("#games").append(gameTitle + gameLinks);
			});
		} else {
			$("#games").append("No games.");
		}
	});
}

function getNHLGameInfo(cdn, pk, id, date) {
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