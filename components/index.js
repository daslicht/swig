/*
AUTOLOADER
****************************/
module.exports = function()
{

        var fs = require('fs');
        fs.readdir( __dirname+'', function (err, list) {

            list.forEach(function(file) {
                file = __dirname + '/' + file;
                var stat =fs.statSync(file);

                if(stat.isDirectory()) {
                    fs.readdir(file,function(err, list){
                             
                        //app.log("DIR: ",list);
                        //app.log("COMPONENTS: ",list[0]);

     
                        /* LOAD JS
                        **************/
                        require(file+'/'+list[0]); 

                        /*
                         LOAD CSS
                        **************/
                        fs.readdir(file+'/view',function(err, list){
                            list.forEach(function(filename){
                                if(app.getExtension(filename)=='.css'){
                                    var styleToLoad = file+'/view/'+ filename;
                                    try{
                                        fs.symlinkSync(styleToLoad, app.locals.appDir+'/layout/css/'+filename);
//                                        app.log('Added Symlink for :',styleToLoad)
                                    }catch(e){}
                                }                
                            });
                        });

                     
                        /*CONCAT CSS
                            fs.appendFile('message.txt', 'data to append', function (err) {
                              if (err) throw err;
                              console.log('The "data to append" was appended to file!');
                            });

                        */
                    });
                    
                }
            });
            
        });

   

}();
