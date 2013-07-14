'use strict';
var _db = false;


module.exports.dropDatabase = function()
{
    _db.dropDatabase(function(err) {
        if (err) { throw err; }
        console.log("database has been dropped!");         
    });
}

/*
http://mongodb.github.io/node-mongodb-native/markdown-docs/database.html#deleting-a-database
*/
module.exports = function(name, callback)
{
    //console.log(callback('doit'));
    if(!_db)
    {
        var mongo = require('mongodb');
        var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
        _db = new mongo.Db( name, server,{safe:true});
        _db.open(function(err, db)
        {
            if(!err){
                console.log(':) database.js: We are connected' );
                _db = db;
                //callback(_db);
                callback( _db);
            }else{
                console.log(':( database.js: Db Connection failed');
            }
        });
        console.log('initializing db connection');

    }else{
        console.log(' db already connected');
        //return _db;
        //callback(_db);

    }
};
