import Leaflet from 'leaflet';
import axios from 'axios';

// import { FeatureLayer } from 'esri-leaflet';
// import esriLoader from 'esri-loader';
// import * as Shelter from './img/shelter.svg';

import './style/master.scss';

const INIT_LATLNG = [43.653, -79.383];
const INIT_ZOOM = 13;
const GIS_SOURCE = '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/';
// const TILE_SERVER = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
// const TILE_SERVER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_SERVER = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

const url = '/query?returnGeometry=true&where=1%3D1&outSr=4326&outFields=*&inSr=4326&geometry=%7B%22xmin%22%3A-79.365234375%2C%22ymin%22%3A43.58039085560786%2C%22xmax%22%3A-79.27734375%2C%22ymax%22%3A43.644025847699496%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&f=json';
const baseUrl = 'https://gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122';
const combined = `${baseUrl}${url}`;
const c = 'https://gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/query?returnGeometry=true&where=1%3D1&outSr=4326&outFields=*&inSr=4326&geometry=%7B%22xmin%22%3A-79.453125%2C%22ymin%22%3A43.644025847699496%2C%22xmax%22%3A-79.365234375%2C%22ymax%22%3A43.70759350405296%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&callback=window._EsriLeafletCallbacks.c1&f=json';
// const c = 'https://gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/&f=json';
axios.request({
  url: c,
  method: 'get',
  responseType: 'json',
  withCredentials: false,
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
// EsriLoader.loadModules(["esri-leaflet"])


const map = Leaflet.map('map', {
  center: INIT_LATLNG,
  zoom: INIT_ZOOM,
});

const icon = Leaflet.icon({
  iconUrl: 'https://civictechto.github.io/toronto-shelter-map/img/shelter.svg',
  iconRetinaUrl: 'https://civictechto.github.io/toronto-shelter-map/img/shelter.svg',
  iconSize: [20, 20],
  iconAnchor: [13.5, 17.5],
  popupAnchor: [0, -1],
});

Leaflet.tileLayer(TILE_SERVER, {}).addTo(map);



// const featureLayer = FeatureLayer({
//   url: '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/',
//   useCors: false,
//   pointToLayer: (geojson, latlng) => Leaflet.marker(latlng, { icon }),
// });

// // featureLayer.on('click', (e) => {
// //   console.log(e);
// // });

// featureLayer.addTo(map);
