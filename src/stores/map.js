import { types } from 'mobx-state-tree';

const MapStore = types.model(
  'MapStore',
  {
    source: types.string,
    zoom: types.number,
    centerX: types.number,
    centerY: types.number,
  },
  {
    changeSource(source) {
      this.source = source;
    },
    changeZoom(zoom) {
      this.zoom = zoom;
    },
    changeCenter(x, y) {
      this.centerX = x;
      this.centerY = y;
    }
  }
);

export default MapStore;