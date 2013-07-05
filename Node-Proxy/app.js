var http =
        util = require('util'),
        http = require('http'),
        colors = require('colors'),
        httpProxy = require('http-proxy');


try {
    var io = require('socket.io'),
        client = require('socket.io-client');
}
catch (ex) {
    console.error('Socket.io is required for this example:');
    console.error('npm ' + 'install'.green);
    process.exit(1);
}



//
// Create the target HTTP server and setup
// socket.io on it.
//
var server = io.listen(3000);
server.sockets.on('connection', function (client) {
    util.debug('Got websocket connection');

    client.on('message', function (msg) {
        util.debug('Got message from client: ' + msg);
    });

    client.send('from server');
});



//
// Setup our server to proxy standard HTTP requests
//
var proxy = new httpProxy.HttpProxy({
    target: {
        host: 'marcwensauer.de',
        port: 3000
    }
});
var proxyServer = http.createServer(function (req, res) {
    proxy.proxyRequest(req, res);
});


//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
    proxy.proxyWebSocketRequest(req, socket, head);
});

proxyServer.listen(8081);


//
// Setup the socket.io client against our proxy
//
var ws = client.connect('ws://localhost:8081');

ws.on('message', function (msg) {
    util.debug('Got message: ' + msg);
});

/*
//
// Create a proxy server with custom application logic
//
httpProxy.createServer(function (req, res, proxy) {
  //
  // Put your custom server logic here
  //
  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 3000
  }
  );
}).listen(8000);
*/
