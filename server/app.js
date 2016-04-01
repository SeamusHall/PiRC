var http = require('http');
var express = require('express');
var app = express();
var carController = require('./controller/PhysicalCarController.js').newController();

var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static("server/public"));

server.listen(8080);

io.on('connection', function(socket){
    socket.on('keys', function(msg){
        console.log('message: ' + JSON.stringify(msg));
    });
});

setInterval(function() {
    carController.tick();
    io.emit("tick", carController.getTickCount())
}, 1000);