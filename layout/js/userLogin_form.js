$(document).ready(function(){

	$(document).on('click',"#registerUser_form_submit",function(){
		
		var form = $("#userLogin_form");
		var i = form.find("input");
		
		$.each(i,function(index,item){
			console.log('item', item);
			console.log('item ID:', item.id);
		})
					

		$.ajax({
			  type: "POST",
			  url: "/eventbus",
			  data: {
			         sender:"userLogin_form",
			  		 values:{
			  		 	sender:"rtest"
			  		 } 

			  }

			}).done(function( msg ) {
				console.log(msg)	;
			  //alert( "Data Saved: " + msg );
		});
	});
});