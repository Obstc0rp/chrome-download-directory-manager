chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){

	var url = downloadItem.url;
	var urlArr = url.split('/');
	
	var domain = urlArr[2];
	
	var suggestion = {};
	suggestion.filename = './' + domain + '/' + downloadItem.filename;
	console.log(downloadItem);

	suggest(suggestion);

	return true;
});