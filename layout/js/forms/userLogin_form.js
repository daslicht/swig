$(document).ready(function(){

	$(document).on('click',"#userLogin_form_submit",function(){
		
		var form = $("#userLogin_form");
		var i = form.find("input");
		
		var vo = [];
		$.each( i, function(index,item) {
			var obj = {};
				obj[id] = item.id;
				obj[value] = item.value;
				obj[item.name] = item.value;
			vo.push(obj);
		})
					

		$.ajax({
			  type: "POST",
			  url: "/eventbus",
			  data: {
			         sender: "userLogin_form",
			  		 values: vo
			  }

			}).done(function( msg ) {
				console.log(msg)	;
			  //alert( "Data Saved: " + msg );
		});
	});
});