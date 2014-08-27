chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){

	var url = downloadItem.url;
	var urlArr = url.split('/');
	var escapeChars = ['<', '>', ':', '"', '\\', '/', '|', '*', '?'];

	var domain = urlArr[2];
	
	var suggestion = {};

    domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

	suggestion.filename = './' + domain + '/' + downloadItem.filename;

	suggest(suggestion);

	return true;
});