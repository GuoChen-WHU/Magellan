import React, { Component } from 'react';
import { inject } from 'mobx-react';

import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import OSM from 'ol/source/osm';
import Vector from 'ol/source/vector';
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';

import 'ol/ol.css';
import './Map.less';

@inject('map')
class MapComponent extends Component {
  componentDidMount() {
    const { map } = this.props;

    // 初始化map
    const raster = new TileLayer({
      source: new OSM()
    });

    // 矢量图层的source作为全局变量，供工具栏组件使用
    const source = window._source = new Vector();
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });

    const view = new View({
      center: map.center,
      zoom: map.zoom
    });

    // map实例作为全局变量，供工具栏组件使用
    this.map = window._map = new Map({
      layers: [raster, vector],
      target: 'map',
      view
    });

    view.on('change:resolution', e => {
      map.changeZoom(view.getZoomForResolution(e.target.get(e.key)));
    });
    view.on('change:center', e => {
      map.changeCenter(e.target.get(e.key));
    });
  }

  render() {
    return <div id="map"></div>;
  }
}

export default MapComponent;