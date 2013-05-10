var _io = 0;

module.exports = function( server)
{
    _io = require('socket.io').listen(server);
    /*
     * 0 - error
     1 - warn
     2 - info
     3 - debug
     *
     * */
    _io.set('log level', 0);

    _io.sockets.on('connection', function (socket)
    {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });

        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });
    });
    return _io;
};