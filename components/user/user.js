module.exports = function()
{
   
 
    app.get('/register',function(req,res)
    {
        res.render(__dirname +'/view/register.html', { title:'Register' });
    });


    app.get('/login',function(req,res)
    {
        res.render(__dirname +'/view/login.html');
    });

    app.get('/user/:id',function(req,res)
    {
        app.log(req.params.id);
        res.render(__dirname +'/view/user.html', { foo: req.params.id});
    });

}();