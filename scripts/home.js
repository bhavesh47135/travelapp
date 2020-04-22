var lines = [
    {
        image: "bakerlooicon.png",
        name: "Bakerloo"
    },
    {
        image: "centralicon.jpg",
        name: "Central"
    },
    {
        image: "circleicon.jpg",
        name: "Circle"
    },
    {
        image: "districticon.jpg",
        name: "District"
    },
    {
        image: "dlr.jpg",
        name: "DLR"
    },
    {
        image: "hammersmith-cityicon.jpg",
        name: "Hammersmith & City"
    },
    {
        image: "jubileeicon.jpg",
        name: "Jubilee"
    },
    {
        image: "overground.jpg",
        name: "Overground"
    },
    {
        image: "metropolitanicon.jpg",
        name: "Metropolitan"
    },
    {
        image: "northernicon.jpg",
        name: "Northern"
    },
    {
        image: "piccadillyicon.jpg",
        name: "Piccadilly"
    },
    {
        image: "victoriaicon.jpg",
        name: "Victoria"
    },
    {
        image: "waterloo-cityicon.jpg",
        name: "Waterloo & City"
    }
]

var template =  "<div id='NAME' class='trainLines' onclick=javascript:location.href='LINE-status'>\n\
                    <img class='lineIcon' src='IMG' alt='NAME'>\n\
                    <div class='lineInfo'>\n\
                        <span class='lineName'>NAME</span>\n\
                        <span style='color:COLOUR' id='statusNAME'>STATUS</span>\n\
                    </div>\n\
                </div>";

var content = "";

var count = -1;

for (var i = 0; i < lines.length; i++) {
    
    //fetch("https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true&app_key=211467e7a16e5bd534b224588de3b02e&app_id=2bd766c8")
    fetch("https://api.tfl.gov.uk/Line/Mode/tube%2Cdlr%2Coverground/Status?detail=false&app_id=2bd766c8&app_key=211467e7a16e5bd534b224588de3b02e%09")
    .then((resp) => {
        resp.json().then(
            (text) => {

                count++;

                var status = [];

                for (var x = 0; x < 10; x++) {
                    if (text[count].lineStatuses[x] != undefined) {
                        status[x] = text[count].lineStatuses[x].statusSeverityDescription;
                    }
                }

                const statuses = status.reduce((acc, current) => {
                    const x = acc.find(status => status === current);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                if (statuses[1] == undefined) var data = statuses[0].toString();
                if (statuses[1] != undefined) var data = (statuses[0] + ", " + statuses[1]).toString();

                if (statuses.includes("Part Suspended")) var colour = "red";
                else if (statuses.includes("Service Closed")) var colour = "red";
                else if (statuses.includes("No Service")) var colour = "red";
                else if (statuses.includes("Planned Closure")) var colour = "orange";
                else if (statuses.includes("Special Service")) var colour = "orange";
                else if (statuses.includes("Good Service")) var colour = "green";

                if ((lines[count].name.includes("&")) == false) var lineName = lines[count].name;
                if ((lines[count].name.includes("&")) == true) var lineName = lines[count].name.replace(" & ", "-");

                var entry = template.replace(/POS/g,(i+1))
                .replace(/IMG/g,lines[count].image)
                .replace(/NAME/g,lines[count].name)
                .replace(/LINE/g,lineName)
                .replace(/STATUS/g,data)
                .replace(/COLOUR/g,colour)
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;
            }
        )
    })
};

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
};