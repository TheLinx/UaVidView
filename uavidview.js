var video = document.getElementById('vid');
var videoStarted = false;
var videoEnded = false;
var cursorHideTimer;
var loadedCheckIntv;
var endedCheckIntv;
var seekbarChecked;

$("#pp").hover(function() {
    if (video.paused)
    {
        $(this).addClass("paused-hover");
    }
    else
    {
        $(this).addClass("playing-hover");
    }
},function(){
    if (video.paused)
    {
        $(this).removeClass("paused-hover");
    }
    else
    {
        $(this).removeClass("playing-hover");
    }
});
$("#vol").hover(function() {
    if (video.muted)
    {
        $(this).addClass("muted-hover");
    }
    else
    {
        $(this).addClass("nmuted-hover");
    }
},function(){
    if (video.muted)
    {
        $(this).removeClass("muted-hover");
    }
    else
    {
        $(this).removeClass("nmuted-hover");
    }
});
$("#pp").mousedown(function() {
    if (video.paused)
    {
        $(this).addClass("paused-down");
    }
    else
    {
        $(this).addClass("playing-down");
    }
}).mouseup(function() {
    if (video.paused)
    {
        $(this).removeClass("paused-down");
    }
    else
    {
        $(this).removeClass("playing-down");
    }
});
$("#pp").click(function() {
    if (video.ended)
    {
        videoReplay();
    }
    if (video.readyState == 4)
    {
        if (video.paused)
        {
            videoPlay();
        }
        else
        {
            videoPause();
        }
    }
});
$("#vid").click(function() {
    if (video.ended)
    {
        videoReplay();
    }
    if (video.readyState == 4)
    {
        if (video.paused)
        {
            videoPlay();
        }
        else
        {
            videoPause();
        }
    }
});
$("#replay").click(function() {
    videoReplay();
});
$("#seekbar").click(function (event) {
    if (video.ended)
    {
        return false;
    }
    else
    {
        var newWidth = event.offsetX?(event.offsetX):event.pageX-document.getElementById("seekbar").offsetLeft;
        newWidth = newWidth / 553;
        var newTime = video.duration * newWidth;
        newWidth = newWidth * 100;
        $("#seekplayed").css("width", newWidth+"%");
        video.currentTime = newTime;
    }
});

function videoPlay() {
    $("#pp").removeClass("paused");
    $("#pp").addClass("playing");
    if ($("#pp").hasClass("paused-hover"))
    {
        $("#pp").removeClass("paused-hover");
        $("#pp").addClass("playing-hover");
    }
    if ($("#pp").hasClass("paused-down"))
    {
        $("#pp").removeClass("paused-down");
        $("#pp").addClass("playing-down");
    }
    video.play();
}
function videoPause() {
    $("#pp").removeClass("playing");
    $("#pp").addClass("paused");
    if ($("#pp").hasClass("playing-hover"))
    {
        $("#pp").removeClass("playing-hover");
        $("#pp").addClass("paused-hover");
    }
    if ($("#pp").hasClass("playing-down"))
    {
        $("#pp").removeClass("playing-down");
        $("#pp").addClass("paused-down");
    }
    video.pause();
}
function videoReplay() {
    $("#seekplayed").css("width", "0%");
    video.currentTime = 0;
    $("#replay").fadeOut("medium", function () {
        videoPlay();
        $(this).css("display", "none");
    });
    videoEnded = false;
}
function stateUpdate() {
    if (video.buffered.length > 0)
    {
        var loadedAmount = video.buffered.end(0) / video.duration;
        loadedAmount = loadedAmount * 100;
        $("#seekloaded").css("width", loadedAmount+"%");
    }
    if (!videoStarted)
    {
        if (video.readyState == 4)
        {
            $("#loading").fadeOut("medium", function () { videoPlay() });
            videoStarted = true
        }
    }
    else
    {
        if (!videoEnded)
        {
            if (video.ended)
            {
                videoPause();
                $("#replay").fadeIn("medium");
                videoEnded = true;
            }
        }
        if (video.seeking)
        {
            $("#loading").css("display", "block");
        }
        else
        {
            $("#loading").css("display", "none");
        }
        if (!video.paused)
        {
            var newWidth = video.currentTime / video.duration;
            newWidth = newWidth * 100;
            $("#seekplayed").css("width", newWidth+"%");
        }
    }
}

loadedCheckIntv = setInterval("stateUpdate()", 10);
