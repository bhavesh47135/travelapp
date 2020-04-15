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

            if (text.toLocationDisambiguation != undefined && text.fromLocationDisambiguation != undefined) {
                
                var template = "<div class='journey'>\n\
                                    <span>Sorry, we couldn't find either of these locations. \n\
                                    Did you mean any of these?</span>\n\
                                    <span style='border-bottom: 1px solid grey' class='suggestions'>STARTSUGGESTS</span>\n\
                                    <span class='suggestions'>ENDSUGGESTS</span>\n\
                                </div>";

                var startSuggestions = [];
                for (var i = 0; i < text.fromLocationDisambiguation.disambiguationOptions.length; i++) {
                    startSuggestions[i] = text.fromLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

                var endSuggestions = [];
                for (var i = 0; i < text.toLocationDisambiguation.disambiguationOptions.length; i++) {
                    endSuggestions[i] = text.toLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

                //var startOptions = "<span class='suggestions'>ENDSUGGESTS</span>";

                var entry = template.replace(/POS/g,(i+1))
                .replace(/STARTSUGGESTS/g,startSuggestions)
                .replace(/ENDSUGGESTS/g,endSuggestions)
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;

            }

            else if (text.fromLocationDisambiguation != undefined && text.toLocationDisambiguation == undefined) {

                var heading = "<span class='heading>Sorry, we couldn't find where you're departing from. \n\
                                Did you mean any of these?</span>"
                var template = "<div class='journey'>\n\
                                    <span class='suggestions'>SUGGESTIONS</span>\n\
                                </div>";

                var suggestions = [];
                for (var i = 0; i < text.fromLocationDisambiguation.disambiguationOptions.length; i++) {
                    suggestions[i] = text.fromLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

            }

            else if (text.toLocationDisambiguation != undefined && text.fromLocationDisambiguation == undefined) {

                var heading = "<span class='heading>Sorry, we couldn't find where you're headed to. \n\
                                Did you mean any of these?</span>"
                var template = "<div class='journey'>\n\
                                    <span class='suggestions'>SUGGESTIONS</span>\n\
                                </div>";

                var suggestions = [];
                for (var i = 0; i < text.toLocationDisambiguation.disambiguationOptions.length; i++) {
                    suggestions[i] = text.toLocationDisambiguation.disambiguationOptions[i].place.commonName;
                }

            }

            else if (text.toLocationDisambiguation != undefined) {
                var template = "<div class='journey>\n\
                                    <img class='modeIcon' src='ICON' alt='NAME'>\n\
                                    <span class='modeName'>NAME</span>\n\
                                    <span class='modeInfo'>INFO</span>\n\
                                </div>";
            }
    })
});