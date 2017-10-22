import { types } from 'mobx-state-tree';

const MapStore = types
  .model('MapStore', {
    source: types.string,
    zoom: types.number,
    center: types.array(types.number)
  })
  .actions(self => {
    function changeSource(source) {
      self.source = source;
    }

    function changeZoom(zoom) {
      self.zoom = zoom;
    }

    function changeCenter(center) {
      self.center = center;
    }

    return {
      changeSource,
      changeZoom,
      changeCenter
    };
  });

export default MapStore;