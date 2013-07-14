var EventBus = {};



app.post('/eventbus',function(req,res)
{


	console.log('Sender: ', req.body.sender, 'Data', req.body.values)

/*
[ { id: 'email_input', value: '' },
  { id: 'password_input', value: '' } ]

*/
    //    res.render(__dirname +'/view/chat.html', { foo: 'bar'});
	switch(req.body.sender){
		case 'userLogin_form' :{
			l('EVENTBUS: userlogin ');

		}break;
		case 'registerUser_form' :{
			l('EVENTBUS: register user ');
			var vo =  {
		        username:'admin',
		        password:'admin',
		        email:'daslicht@ansolas.de',
		        status:'admin'
    		}
			userModel.createUser( vo, function( msg) {
				 l( msg);
			});
		}break;
		default :{
			l('EVENTBUS: no action found for: ', action);
		}

	}

 	res.json(200, { result: 'OK' });

});



module.exports = function(){
	this.doit = function(){
		l('test');
	}


	return this;
}();