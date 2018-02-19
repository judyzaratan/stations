//replace XHR with fetch

//IIFE
(() => {

  const url = 'https://api.voltaapi.com/v1/stations';

  fetch(url, {mode: 'cors'})
    .then(status)
    .then(json)
    .then(function(stations) {
      console.log(stations);
      let mapMarkers = stations.map(function(station) {
        return L.marker([station.location.coordinates[1], station.location.coordinates[0]]);
      });
      L.featureGroup(mapMarkers).addTo(mymap);
    }).catch((err) => console.log(err));

})();


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

let mymap = L.map('map').setView([37.77, -122.43], 4);



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9jaGljYXQ4IiwiYSI6Im1kWXlrVEEifQ.6bBKpea3TIGdnoYfULnUow'
}).addTo(mymap);
