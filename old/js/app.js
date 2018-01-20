var map = L.map('map').setView([43.653, -79.383], 13);
var icon = L.icon({
  iconUrl: 'img/shelter.svg',
  iconRetinaUrl: 'img/shelter.svg',
  iconSize: [20, 20],
  iconAnchor: [13.5, 17.5],
  popupAnchor: [0, -1],
});
L.esri.basemapLayer('Gray').addTo(map);
var fl = L.esri.featureLayer({
  url: '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/',
  useCors: false,
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
      icon: icon
    });
  }
}).addTo(map);


fl.bindPopup(function (layer) {
  return L.Util.template("<b>Name:</b> {NAME}<br>" +
    "<b>ADDRESS:</b>  {ADDRESS_FULL}<br>" +
    "<b>TYPE:</b>  {TYPE}<br> " +
    "<b>TYPE2:</b>  {TYPE2}<br> " +
    "<b>CAPACITY:</b>  {CAPACITY}<br>" +
    "<br><i> If near CAPACITY please call shelter to confirm space. Data updated last: DATE" +
    "<div id='chart1' style='width: 220px; height: 200px;'></div> <div id='chart2' style='width:  220px; height: 200px;'></div><div id='chart3' style='width:  220px; height: 200px;'></div>", layer.feature.properties);
}, { maxWidth: 325, minWidth: 325, minHeight: 250, maxHeight: 550, keepInView: true, autoPan: true, closeButton: true });

var gpService = L.esri.GP.service({
  url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons",
  useCors: false
});

var gpTask = gpService.createTask();

gpTask.setParam("Drive_Times", "1 2");

var driveTimes = L.featureGroup();
map.addLayer(driveTimes);

fl.on('click', function (evt) {
  var capacity = evt.layer.feature.properties.CAPACITY;
  var mens = (capacity * .96 / capacity) * 100;
  var womens = (capacity * .9 / capacity) * 100;
  var family = (capacity * .7 / capacity) * 100;

  var purple = '#6a329e';
  var blue = '#00a6dd';
  var green = '#659e32';
  var orange = '#b85d26';

  var progress_opts = {
    font_color: "#fff",
    fill_color: "#222",
    background_color: "#00aadd",
    text_shadow: "rgba(0,0,0,.1)"
  };

  var progress1 = new Charts.CircleProgress('chart1', 'Men Occupancy', mens, {
    radius: 45,
    font_color: "#fff",
    fill_color: "#222",
    label_color: "#333",
    text_shadow: "rgba(0,0,0,.1)",
    stroke_color: blue
  });

  progress1.draw()

  var progress2 = new Charts.CircleProgress('chart2', 'Women Occupancy', womens, {
    font_color: "#fff",
    radius: 45,
    fill_color: "#222",
    label_color: "#333",
    text_shadow: "rgba(0,0,0,.1)",
    stroke_color: orange
  });
  progress2.draw()

  var progress3 = new Charts.CircleProgress('chart3', 'Family Occupancy', family, {
    radius: 45,
    font_color: "#fff",
    fill_color: "#222",
    label_color: "#333",
    text_shadow: "rgba(0,0,0,.1)",
    stroke_color: green
  });
  progress3.draw()

  driveTimes.clearLayers();
  gpTask.setParam("Input_Location", evt.latlng)
  gpTask.run(driveTimeCallback);
});



function driveTimeCallback(error, response, raw) {
  // document.getElementById('info-pane').innerHTML = 'Click shelter to see 3 and 5 minute drivetimes';
  driveTimes.clearLayers();
  driveTimes.addLayer(L.geoJSON(response.Output_Drive_Time_Polygons));
}