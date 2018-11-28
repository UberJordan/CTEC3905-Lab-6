"use strict";

(function(){

  let queryBox = document.getElementById("guardQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  // get an api key from http://open-platform.theguardian.com/access/
  let baseURL = "https://content.guardianapis.com/search?api-key=e06ba114-0985-4963-ae29-de7aeb00a833&q=";

  searchForm.addEventListener("submit", function(ev){
    let url = baseURL + queryBox.value;
    let request = new Request(url);
    fetch(request)
      .then(function (response) {
        // console.log(`response: ${response.status}`);
        return response.json();
      })
      .then(function(data) {
        // console.log(data);
        let key;
        let theData = "";
        let tmp = data.response.results;
        for (key in tmp) {
          theData += `<li><a href="${tmp[key].webUrl}">${tmp[key].webTitle}</a> ${tmp[key].webPublicationDate}</li>`;
        }
        demoJSON.innerHTML = theData;
      });
	  queryBox.value = "";
    ev.preventDefault();
  }, false);

}());
