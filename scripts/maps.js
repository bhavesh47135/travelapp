var zoomImg = document.getElementById("zoomImg");

var img = document.getElementById("mapImg");
var zoomedImg = document.getElementById("newImg");

img.onclick = function() {
    zoomImg.style.display = "block";
    zoomedImg.src = this.src;
    $('meta[name=viewport]').remove();
    var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover">'
    $('head').append(meta);
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
    zoomImg.style.display = "none";
    $('meta[name=viewport]').remove();
    var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">'
    $('head').append(meta);
}