var content = "";

var url = window.location.href;

var a = (url.split('=')[1]).split('&')[0];
if(a.includes("+")) var start = a.replace("+", " ");
else var start = a;

var b = url.split('=')[2];
if(b.includes("+")) var end = b.replace("+", " ");
else var end = b;

console.log(start);
console.log(end);

var query = ("https://api.tfl.gov.uk/Journey/JourneyResults/" + start + "/to/" + end + 
"?nationalSearch=false&app_key=211467e7a16e5bd534b224588de3b02e&app_id=2bd766c8").toString();

fetch(query)
.then((resp) => {
    resp.json().then(
        (text) => {

            if (text.toLocationDisambiguation.matchStatus != "identified" && 
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
                    console.log(startOptions[i])
                }

                var endOptions = [];
                for (var i = 0; i < endSuggestions.length; i++) {
                    endOptions[i] = ("<span class='suggestions'> • " + endSuggestions[i] + "</span>").toString();
                    console.log(endOptions[i])
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
                    console.log(startOptions[i])
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
                    console.log(endOptions[i])
                }

                var entry = template.replace(/POS/g,(i+1))
                .replace(/SUGGESTIONS/g,endOptions.join(""))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }

            else if (text.fromLocationDisambiguation.matchStatus == "identified" && 
            text.toLocationDisambiguation.matchStatus == "identified") {

                var template = "<div class='journey>\n\
                                    <div class='plan'>\n\
                                        <img class='modeIcon' src='ICON' alt='NAME'>\n\
                                        <span class='modeName'>NAME</span>\n\
                                        <span class='modeInfo'>INFO</span>\n\
                                    </div>\n\
                                </div>";

                var entry = template.replace(/POS/g,(i+1))
                //.replace(/SUGGESTIONS/g,endOptions.join(""))
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
    })
});