$(document).ready(function(){

	function supports_html5_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	localStorage['bar'] = 'cool';

	var foo = localStorage.getItem("bar");

	console.log(localStorage['bar']);
});