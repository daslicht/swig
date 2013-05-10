'use strict';
/**
 * Component dependencies.

 app : Express app Instance

 */

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


module.exports = function( app)
{
    app.get('/',function(req,res)
    {
        res.redirect('/news/1');
    });

    app.get('/news/:id',function(req,res)
    {
        console.log(req.params.id);
        res.render(__dirname +'/view/index.html', { foo: 'bar', y : y, details:y[req.params.id-1].details });
    });

};