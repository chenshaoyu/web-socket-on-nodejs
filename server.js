var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0;

app.get('/', function(req, res){
  res.sendfile('chart.html');
});

io.on('connection', function(socket){
  var address = socket.handshake.address;
  console.log("New connection from " + address);
  
  socket.on('disconnect', function(socket){
  var address = socket.handshake.address;
  console.log("Disconnected from " + address);
  });
});

setInterval(function() { io.emit('Pressure', Math.random()* 500 + 500);}, 1000);

http.listen(80, function(){
  console.log('listening on *:80');
});