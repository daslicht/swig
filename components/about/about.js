'use strict';


module.exports = function()
{

	//app.log('about');

    app.get('/about',function(req,res)
    {
        res.render(__dirname +'/view/about.html', { title: 'about' });
    });

}();