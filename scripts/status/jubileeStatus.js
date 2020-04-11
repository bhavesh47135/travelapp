var template =  "<div style='background-color:COLOUR' class='statusTitle'>\n\
                    <img class='statusIcon' src='ICON'>\n\
                    <span class='statusTitle'>STATUS</span>\n\
                </div>\n\
                <div class='statusText'>\n\
                    <span class='statusDetails'>TEXT</span>\n\
                </div>";

var content = "";

var count = -1;

for (var i = 0; i < 1; i++) {
    
    fetch("https://api.tfl.gov.uk/Line/jubilee/Status?detail=true&app_id=2bd766c8&app_key=211467e7a16e5bd534b224588de3b02e")
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
                console.log(icon);

                var entry = template.replace(/POS/g,(i+1))
                .replace(/ICON/g,icon)
                .replace(/STATUS/g,statusTitle)
                .replace(/TEXT/g,details)
                .replace(/COLOUR/g,colour)
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;
            }
        )
    }) 
}