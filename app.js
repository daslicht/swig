/*
*  MAIN APPLICATION
***************************************************************** */
    var express = require('express')
         , http = require('http')
         , cons = require('consolidate')
         , swig = require('swig')
         , path = require('path')

    app = express();
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        //SETUP SWIG
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
        app.use(express.cookieParser('my secret here'));
        app.use(express.session());
        app.use(app.router);
        app._ = require('underscore');
    });

    app.configure('development', function(){
      app.use(express.errorHandler());
    });



/*
GLOBAL HELPER FUNCTIONS
*******************************************************************/   
    var debug = true;
    /*Console Log*/     
        l = function(msg1,msg2){
         if(app._.isUndefined(msg1)){
            msg1 = '';
        }
        if(app._.isUndefined(msg2)){
            msg2 = '';
        }
        if(debug)
            console.log(msg1,msg2);
        }


    /*GET FILE EXTENSION*/
        app.getExtension = function(filename){
            var i = filename.lastIndexOf('.');
            return (i < 0) ? '' : filename.substr(i);   
        }



/*GLOBAL SHARED VALUES
Application Defaults (shared with ALL users)
 *************************************************************** */
    app.locals = {
        appDir: __dirname,
        basePath : "/",
        title:'Home',
        error: false,
        styles:[],
        //myform : "test"
    }

    /* ROUTES */
        app.locals.routes = [
             {slug: ["/"], name:"WELCOME" }
            ,{slug: ["/chat"], name:"CHAT" }
            ,{slug: ["/about"], name:"ABOUT" }
            ,{slug: ["/contact"], name:"CONTACT" }
        ];

    /* FORMS */
        var t = require("./helper/KissForm");
            t.newForm('registerUser');
            t.addFormItem('eMail','email','email');
            t.addFormItem('Password','password','password');
        app.locals.registerUserForm = t.getForm();

/*
LAYOUT
**************************************************************** */
    app.use('/layout/assets', express.static(__dirname+'/layout/assets'));
    app.use('/layout/css', express.static(__dirname+'/layout/css'));
    app.use('/layout/js', express.static(__dirname+'/layout/js'));

    require('./layout/css');


/* GLOBALS
****************************************************************************************/

    db = null;
    userModel = null;

    require('./database/Database.js')("SWIG", function( _db){
        db = _db;
        db.collection('user', function(err, collection)
        {   
            /*REGISTER MODELS
            ******************/ 
            userModel = require('./database/UserModel.js');
            userModel.getAll(function(docs){
                //console.log(docs);
            });

            /*
            var userVO =  {
                username:'user',
                password:'user',
                email:'user@ansolas.de',
                status:'admin'
            }
            app.log(' ');
            userModel.createUser(userVO);
            app.log(' ');*/
            
           // userModel.createSuperAdmin();

        });
    });


/* START SERVER 
*****************************************************************************************/
    var server = http.createServer(app).listen(app.get('port'), function(){

        console.log("Express server listening on port " + app.get('port'));
        /* SETUP SOCKET.IO */
        app.io = require('./socket/socket.js')(server);

        require('./components');
        
        /* AUTOLOAD COMPONENTS
        **********************/
        // require('./components/home/home.js');
        // require('./components/chat/chat.js');
        // require('./components/about/about.js');
        // require('./components/contact/contact.js');

    });
