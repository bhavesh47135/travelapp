var template =  "<h1>LINE</h1>\n\
                <div style='background-color:COLOUR' class='statusTitle'>\n\
                    <img class='statusIcon' src='ICON'>\n\
                    <span class='statusTitle'>STATUS</span>\n\
                </div>\n\
                <div class='statusText'>\n\
                    <span class='statusDetails'>TEXT</span>\n\
                </div>";

var mapTemplate =   "<span class='mapTitle'>Map:</span>\n\
                    <img id='mapImg' class='mapimg' src='MAP'>";

var content = "";

var count = -1;

var url = window.location.href;

if (url.includes("Bakerloo")) {
    var lineName = "bakerloo";
    var line = "Bakerloo Line";
    var map = "bakerloomap.gif";
}
else if (url.includes("Central")) {
    var lineName = "central";
    var line = "Central Line";
    var map = "centralmap.gif";
}
else if (url.includes("Circle")) {
    var lineName = "circle";
    var line = "Circle Line";
    var map = "circlehammersmithmap.gif";
}
else if (url.includes("District")) {
    var lineName = "district";
    var line = "District Line";
    var map = "districtmap.gif";
}
else if (url.includes("DLR")) {
    var lineName = "dlr";
    var line = "Docklands Light Railway";
    var map = "dlrmap.png";
}
else if (url.includes("Hammersmith-City")) {
    var lineName = "hammersmith-city";
    var line = "Hammersmith & City Line";
    var map = "circlehammersmithmap.gif";
}
else if (url.includes("Jubilee")) {
    var lineName = "jubilee";
    var line = "Jubilee Line";
    var map = "jubileemap.gif";
}
else if (url.includes("Overground")) {
    var lineName = "/Mode/overground";
    var line = "London Overground";
    var map = "overgroundmap.gif";
}
else if (url.includes("Metropolitan")) {
    var lineName = "metropolitan";
    var line = "Metropolitan Line";
    var map = "metropolitanmap.gif";
}
else if (url.includes("Northern")) {
    var lineName = "northern";
    var line = "Northern Line";
    var map = "northernmap.gif";
}
else if (url.includes("Piccadilly")) {
    var lineName = "piccadilly";
    var line = "Piccadilly Line";
    var map = "piccadillymap.gif";
}
else if (url.includes("Victoria")) {
    var lineName = "victoria";
    var line = "Victoria Line";
    var map = "victoriamap.gif";
}
else if (url.includes("Waterloo-City")) {
    var lineName = "waterloo-city";
    var line = "Waterloo & City Line";
    var map = "waterloomap.gif";
}

var query = "https://api.tfl.gov.uk/Line/" + lineName + "/Status?detail=true&app_id=2bd766c8&app_key=211467e7a16e5bd534b224588de3b02e";

for (var i = 0; i < 1; i++) {
    
    fetch(query)
    .then((resp) => {
        resp.json().then(
            (text) => {

                count++;

                var statusDesc = [];
                var statusDet = [];

                for (var x = 0; x < 10; x++) {
                    if (text[0].lineStatuses[x] != undefined) {
                        statusDesc[x] = text[0].lineStatuses[x].statusSeverityDescription;
                        statusDet[x] = text[0].lineStatuses[x].reason;
                    }
                }

                const statuses = statusDesc.reduce((acc, current) => {
                    const x = acc.find(status => status === current);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                const statusDetails = statusDet.reduce((acc, current) => {
                    const x = acc.find(status => status === current);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                if (statuses.includes("Part Suspended")) {
                    var colour = "red";
                    var icon = "crossicon.png";
                }
                else if (statuses.includes("Service Closed")) {
                    var colour = "red";
                    var icon = "crossicon.png";
                }
                else if (statuses.includes("No Service")) {
                    var colour = "red";
                    var icon = "crossicon.png";
                }
                else if (statuses.includes("Planned Closure")) {
                    var colour = "orange";
                    var icon = "informationicon.png";
                }
                else if (statuses.includes("Special Service")) {
                    var colour = "orange";
                    var icon = "informationicon.png";
                }
                else if (statuses.includes("Good Service")) {
                    var colour = "green";
                    var icon = "tickicon.png";
                }

                if (statuses[1] == undefined) var statusTitle = statuses[0].toString();
                if (statuses[1] != undefined) var statusTitle = (statuses[0] + ", " + statuses[1]).toString();

                var details = statusDetails.toString();

                var entry = template
                .replace(/LINE/g,line)
                .replace(/ICON/g,icon)
                .replace(/STATUS/g,statusTitle)
                .replace(/TEXT/g,details)
                .replace(/COLOUR/g,colour);
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

                var mapImg = mapTemplate.replace(/MAP/g, map);
                document.getElementById('lineMap').innerHTML = mapImg;
            }
        )
    }) 
}

var zoomImg = document.getElementById("zoomImg");

var img = document.getElementById("lineMap");
var zoomedImg = document.getElementById("newImg");

img.onclick = function() {
    zoomImg.style.display = "block";
    zoomedImg.src = map;
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