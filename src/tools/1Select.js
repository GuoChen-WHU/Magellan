import Select from 'ol/interaction/select';
import { getDistance } from '../utils';

const SelectTool = {
  name: 'Select',
  icon: 'tool',
  onSelect: function(map, source, featureStore) {
    return function() {
      this.select = new Select();
      map.addInteraction(this.select);

      // Modify feature store to update ui
      this.select.on('select', function(e) {
        const feature = e.target.getFeatures().item(0);
        if (feature) {
          const type = feature.getGeometryName();
          featureStore.changeType(type);
          featureStore.clearAttributes();
          switch (type) {
            case 'Box': {
              const coors = feature.getGeometry().getCoordinates();
              const width = getDistance(coors[0][0], coors[0][1]);
              const height = getDistance(coors[0][1], coors[0][2]);
              featureStore.addAttribute({
                key: 'width',
                value: '' + width
              });
              featureStore.addAttribute({
                key: 'height',
                value: '' + height
              });
              featureStore.addAttribute({
                key: 'area',
                value: '' + feature.getGeometry().getArea()
              });
              break;
            }
          
            default:
              break;
          }
        }
      });
    };
  },
  onDeselect: function(map) {
    return function() {
      map.removeInteraction(this.select);
    };
  }
};

export default SelectTool;