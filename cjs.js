
    var went_to_start_time = false;
    var seek_forward = 120;
    var seek_backward = 120;
    var seekable = true;
    var qos_events = [];

    function time_to_s(time) {
        if(time < 60) {
            return time + "s";
        }
        return time / 60 + "m";
    }

    var BITRATE_LABELS = {5200.000: '720p-HD', 3500.000: '720p-HQ', 2400.000: '540p', 1650000: '480p', 990.000: '360p',
        5772.652: '720p-60', 4023.049: '720p-HD', 2908.735: '720p-HQ', 2121.091: '540p', 2121.091: '480p', 1425.340: '360p', 985.571: '288p',
        6000: '720p-60', 4500:'720p-HD', 3500: '720p', 3000:'720p-HQ', 2500: '540p', 1800: '480p', 1600:'540p', 1200: '480p', 800:'360p', 400:'240p',
        4100: '720p', 2900: '540p', 2140: '504p', 1450: '360p', 1000: '288p', 670: '216p', 6600: '720p-60', 4160: '720p-HD', 2950: '720p-HQ', 2120: '540p', 1400: '360p', 960: '288p', 620: '224p', 153: '180p'
    };
    var retry = 1;

    var clappr_options = {
        source: hlssrc,
        plugins: [ChromecastPlugin, LevelSelector, Clappr.HLS, PlaybackRatePlugin, ClapprCapturePlugin],
        chromecast: {
          appId: '9DFB77C0',
          media: {
            type: ChromecastPlugin.Movie,
            title: 'Live NHL Streams',
            subtitle: 'rjh Streams'
          }
        },
        levelSelectorConfig: {
            labelCallback: function (level, label) {
                console.log(level)
                return BITRATE_LABELS[level.level.bitrate / 1000]
            }
        },
        events: {
            onPlay: setDvrLabels
        },
        width: '100%',
        height: '500px',
        parentId: "#plu",
        autoPlay: true
    }

    var player = new Clappr.Player(clappr_options);
    player.listenTo(player.core.getCurrentContainer(),
        Clappr.Events.CONTAINER_STATE_BUFFERING,
        function() { qos_events.push({event: 'CONTAINER_STATE_BUFFERING', time: now()}); check_qos(); ahoy.track("$video:CONTAINER_STATE_BUFFERING", {uuid: "gYUAZV"}) })
    player.listenTo(player.core.getCurrentContainer(),
        Clappr.Events.PLAYBACK_LEVEL_SWITCH_END,
        function() { qos_events.push({event: 'PLAYBACK_LEVEL_SWITCH_END', time: now()}); check_qos(); ahoy.track("$video:PLAYBACK_LEVEL_SWITCH_END", {uuid: "gYUAZV"}) })
    player.on(Clappr.Events.PLAYER_FULLSCREEN, function(isFullscreen) {
        if(isFullscreen) {
        }
    });


    player.core.mediaControl.on('capture:base64', (b64) => {
        var myWindow = window.open("", "PictureWindow");
    myWindow.document.write(`<img src="${b64}" />`);
    });

    function check_qos() {
        if(qos_events.length > 5) {
            console.log("wow they might need help");
        }
    }
    function setDvrLabels() {
        $('[data-player]').attr('style', 'height:auto !important;')

        $('a[data-ff]').text("+" + time_to_s(seek_forward));
        $('a[data-rw]').text("-" + time_to_s(seek_backward));
        if(seekable) {
            $('.dvr-only').removeClass('.dvr-only');
        }
        if(seekable && went_to_start_time === false) {
            player.seek(default_seek())
            went_to_start_time = true;
        }
    }

    $(document).on('click', '[data-ff]', function() {
        var time = player.getCurrentTime();
        var new_time = time + parseInt(seek_forward);
        var seek_to = new_time;
        if(new_time > player.getDuration()) {
            seek_to = player.getDuration()
        }
        player.seek(seek_to)
    });
    $(document).on('click', '[data-rw]', function() {
        var time = player.getCurrentTime();
        var new_time = time - parseInt(seek_backward);
        var seek_to = new_time;
        if(new_time < 0) {
            seek_to = 0;
        }
        player.seek(seek_to)
    });
