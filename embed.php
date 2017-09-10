<?php
$skin = '1';
if (isset($_GET['ch'],$_GET['s'],$_GET['l'])) {
$ch = $_GET['ch'];
$skin = $_GET['s'];
$location = $_GET['l'];


$sURL = "http://cr7hd.eu/embed.php?ch=".$ch; // The POST URL
$content = file_get_contents($sURL);
$aHTTP['http']['method']  = 'GET';
$aHTTP['http']['header']  = "Referer: http://cr7hd.eu//\r\n";

$context = stream_context_create($aHTTP);
$contents = file_get_contents($sURL, false, $context);
//$contents = base64_decode($contents);

if ($location == 'yes'){
echo"
<style>
body {
    background-color: #000000;
}
</style>
<script src='http://cr7hd.com/awesome.css' type='text/javascript'></script>
<script src='https://dl.dropboxusercontent.com/s/ss6u5wrl6nm2upe/rmp4.4.minn.js'></script>
</head>
<body>
<div id='rmpPlayer'></div>
<script>
var bitrates = {
          hls: '".$contents."'
        };
        var settings = {
          licenseKey: 'a2VpdWR5dHNobEAxNDg4ODkxNTQy',
          delayToFade: 3000,
          bitrates: bitrates,
          width: 720,
          autoplay: true,
          height: 480,
          poster: '',
          skin: 's".$skin."',
          isLive: true,
        };";echo'
        var rmp = new RadiantMP("rmpPlayer");
        rmp.init(settings);
      </script>
</body>
</html>';
}else{
echo "
<style>
body {
    background-color: #000000;
}
</style>
<script src='http://cr7hd.com/awesome.css' type='text/javascript'></script>
<script src='https://dl.dropboxusercontent.com/s/ss6u5wrl6nm2upe/rmp4.4.minn.js'></script>
</head>
<body>
<div id='rmpPlayer'></div>
<script>
var livex = 'http://cr7hd.herokuapp.com/';
var bitrates = {
          hls: livex+'".$contents."'
        };
        var settings = {
          licenseKey: 'a2VpdWR5dHNobEAxNDg4ODkxNTQy',
          delayToFade: 3000,
          bitrates: bitrates,
          width: 720,
          autoplay: true,
          height: 480,
          poster: '',
          skin: 's".$skin."',
          isLive: true,
        };";echo'
        var rmp = new RadiantMP("rmpPlayer");
        rmp.init(settings);
      </script>




</body>
</html>';
}

}
