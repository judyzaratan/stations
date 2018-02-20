//IIFE
(function(L) {
  const url = 'https://api.voltaapi.com/v1/stations';

  //initialize map with center coordinates and zoom
  let mymap = L.map('map').setView([37.77, -122.43], 4);
  let accessToken = 'pk.eyJ1IjoibW9jaGljYXQ4IiwiYSI6Im1kWXlrVEEifQ.6bBKpea3TIGdnoYfULnUow';


  //initialize to gather API endpoint data and set base layer map
  function init() {
    let baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: accessToken
    });

    fetchStations();
    baseLayer.addTo(mymap);
  }

  init();

  //gather API endpoint
  function fetchStations() {
    fetch(url, {
        mode: 'cors'
      })
      .then(status)
      .then(json)
      .then(displayMarkers)
      .catch((err) => console.log(err));
  }

  //create a marker on map and add as another layer to map
  function displayMarkers(stations) {
    //filter for on active stations
    stations = stations.filter(station =>
      station.status === 'active' && station.street_address
    );

    let markers = L.markerClusterGroup();

    let mapMarkers = stations.map((station) => {
      let name = station.name;
      let street_address = station.street_address;
      let city = station.city;
      let state = station.state;
      let zip = station.zip_code;
      let status = station.status;
      let long = station.location.coordinates[0];
      let lat = station.location.coordinates[1];
      let marker = L.marker([station.location.coordinates[1], station.location.coordinates[0]]);

      //popup content in html
      let content = `<h3>${name}</h3>
      <p>${street_address}</p>
      <p><span>${city}</span>, <span>${state}</span> <span>${zip}</span></p>
      <p>Status: ${status}</p>
      <p>Lat:${lat} Long:${long}`;


      marker.bindPopup(content);
      return marker;  //return leaflet marker object for single station
    });


    //create a group from leaflet marker array and add to map
    let markerGroup = L.layerGroup(mapMarkers);
    markers.addLayer(markerGroup);
    mymap.addLayer(markers);
  }


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

})(L);
