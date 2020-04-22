function keepForm() {

    if (start != undefined && end != undefined) {

        var startInput = start;
        var endInput = end;

        startInput = startInput.replace(/[\/\\+]/g, " ");
        endInput = endInput.replace(/[\/\\+]/g, " ");

        startInput = startInput.replace(/%20/g, " ");
        endInput = endInput.replace(/%20/g, " ");

        startInput = startInput.replace(/%2C/g, ",");
        endInput = endInput.replace(/%2C/g, ",");

        //startInput = startInput.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g," ");
        //endInput = endInput.replace(/[&\/\\#+()$~%.'":*?<>{}]/g," ");
        
        document.getElementsByName('start')[0].value = startInput;
        document.getElementsByName('end')[0].value = endInput;
    }
}

var content = "";

var url = window.location.href;

var start = (url.split('=')[1]).split('&')[0];
start = start.replace(/[\/\\+]/g, "%20");

var end = url.split('=')[2];
end = end.replace(/[\/\\+]/g, "%20");

console.log(start);
console.log(end);

var query = ("https://api.tfl.gov.uk/Journey/JourneyResults/" + start + "/to/" + end + 
"?nationalSearch=false&app_key=211467e7a16e5bd534b224588de3b02e&app_id=2bd766c8").toString();

fetch(query)
.then((resp) => {
    resp.json().then(
        (text) => {

            console.log(query);

            if (text.fromLocationDisambiguation == undefined && 
                text.toLocationDisambiguation == undefined) {

                    var template = "<div class='journeyPlan'>\n\
                                        <img class='modeIcon' src='ICON'>\n\
                                        <span class='modeInfo'>INFO</span>\n\
                                        <span class='modeInfo'>DURATION</span>\n\
                                    </div>";
                    
                    var startTime = (text.journeys[0].startDateTime.split('T')[1]).substring(0, 5);
                    var arrivalTime = (text.journeys[0].arrivalDateTime.split('T')[1]).substring(0, 5);

                    for (var i = 0; i < text.journeys[0].legs.length; i++) {

                        if (text.journeys[0].legs[i].mode.name == "walking") var icon = "walking.png";
                        else if (text.journeys[0].legs[i].mode.name == "tube") var icon = "tube.png";
                        else if (text.journeys[0].legs[i].mode.name == "overground") var icon = "tube.png";
                        else if (text.journeys[0].legs[i].mode.name == "bus") var icon = "bus.svg";
                        else if (text.journeys[0].legs[i].mode.name == "bus") var icon = "train.webp";
                        else if (text.journeys[0].legs[i].mode.name == "replacement-bus") var icon = "bus.svg";

                        var info = text.journeys[0].legs[i].instruction.summary;

                        var duration = text.journeys[0].legs[i].duration + " minutes";

                        var entry = template.replace(/POS/g,(i+1))
                        .replace(/ICON/g,icon)
                        .replace(/INFO/g,info)
                        .replace(/DURATION/g,duration)
                        entry = entry.replace('<a href=\'http:///\'></a>','-');
                        content += entry;
                        document.getElementById('content').innerHTML = content;
                    }
                    
                }

            else if (text.toLocationDisambiguation.matchStatus != "identified" && 
            text.fromLocationDisambiguation.matchStatus != "identified") {
                
                var template = "<div class='journey'>\n\
                                    <span class='sorry'>Sorry, we couldn't find either of these locations. \n\
                                    Did you mean any of these?</span>\n\
                                    <span class='suggestTitle'>Here are some suggestions for your starting location:</span>\n\
                                    STARTSUGGESTS\n\
                                    <span class='suggestTitle'>Here are some suggestions for your destination:</span>\n\
                                    ENDSUGGESTS\n\
                                </div>";

                var startSuggestions = [];
                for (var i = 0; i < text.fromLocationDisambiguation.disambiguationOptions.length; i++) {
                    startSuggestions[i] = text.fromLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

                var endSuggestions = [];
                for (var i = 0; i < text.toLocationDisambiguation.disambiguationOptions.length; i++) {
                    endSuggestions[i] = text.toLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }
                
                var startOptions = [];
                for (var i = 0; i < startSuggestions.length; i++) {
                    startOptions[i] = ("<span class='suggestions'> • " + startSuggestions[i] + "</span>").toString();
                }

                var endOptions = [];
                for (var i = 0; i < endSuggestions.length; i++) {
                    endOptions[i] = ("<span class='suggestions'> • " + endSuggestions[i] + "</span>").toString();
                }

                var entry = template.replace(/POS/g,(i+1))
                .replace(/STARTSUGGESTS/g,startOptions.join(""))
                .replace(/ENDSUGGESTS/g,endOptions.join(""))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }

            else if (text.fromLocationDisambiguation.matchStatus != "identified" && 
            text.toLocationDisambiguation.matchStatus == "identified") {

                var template = "<div class='journey'>\n\
                                    <span class='sorry'>Sorry, we couldn't find your starting location.</span>\n\
                                    <span class='suggestTitle'>Here are some suggestions for your starting location:</span>\n\
                                    SUGGESTIONS\n\
                                </div>";

                var startSuggestions = [];
                for (var i = 0; i < text.fromLocationDisambiguation.disambiguationOptions.length; i++) {
                    startSuggestions[i] = text.fromLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }
                
                var startOptions = [];
                for (var i = 0; i < startSuggestions.length; i++) {
                    startOptions[i] = ("<span class='suggestions'> • " + startSuggestions[i] + "</span>").toString();
                }

                var entry = template.replace(/POS/g,(i+1))
                .replace(/SUGGESTIONS/g,startOptions.join(""))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }

            else if (text.fromLocationDisambiguation.matchStatus == "identified" && 
            text.toLocationDisambiguation.matchStatus != "identified") {

                var template = "<div class='journey'>\n\
                                    <span class='sorry'>Sorry, we couldn't find your destination.</span>\n\
                                    <span class='suggestTitle'>Here are some suggestions for your destination:</span>\n\
                                    SUGGESTIONS\n\
                                </div>";

                var endSuggestions = [];
                for (var i = 0; i < text.toLocationDisambiguation.disambiguationOptions.length; i++) {
                    endSuggestions[i] = text.toLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

                var endOptions = [];
                for (var i = 0; i < endSuggestions.length; i++) {
                    endOptions[i] = ("<span class='suggestions'> • " + endSuggestions[i] + "</span>").toString();
                }

                var entry = template.replace(/POS/g,(i+1))
                .replace(/SUGGESTIONS/g,endOptions.join(""))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }

            else {
                
                var template = "<div class='journey>\n\
                                    <span class='sorry'>Sorry, there was an error!</span>\n\
                                </div>";

                var entry = template.replace(/POS/g,(i+1))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }
        }
    )
});