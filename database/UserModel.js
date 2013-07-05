var userCollection = {};
var userModel = {};
var _ = require('underscore');
 /*
CREATE SUPER ADMIN
*******************/
userModel.createSuperAdmin  = function()
{          
        var user =  {
            username:'admin',
            password:'admin',
            email:'daslicht@ansolas.de',
            status:'admin'
        }

        console.log('super admin: ', user);
    
        userCollection.insert( user, {safe:true}, function(err, result) {
            userCollection.ensureIndex({email:1},{unique:true},function(err, indexName){
                if(err){
                    app.log(':( Database, ensureIndex  ', err);
                }else{
                    app.log(':) Database, ensureIndex  ', indexName);
                }
            });
            if(err){
                console.log(':( Database insert ',err);   
            }
        });   
};


 /*
CREATE USER ADMIN
*******************/
userModel.createUser  = function(userVO)
{          
	if(_.isUndefined(userVO) ){
      	app.log('userVO is undefined')
      	var userVO =  {
	        username:'admin',
	        password:'admin',
	        email:'daslicht@ansolas.de',
	        status:'admin'
    	}
    }
    app.log(' ');
    app.log('userVO: ', userVO);
	app.log(' ');
    userCollection.insert( userVO, {safe:true}, function(err, result) {
        userCollection.ensureIndex({email:1},{unique:true},function(err, indexName){
            if(err){
                app.log(':( Database, ensureIndex  ', err);
            }else{
                app.log(':) Database, ensureIndex  ', indexName);
            }
        });
        if(err){
            console.log(':( Database insert ',err);   
        }
    });   
};



userModel.getAll = function( callback) 
{
	userCollection.find().toArray(function(err,docs){
		callback( docs);
	});
}


/* CONSTRUCTOR 
***************/
function init(){
	db.collection('user', function(err, collection)
    {  
    	console.log('UserModel: Init');
    	userCollection = collection;
    });
};
init();


module.exports = userModel;
/*EOF***********************************************************************************/