var mongoose = require('mongoose');
	

var db = mongoose.connection;
	
	


module.exports = function(callback) {
	mongoose.connect('mongodb://localhost/SWIG_Mongoose');
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('mongoose open');
		return callback(db);
	});
}();