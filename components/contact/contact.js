'use strict';


module.exports = function()
{

	//app.log('contact');
    app.get('/contact',function(req,res)
    {
        res.render(__dirname +'/view/contact.html', { foo: 'contact' });
    });

}();