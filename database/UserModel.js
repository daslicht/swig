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
                    l(':( Database, ensureIndex  ', err);
                }else{
                    l(':) Database, ensureIndex  ', indexName);
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
userModel.createUser  = function( userVO, callback)
{          
	if(_.isUndefined(userVO) ){
      	l('userVO is undefined')
      	var userVO =  {
	        username:'admin',
	        password:'admin',
	        email:'daslicht@ansolas.de',
	        status:'admin'
    	}
    }
    l(' ');
    l('userVO: ', userVO);
	l(' ');
    userCollection.insert( userVO, {safe:true}, function(err, result) {
        userCollection.ensureIndex({email:1},{unique:true},function(err, indexName){
            if(err){
                l(':( Database, ensureIndex  ', err);
            }else{
                l(':) Database, ensureIndex  ', indexName);
            }
        });
        if(err){
           // console.log(':( Database insert ',err.code); 
            if(err.code === 11000){
                //l('User already exists');
                callback('User already exists');
            }  
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