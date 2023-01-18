mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_choropleth = new mapboxgl.Map({
    container: 'map-choropleth',
    style: 'mapbox://styles/angelinejcq/cl3ugxzwa008d14rwmgpbifqy',
    zoom: 3.75,
    maxZoom: 9,
    minZoom: 3,
    center: [-95, 37.7],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: "albers",
});

map_choropleth.on("load", function () {
  map_choropleth.addLayer({
    id: "us_states_disasters_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/statesDisasters.geojson",
    },
    maxzoom: 6,
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.7,
    },
  },"waterway-label");

  console.log("data/statesDisasters.geojson")
  map_choropleth.addLayer({
    id: "us_states_disasters",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/statesDisasters.geojson",
    },
    maxzoom: 6,
    paint: {
      "fill-color": [
        "match",
        ["get", "dominant"],
        "Severe Storm", "#1d3557",
        "Hurricane", "#6F7D8C",
        "Flood", "#a8dadc",
        "Fire", "#e63946",
        "Typhoon", "#34252F",
        "Snowstorm", "#edede9",
        "#D8DBE2"
      ],
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.9,
    },
  }, "us_states_disasters_outline");

  map_choropleth.addLayer(
    {
      id: "us_counties_disasters_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countiesDisasters.geojson",
      },
      minzoom: 6,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.25,
      },
    },
    "waterway-label"
  );
  map_choropleth.addLayer(
    {
      id: "us_counties_disasters",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countiesDisasters.geojson",
      },
      minzoom: 6,
      paint: {
          "fill-color": [
            "match",
            ["get", "dominant"],
            "Severe Storm", "#1d3557",
            "Hurricane", "#6F7D8C",
            "Flood", "#a8dadc",
            "Fire", "#e63946",
            "Typhoon", "#34252F",
            "Snowstorm", "#edede9",
            "#D8DBE2"
          ],
        "fill-outline-color": "#000000",
        "fill-opacity": 1,
      },
    },
    "us_counties_disasters_outline"
  );
// Create the popup
map_choropleth.on('click', 'us_states_disasters', function (e) {
  var stateName = e.features[0].properties.NAME;
  var dominant = e.features[0].properties.dominant;
  var totalNumber = e.features[0].properties.sum;

  totalNumber = totalNumber.toLocaleString();
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+stateName+ ' - ' + totalNumber + ' declarations</h4>'
          + '<p>Dominant types: <p> '
          +'<h2>' + dominant +'</h2>')
      .addTo(map_choropleth);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map_choropleth.on('mouseenter', 'us_states_disasters', function () {
  map_choropleth.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_choropleth.on('mouseleave', 'us_states_disasters', function () {
  map_choropleth.getCanvas().style.cursor = '';
});

map_choropleth.on('click', 'us_counties_disasters', function (e) {
  var stateName = e.features[0].properties.STATE_NAME;
  var countyName = e.features[0].properties.NAME;
  var dominant = e.features[0].properties.dominant;
  var totalNumber = e.features[0].properties.sum;

  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  totalNumber = totalNumber.toLocaleString();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + totalNumber + ' declarations</h2>'
          + '<p>Dominant type: ' + dominant + '</p>')
      .addTo(map_choropleth);
});
map_choropleth.on('mouseenter', 'us_counties_disasters', function () {
  map_choropleth.getCanvas().style.cursor = 'pointer';
});
map_choropleth.on('mouseleave', 'us_counties_disasters', function () {
  map_choropleth.getCanvas().style.cursor = '';
});
});