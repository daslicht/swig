'use strict';
var db = false;

function createCollection(db,collectionName){
    //check if collection exists if not create one
    db.createCollection(collectionName, {safe:true}, function(err, collection) {
        if(err){
            console.log("Connect: "+err);
        }else{
            console.log("Collection  "+collectionName+" created!");
            /*db.collection('user', function(err, collection)
             {
             collection.ensureIndex({email:1},{unique:true});
             });      */
        }

    });
}


/*
 * BLOG
 *     _id
 *     headline
 *     blogHeadline
 * */
function createSuperAdmin(db){
    db.collection('user', function(err, collection)
    {
        var user =  {
            username:'admin',
            password:'admin',
            email:'daslicht@ansolas.de',
            status:'admin'
        }

        console.log('super admin: ', user);

        collection.insert( user, {safe:true}, function(err, result) {
            if(err){
                console.log('insert: ',err);
                app.locals.error = false;
                //app.locals.error ="User with"+ user.email+" eMail already registered";
            }else{
                app.locals.error = false;
            }
        });
    });
}

function createDBStructure(db){
    createCollection(db,"blog");
    createCollection(db,"user");
    app.locals.error = false;
    db.collection('user', function(err, collection)
    {
        collection.ensureIndex({email:1},{unique:true});
    });
}



function createNewsCollection(db){
    createCollection(db,"news");
    var headline =  {
        date:'19.11.2012',
        headline:'Headline A',
        url:'headline-A',
        details:[
            {
                content:'This is Detail page 1 / 2'
            },
            {
                content:'This is Detail page 2 / 2'
            }
        ]
    };

    db.collection('news', function(err, collection)
    {
        collection.insert( headline, {safe:true}, function(err, result) {
            if(err){
                console.log('insert: ',err);

            }else{

            }
        });
    });



}

module.exports = function(callback)
{
    if(!db)
    {
        var DBName =   "kissGUI";
        var mongo = require('mongodb');
        var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
        db = new mongo.Db(DBName, server,{safe:true});
        db.open(function(err, db)
        {
            if(!err){
                console.log(':) database.js: We are connected' );
                //createNewsCollection(db);
                //createDBStructure(db);
                //createSuperAdmin(db) ;

                callback(db);
            }else{
                console.log(':( database.js: Db Connection failed');
            }
        });
        console.log('initializing db connection');

    }else{
        console.log(' db already connected');
        callback(db);
    }
};
