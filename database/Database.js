'use strict';
var _db = false;

// function createCollection( db, collectionName){
//     //check if collection exists if not create one
//     db.createCollection(collectionName, {safe:true}, function(err, collection) {
//         if(err){
//             console.log("Connect: "+err);
//         }else{
//             console.log("Collection  "+collectionName+" created!");
//             /*db.collection('user', function(err, collection)
//              {
//              collection.ensureIndex({email:1},{unique:true});
//              });      */
//         }

//     });
// }


/*

// function createDBStructure(db)
//    // createCollection(db,"blog");
//     createCollection(db,"user");
//     db.collection('user', function(err, collection)
//     {
//         collection.ensureIndex({email:1},{unique:true});
//     });
// }



// function createNewsCollection(db){
//     createCollection(db,"news");
//     var headline =  {
//         date:'19.11.2012',
//         headline:'Headline A',
//         url:'headline-A',
//         details:[
//             {
//                 content:'This is Detail page 1 / 2'
//             },
//             {
//                 content:'This is Detail page 2 / 2'
//             }
//         ]
//     };

//     db.collection('news', function(err, collection)
//     {
//         collection.insert( headline, {safe:true}, function(err, result) {
//             if(err){
//                 console.log('insert: ',err);

//             }else{

//             }
//         });
//     });



// }


*/

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
