/* CSS AUTOLOADER */

module.exports = function(){


	 	var fs = require('fs');
        fs.readdir( __dirname+'', function (err, list) {
			list.forEach(function(file){
				if(app.getExtension(file)=='.css'){
					//l('CSS FILES: '+file); 
					app.locals.styles.push(file); 	
					//console.log("app locals: ",app.locals);		

				}
			});
        });
   

}();