$(document).ready(function(){

	$(document).on('click',"#registerUser_form_submit",function(){
		var form = $("#registerUser_form");
		var i = form.find('input');
			console.log('items', i);
	    var vo= {};

		$.each(i,function(index,item){
			vo = {
				value 	: 	item.value, 
				id 		: 	item.id
			}
			console.log('item:', vo);
		})

		/*
		2DO: 
		VALIDATE INPUT 
		add SSL


		*/
					

		$.ajax({
			  type: "POST",
			  url: "/eventbus",
			  data: {
			         sender:"registerUser_form",
			  		 values:{
			  		 	sender:"rtest"
			  		 } 

			  }

			}).done(function( msg ) {
			  //alert( "Data Saved: " + msg );
		});
	});
});