//initial setting
var storageItem = 'managerObject';
var managerObject = JSON.parse(localStorage.getItem(storageItem));
if(!managerObject){
    managerObject = {
        activated: true,
        allPages: true,
        domains: []
    }

    localStorage.setItem(storageItem, JSON.stringify(managerObject));
}

//initial setting end

if(managerObject.activated){
    chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
        var url = downloadItem.url;

        var urlArr = url.split('/');

        var domain = urlArr[2];

        var suggestion = {};

        if(managerObject.allPages){

            domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

            suggestion.filename = './' + domain + '/' + downloadItem.filename;
        }else{

            var index = managerObject.domains.indexOf(domain);

            if(index){

                domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

                suggestion.filename = './' + domain + '/' + downloadItem.filename;
            }else{

                suggestion.filename = downloadItem.filename;
            }
        }

        suggest(suggestion);
        
        return true;
    });
}