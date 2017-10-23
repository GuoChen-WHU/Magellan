import Select from 'ol/interaction/select';
import omit from 'lodash.omit';
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
          const uid = feature.ol_uid;

          let attributes = [];
          let properties = [];
          switch (type) {
            case 'Box': {
              const coors = feature.getGeometry().getCoordinates();
              const width = getDistance(coors[0][0], coors[0][1]);
              const height = getDistance(coors[0][1], coors[0][2]);
              attributes.push({
                key: 'width',
                value: '' + width
              });
              attributes.push({
                key: 'height',
                value: '' + height
              });
              attributes.push({
                key: 'area',
                value: '' + feature.getGeometry().getArea()
              });

              const objProps = omit(feature.getProperties(), ['Box']);
              for (let key in objProps) {
                if (objProps.hasOwnProperty(key)) {
                  properties.push({ key, value: objProps[key] });
                }
              }
              break;
            }
          
            default:
              break;
          }

          featureStore.selectFeature({ uid, type, attributes, properties });
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