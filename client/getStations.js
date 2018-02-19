//replace XHR with fetch

//IIFE
(() => {

  const url = 'https://api.voltaapi.com/v1/stations';

  fetch(url).then((response) =>
    console.log(response.json())
  ).catch((err) => console.log(err));

  console.log('test');
})();

function displayStations(stations) {
  


}

var mymap = L.map('map').setView([37.77, -122.43], 4);



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9jaGljYXQ4IiwiYSI6Im1kWXlrVEEifQ.6bBKpea3TIGdnoYfULnUow'
}).addTo(mymap);
