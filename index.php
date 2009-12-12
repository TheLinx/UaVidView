<?php if (empty($_GET['css'])) { $css = "uavidview.css"; } else { $css = $_GET['css']; } ?><?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <script src="http://cdn.uapps.org/jquery-1.3.2.js" type="text/javascript"></script>
    <link href="<?php echo $css ?>" rel="stylesheet" type="text/css" />
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
</head>
<body>
<?php if (!empty($_GET['v'])) { ?>
<div id="cvid"><video id="vid" src="<?php echo $_GET['v'] ?>" autobuffer="autobuffer">Your browser does not support video tags.</video><img id="loading" src="loading.gif" alt="loading..." /><img id="replay" src="replay.gif" alt="replay!" /></div>
<div id="controls"><span id="pp" class="paused"></span><div id="seekcont"><div id="seekbar"><progress id="seekloaded" style="width:0%;" /><progress id="seekplayed" style="width:0%;" /></div></div><span id="vol"></span></div>
<script src="uavidview.js" type="text/javascript"></script>
<?php } else { ?>
This is UaVidView.<br>Use it in an iframe.<br><b>Arguments:</b><br>
<li>v - URL to the video</li>
<li>css (optional) - stylesheet to use</li>
<?php } ?>
</body>
</html>
