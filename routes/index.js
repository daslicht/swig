
module.exports = function(_app)
{
    function initializeRoutes(){
        var fs = require('fs');
        fs.readdir( __dirname, function (err, filenames)
        {

            for (var i = 0; i < filenames.length; i++)
            {
                if(filenames[i].indexOf('index.js') == -1){
                    var route = './'+filenames[i];
                    //  console.log(route);
                    require(route)(_app);
                }
            }
        });
    }
    initializeRoutes();

};
