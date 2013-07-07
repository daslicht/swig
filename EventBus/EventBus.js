var EventBus = {};



app.post('/eventbus',function(req,res)
{


	console.log('Sender: ', req.body.sender, 'Data', req.body.values)

    //    res.render(__dirname +'/view/chat.html', { foo: 'bar'});
 	res.json(200, { result: 'OK' });

});



module.exports = function(){
	this.doit = function(){
		l('test');
	}
	return this;
}();