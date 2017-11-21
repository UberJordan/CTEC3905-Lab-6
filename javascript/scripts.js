"use strict";

(function(){
  let xhr = new XMLHttpRequest();
  // console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("flickrQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  let baseURL = "https://api.flickr.com/services/rest/? \
                method=flickr.photos.search& \
                api_key=YOUR-API-KEY-HERE& \
                format=json& \
                per_page=20& \
                nojsoncallback=1& \
                tags=";

  function gatherData(data) {
    // console.log(data);
    let theData = "";
    let tmp = data.photos.photo;
    for(let key in tmp) {
      let url = `https://farm${tmp[key].farm}.staticflickr.com/${tmp[key].server}/${tmp[key].id}_${tmp[key].secret}_q.jpg`;
      theData += `<img src="${url}" alt="${tmp[key].title}">`;
    }
    demoJSON.innerHTML = theData;
  }

  searchForm.addEventListener("submit", function(ev){
    let url = baseURL + queryBox.value;
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      // console.log(`Current readyState: ${xhr.readyState}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        gatherData(response);
      }
    };
    queryBox.value = "";
    ev.preventDefault();
  }, false);

}());