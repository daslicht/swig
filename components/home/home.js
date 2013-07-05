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

}();

