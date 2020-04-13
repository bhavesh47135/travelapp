/*var template = "<div class='journey>\n\
                    <img class='modeIcon' src='ICON' alt='NAME'>\n\
                    <span class='modeName'>NAME</span>\n\
                    <span class='modeInfo'>INFO</span>\n\
                </div>";
*/
var content = "";

var url = window.location.href;

var start = (url.split('=')[1]).split('&')[0];
var end = url.split('=')[2];

console.log(start);
console.log(end);

var query = ("https://api.tfl.gov.uk/Journey/JourneyResults/" + start + "/to/" + end + 
"?nationalSearch=false&app_key=211467e7a16e5bd534b224588de3b02e&app_id=2bd766c8").toString();

fetch(query)
.then((resp) => {
    resp.json().then(
        (text) => {
            if (text.toLocationDisambiguation != undefined) {
                var heading = "<span class='heading>Sorry, we couldn't find where you're headed to. \n\
                                Did you mean any of these?</span>"
                var template = "<div class='journey'>\n\
                                    <span class='suggestions'>SUGGESTIONS</span>\n\
                                </div>";
            }
            if (text.toLocationDisambiguation != undefined) {
                var template = "<div class='journey>\n\
                                    <img class='modeIcon' src='ICON' alt='NAME'>\n\
                                    <span class='modeName'>NAME</span>\n\
                                    <span class='modeInfo'>INFO</span>\n\
                                </div>";
            }
            //console.log(query);
            //console.log(text);

            if (heading != undefined) {
                var entry = heading + template.replace(/POS/g,(i+1))
                .replace(/SUGGESTIONS/g,suggestions[x])
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;
            } 
            if (heading == undefined) {
                var entry = template.replace(/POS/g,(i+1))
                entry = entry.replace('<a href=\'http:///\'></a>','-');
                content += entry;
                document.getElementById('content').innerHTML = content;
            }
            /*.replace(/IMG/g,lines[count].image)
            .replace(/NAME/g,lines[count].name)
            .replace(/LINE/g,lineName)
            .replace(/STATUS/g,data)
            .replace(/COLOUR/g,colour)*/
    })
});