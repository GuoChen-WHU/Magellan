import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './assets/common.less';
import App from './containers/App';

import MapStore from './stores/map';
import FeatureStore from './stores/feature';

const mapStore = MapStore.create({
  source: 'OSM',
  zoom: 18,
  center: [12729863.55937561, 3571664.955681873]
});
const featureStore = FeatureStore.create({
  uid: -1,
  type: '',
  attributes: [],
  properties: []
});

const store = {
  map: mapStore,
  feature: featureStore
};

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>
, document.getElementById('root'));