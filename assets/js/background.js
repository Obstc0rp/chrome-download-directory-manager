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

chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
    managerObject = JSON.parse(localStorage.getItem(storageItem));

    console.log(managerObject);

    if(managerObject.activated == true){

        var domain = getDomainFromUrl(downloadItem.url); // downloadItem.url; //get download url

        //TODO: exclude subdomain. TODO: IP address
        domain = checkForIPAndSubdomain(domain);

        var suggestion = {};

        if(managerObject.allPages == true){

            domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

            suggestion.filename = './' + domain + '/' + downloadItem.filename;
        }else{

            var index = managerObject.domains.indexOf(domain);

            if(index >= 0){

                domain = domain.replace(/([<>*+?^=!:${}()|\[\]\/\\])/g, '');

                suggestion.filename = './' + domain + '/' + downloadItem.filename;
            }else{

                suggestion.filename = downloadItem.filename;
            }
        }

        suggest(suggestion);
    }

    return true;
});

function getDomainFromUrl(url){

    var urlArr = url.split('/');    //split by '/'
    var domain = urlArr[2]; //domain is 3. position

    return domain;
}

function checkForIPAndSubdomain(domain){

    var domainParts = domain.split('.');

    if(domainParts.length < 4){ //if it's not a IP address...
        domain = domainParts[domainParts.length-2] + '.' + domainParts[domainParts.length-1];  //take laste 2 positions for domain without subdomain
    }

    return domain;
}