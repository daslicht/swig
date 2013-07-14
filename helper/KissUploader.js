module.exports = function(){


    function KissUploader() {
        this._id = "",
        this._collection = {}
    }

    KissUploader.prototype = 
    {
        /*GETTER*/ 
        get id(){
            return this._id;
        },
        get collection(){
            return this._collection;
        },

        /*SETTER*/
        set id(value){
            this._id = value;
        },
        set collection( value){
            db.collection( value, function(err, collection)
            {  
                console.log('KissUploader: Init Collection: ', value);
                this.collection = collection;
            });
        },
    }
    var i = new KissUploader();

    /*=============================================================================================*/
    this.getAllImages = function() {
        this.collection.find().toArray(function(err,docs){
            if(err) {
                l(err);
            }
            l('getAllImages ',docs);

        });
    },

    this.newUploader = function(id){
        //this._id = id;
   
        i.id = id;
        i.collection = i.id;
       // l('Uploader ID: '+i.id);
        var uploadPath = app.locals.appDir + '/uploads/'+i.id;      
      
        //getAllImages();

        /* Create upload Directory */
        try{    
            fs.mkdirSync(uploadPath);
        }catch(e){}

        app.post('/'+i.id, function( req, res)
        {
            var formidable = require('formidable'),
                form = new formidable.IncomingForm(),
                files = [],
                fields = [];

                form.keepExtensions = true;
                form.uploadDir = uploadPath;

            form.on('progress', function(bytesReceived, bytesExpected) {
                 l('bytesReceived: ', bytesReceived);
                 l('bytesExpected: ', bytesExpected);
            })
            
            .on('field', function(field, value) {
                //console.log('FIELD: ',field, value);
                fields.push([field, value]);
            })
              
            .on('file', function(field, file) {
                //console.log('FILE: ',field, file);
                files.push([field, file]);
            })
              
            .on('end', function() {
                console.log('----------------------upload done')

                for(var i=0; i<files.length;i++){

                     console.log('Path: ',files[i][1].path);
                     console.log('Name: ',files[i][1].name);
                     var vo ={
                        name : files[i][1].name,
                        path : files[i][1].path
                     }
                     addImageToCollection(vo);
                }
               

            });
            form.parse(req);
     
            res.redirect('/news/1');
           
        });
      // createCSS(this._id+"_form.less");
       
    };

    this.getUploader = function() {

        var _item = 
        "<form action='/"+i.id+"' enctype='multipart/form-data' method='post'>"+
            "<input type='text' name='title'><br>"+
            "<input type='file' name='upload' multiple='multiple'><br>"+
            "<input type='submit' value='Upload'>"+
        "</form>";
        return _item;
    }

    function createThumbnails(){
        //https://github.com/mash/node-imagemagick-native
    }

    function addImageToCollection( vo) {
        this.collection.insert( vo, {safe:true}, function(err, result) {
            l('addImageToCollection: ',result);
        });   
    }

    
    

    return this;
   

}();

