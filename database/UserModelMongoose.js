
module.exports = function(){

	var mongoose = require('mongoose');
	var db = mongoose.connection;
		mongoose.connect('mongodb://localhost/SWIG_Mongoose');
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () 
		{
			/* SETUP SCHEMA */
			var userSchema = mongoose.Schema({
				email: {type:String, unique:true},
				password: String,
				level: String
			})
			var User = null;
				userSchema.path('email').index({unique: true});
				userSchema.methods.doit = function () {
					var email = this.email
					console.log("DOIT: ",email);
				}

				/* SCHEMA METHODS */
				userSchema.methods.addUser = function(_vo) {
					var newUser = new User({email:"daslicht@ansolas.de", password:"test", level:"admin"});
						newUser.save(function (err, _vo) {
					  		if(err) {
					  			console.log('SAVE :( ',err);
					  		}else {
					  			console.log('SAVE :) ', _vo);
					  		}
						});
				}
				userSchema.methods.findAllUser = function() {
					User.find(function (err, users) {
						  	if(err) {
					  			console.log(err);
					  		}
						  	console.log(users)
					})
				}
			User = mongoose.model('User', userSchema);
			User.findAllUser();
			console.log(  );

			console.log('INIT UserModel');
			return User;
		});
}();