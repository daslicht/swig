$(document).ready(function(){

	$(document).on('click',"#registerUser_form_submit",function(){
		var form = $("#registerUser_form");
		var i = form.find("input");
		$.each(i,function(index,item){
			console.log('item', item);
		})
					

		$.ajax({
			  type: "POST",
			  url: "/eventbus",
			  data: {
			         sender:"{{sender}}",
			  		 values:{
			  		 	sender:"rtest"
			  		 } 

			  }

			}).done(function( msg ) {
			  alert( "Data Saved: " + msg );
		});
	});
});