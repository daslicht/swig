$(document).ready(function(){

	$(document).on('click',"#{{sender}}_submit",function(){
		
		var form = $("#{{sender}}");
		var i = form.find("input");
		
		var vo = [];
		$.each( i, function(index,item) {
			var obj = {};
				obj['id'] = item.id;
				obj['value'] = item.value;
				obj[item.name] = item.value;
			vo.push(obj);
		})
					

		$.ajax({
			  type: "POST",
			  url: "/eventbus",
			  data: {
			         sender: "{{sender}}",
			  		 values: vo
			  }

			}).done(function( msg ) {
				console.log(msg)	;
			  //alert( "Data Saved: " + msg );
		});
	});
});