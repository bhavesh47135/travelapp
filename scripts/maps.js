var zoomImg = document.getElementById("zoomImg");

var img = document.getElementById("mapImg");
var zoomedImg = document.getElementById("newImg");

img.onclick = function(){
    zoomImg.style.display = "block";
    zoomedImg.src = this.src;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
    zoomImg.style.display = "none";
}