'use strict';


//dummy content
var y = [
    {
        'master' : 'first headline',
        'details'  : 'this is content'
    },
    {
        'master' : 'second headline',
        'details'  : 'this is another content'
    }

];



var pages = [
    ,{name:'home'}
    ,{name:'chat'}
    ,{name:'about'}
    ,{name:'contact'}
];

module.exports = function()
{
    //app.log('home');
    app.get('/',function(req,res)
    {
        res.redirect('/news/1');
    });

    app.get('/news/:id',function(req,res)
    {
        res.render(__dirname +'/view/home.html', { foo: 'welcome', y : y, details:y[req.params.id-1].details });
    });


    app.post('/upload',function(req,res)
    {
        var formidable = require('formidable');
        var form = new formidable.IncomingForm(),
            files = [],
            fields = [];

        form.uploadDir = app.locals.appDir + '/uploads';

        form.on('progress', function(bytesReceived, bytesExpected) {
             l('bytesReceived: ', bytesReceived);
             l('bytesExpected: ', bytesExpected);
        });
        
        form.on('field', function(field, value) {
            console.log('FIELD: ',field, value);
            fields.push([field, value]);
        });
          
        form.on('file', function(field, file) {
            console.log('FILE: ',field, file);
            files.push([field, file]);
        });
          
        form.on('end', function() {
            console.log('-> upload done');
            console.log('FIELDS: ',fields);
            console.log('FILES: ,'files);

        });
        form.parse(req);

        res.redirect('/news/1');
       
    });
   


}();

