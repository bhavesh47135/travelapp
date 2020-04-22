const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // All Dependencies

app.set('port', process.env.PORT || 3000); // Port that the app will be accessed on

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("scripts"));
app.use(express.static("css"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://cloud.tfl.gov.uk/");
    next();
});

app.listen(3000, function() {
    console.log('Port 3000 is open.')
}); // Check that the port is open

app.get('/',function(req,res){
    res.sendFile(__dirname+'/html/home.html');
});

app.get('/home',function(req,res){
    res.sendFile(__dirname+'/html/home.html');
});

app.get('/home.html',function(req,res){
    res.sendFile(__dirname+'/html/home.html');
});

app.get('/journey-planner', function(req,res){
    var start = req.body.start;
    var end = req.body.end;
    res.sendFile(__dirname+'/html/journey-planner.html');
});

app.get('/Bakerloo-status',function(req,res){
    res.sendFile(__dirname+'/html/status/bakerlooStatus.html');
});

app.get('/Central-status',function(req,res){
    res.sendFile(__dirname+'/html/status/centralStatus.html');
});

app.get('/Circle-status',function(req,res){
    res.sendFile(__dirname+'/html/status/circleStatus.html');
});

app.get('/District-status',function(req,res){
    res.sendFile(__dirname+'/html/status/districtStatus.html');
});

app.get('/Hammersmith-City-status',function(req,res){
    res.sendFile(__dirname+'/html/status/hammersmithStatus.html');
});

app.get('/Jubilee-status',function(req,res){
    res.sendFile(__dirname+'/html/status/jubileeStatus.html');
});

app.get('/Metropolitan-status',function(req,res){
    res.sendFile(__dirname+'/html/status/metropolitanStatus.html');
});

app.get('/Northern-status',function(req,res){
    res.sendFile(__dirname+'/html/status/northernStatus.html');
});

app.get('/Piccadilly-status',function(req,res){
    res.sendFile(__dirname+'/html/status/piccadillyStatus.html');
});

app.get('/Victoria-status',function(req,res){
    res.sendFile(__dirname+'/html/status/victoriaStatus.html');
});

app.get('/Waterloo-city-status',function(req,res){
    res.sendFile(__dirname+'/html/status/waterlooStatus.html');
});

app.get('/more-lines',function(req,res){
    res.sendFile(__dirname+'/html/moreLines.html');
});

app.get('/maps-tube-map',function(req,res){
    res.sendFile(__dirname+'/html/tubemap.html');
});

app.get('/maps-tube-rail-map',function(req,res){
    res.sendFile(__dirname+'/html/tuberailmap.html');
});

app.get('/maps-night-tube-map',function(req,res){
    res.sendFile(__dirname+'/html/nighttubemap.html');
});

app.get('/more-attractions',function(req,res){
    res.sendFile(__dirname+'/html/attractions/attractions.html');
});

app.get('/big-ben',function(req,res){
    res.sendFile(__dirname+'/html/attractions/bigben.html');
});