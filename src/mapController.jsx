import * as React from 'react';
import Arcgis from 'react-arcgis';

const INIT_LATLNG = [-79.383, 43.653];
const INIT_ZOOM = 13;
const SHELTER_SERVICE_ENDPOINT = '//gis.toronto.ca/arcgis/rest/services/secondary/cot_geospatial_webm/MapServer/122/';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterLayer: null,
      map: null,
      view: null,
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapLoad(map, view) {
    this.setState({ map, view }, () => {
      Arcgis.esriPromise([
        'esri/layers/FeatureLayer',
        // 'esri/renderers/SimpleRenderer',
        // 'esri/symbols/Symbol',
      ])
        .then(([FeatureLayer]) => {
          const basicSymbol = {
            type: 'simple-marker',
            size: 6,
            color: 'black',
            outline: {
              width: 0.5,
              color: 'white',
            },
          };

          const renderer = {
            type: 'unique-value',
            defaultSymbol: basicSymbol,
          };

          const shelterLayer = FeatureLayer({
            url: SHELTER_SERVICE_ENDPOINT,
            renderer,
          });

          shelterLayer.on('click', e => console.log(e));
          this.state.map.add(shelterLayer);
        })
        .catch(err => console.error(err));
    });

  }

  render() {
    // const shelterFeatureLayer = new Arcgis. ({
    //   url: SHELTER_SERVICE_ENDPOINT,
    // });

    return (
      <Arcgis.Map
        mapProperties={{
          basemap: 'gray',
        }}
        viewProperties={{
          center: INIT_LATLNG,
          zoom: INIT_ZOOM,
        }}
        onLoad={this.handleMapLoad}
      />
    );
  }
}

