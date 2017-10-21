import React from 'react';
import ReactDOM from 'react-dom';
import mobx from "mobx";
import { Provider } from "mobx-react";
import './assets/common.less';
import App from './containers/App';

import MapStore from "./stores/map";
import FeatureStore from "./stores/feature";
import ToolStore from "./stores/tool";

const mapStore = MapStore.create({
  source: 'OSM',
  zoom: 10,
  centerX: 0,
  centerY: 0
});
const featureStore = FeatureStore.create({
  type: '',
  attributes: [],
});
const toolStore = ToolStore.create({
  list: [{
    name: 'Box',
    icon: 'tool'
  }],
  current: 'Box'
});

const store = {
  map: mapStore,
  feature: featureStore,
  tool: toolStore,
}

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>
, document.getElementById('root'));