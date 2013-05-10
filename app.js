/*
*  MAIN APPLICATION
***************************************************************** */

var express = require('express')
     , http = require('http')
     , cons = require('consolidate')
     , swig = require('swig')
     , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    /* SETUP SWIG*/
        swig.init({
            root: __dirname,
            allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
        });
        app.set('views', __dirname);
        app.engine('.html', cons.swig);
        app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);

});

app.configure('development', function(){
  app.use(express.errorHandler());
});



/*
 * GLOBAL SHARED VALUES
 * Application Defaults (shared with ALL users)
 *************************************************************** */
app.locals = {
    basePath : "/",
    title:'Home',
    error: false
}


/*
* LAYOUT
*
**************************************************************** */
app.use('/layout/css', express.static(__dirname+'/layout/css'));
app.use('/layout/js', express.static(__dirname+'/layout/js'));



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));

    /* SETUP SOCKET.IO */
    app.io = require('./socket/socket.js')(server);

    /* AUTOLOAD COMPONENTS
    **********************/
    require('./components/home/index.js')(app);
    require('./components/chat/index.js')(app);

});
