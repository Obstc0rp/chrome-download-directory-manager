
var storageItem = 'managerObject';
var managerObject = JSON.parse(localStorage.getItem(storageItem));

$(document).ready(function(){

	refresh();	
	addEvents();
});

function refresh () {
	if(managerObject.activated){
		$('#pluginActivate').attr('class', 'btn btn-success');
		$('#spanActivate').attr('class', 'glyphicon glyphicon-ok');
	} else {
		$('#pluginActivate').attr('class', 'btn btn-danger');
		$('#spanActivate').attr('class', 'glyphicon glyphicon-remove');
	}
}

function addEvents () {
	
	//enable / disable plugin
	$('#pluginActivate').click(function(){
		//TODO: check
		managerObject.activated = managerObject.activated == true ? false : true;
		localStorage.setItem(storageItem, JSON.stringify(managerObject));

		console.log(managerObject);
		refresh();
	});
}