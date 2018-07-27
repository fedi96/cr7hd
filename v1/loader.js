function getdata(idw) {
  var api = "https://api.rjh.fun/v3/xml/feed/5b54a02f0a4cf304097644/"+idw+"/GMT0/960/540";
  $.getJSON(api, function (json) {
    if (json.events) {
      var uniquegames = [];
      $.each(json.events, function(i, el){
          if($.inArray(el.event, uniquegames) === -1) uniquegames.push(el.event);
      });
      var games = [];
      $.each(uniquegames,function(i, game){
        var un = [];
      $.each(json.events, function(j, el){
          if(el.event == game) un.push({'id' : j,'lang' : el.audio,'time': el.startDateTime,'sport': el.sport,'league': el.league,'def': el.definition});
      });
      console.log(un);
      games.push({'game': game,'content' : un});
      });
      $.each(games, function (i, game) {
        var gd = new Date(parseInt(game.content[0].time));
        var time = gd.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});
        var id = game.content[0].id;
        var sport = game.content[0].sport;
        var league = game.content[0].league;
        var title = game.game;
        var gameLinks = '';
        $.each(game.content, function (j, media) {
          gameLinks = `${gameLinks}<span class="badge badge-pill badge-primary text-uppercase">${media.lang.substr(0, 3)}</span>`;
        });
        var gameTitle = `<div class="card shadow col-lg-3"><div class="card-body"><p class="description">${title}<br>${league}<br>${time}<br>${id}<br>`;
        $("#soccers").append(gameTitle + gameLinks + "</p></div></div>");
      });
    } else {
      $("#soccers").append('<div class="tab-content">No games.</div>');
    }
  });
}













      /*var games = json.events;
      $.each(uniquegames, function (i, game) {
        var gd = new Date(game.startDateTime);
        var time = gd.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        var sport = game.sport;
        var league = game.league;
        var title = game.event;
        var audio = game.audio;
        var definition = game.definition;
        var gameTitle = gameTitle + `<div class="card shadow col-lg-3"><div class="card-body"><p class="description">${title}<br>${league}<br>${gd}<br>${i}</p></div></div>`;
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
        $("#soccer").append(gameTitle + "</div>");
      });
    } else {
      $("#soccer").append('<div class="tab-content">No games.</div>');
    }
  });
}*/
