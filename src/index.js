import Leaflet from 'leaflet';
import Esri from 'esri-leaflet';
import * as Shelter from './img/shelter.svg';

import './style/master.scss';

const INIT_LATLNG = [43.653, -79.383];
const INIT_ZOOM = 13;
const GIS_SOURCE = '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/';
// const TILE_SERVER = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
// const TILE_SERVER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_SERVER = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

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
Esri.featureLayer({
  url: '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/',
  useCors: false,
  pointToLayer: (geojson, latlng) => Leaflet.marker(latlng, { icon }),
});

