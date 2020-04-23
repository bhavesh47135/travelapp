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
    res.header("Access-Control-Allow-Origin", "https//api.tfl.gov.uk/");
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
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Central-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Circle-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/District-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/DLR-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Hammersmith-City-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Jubilee-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Overground-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Metropolitan-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Northern-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Piccadilly-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Victoria-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
});

app.get('/Waterloo-city-status',function(req,res){
    res.sendFile(__dirname+'/html/status.html');
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

app.get('/london-eye',function(req,res){
    res.sendFile(__dirname+'/html/attractions/london-eye.html');
});

app.get('/big-ben',function(req,res){
    res.sendFile(__dirname+'/html/attractions/bigben.html');
});

app.get('/buckingham-palace',function(req,res){
    res.sendFile(__dirname+'/html/attractions/buckingham-palace.html');
});

app.get('/the-shard',function(req,res){
    res.sendFile(__dirname+'/html/attractions/shard.html');
});

app.get('/harrods',function(req,res){
    res.sendFile(__dirname+'/html/attractions/harrods.html');
});

app.get('/selfridges',function(req,res){
    res.sendFile(__dirname+'/html/attractions/selfridges.html');
});

app.get('/madame-tussauds',function(req,res){
    res.sendFile(__dirname+'/html/attractions/madame-tussauds.html');
});