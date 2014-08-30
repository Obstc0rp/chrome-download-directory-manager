
if(!storageItem)
	var storageItem = 'managerObject';

if(!managerObject)
	var managerObject = JSON.parse(localStorage.getItem(storageItem));

$(document).ready(function(){

	refreshOptions();
	addEventsOptions();
});

function refreshOptions(){
	if(managerObject.allPages){

		$('#collapseOne').removeClass('in');
	} else {

		$('#collapseOne').addClass('in');
	}

	$('#domains').empty();
	managerObject.domains.forEach(function(elem){
		$('#domains').append('<option>' + elem + '</option>');
	});
}

function addEventsOptions(){
	$('#selectDomains').click(function(){

		managerObject.allPages = managerObject.allPages == true ? false : true;
		localStorage.setItem(storageItem, JSON.stringify(managerObject));
	});

	$('#newDomain').keypress(function(e){
		if(e.which == 13){	//13 for enter
			
			$('#addDomain').click();
		}
	})

	$('#addDomain').click(function(){

		var newDomain = $('#newDomain').val();

		managerObject.domains.push(newDomain);	//push new domain into array

		localStorage.setItem(storageItem, JSON.stringify(managerObject));
		console.log(managerObject);

		refreshOptions();
	});

	//TODO:
	//add event for deleting domains. "esc"-click and button
}