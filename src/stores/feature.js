import { types } from 'mobx-state-tree';
import { getFeatureByUid } from '../utils';

const Attribute = types.model({
  key: 'key',
  value: 'value'
});

const FeatureStore = types
  .model('FeatureStore', {
    uid: types.number, // openlayers uid
    type: types.string,
    attributes: types.array(Attribute),
    properties: types.array(Attribute) // custom attributes set by feature.set()
  })
  .actions(self => {
    function selectFeature({ uid, type, attributes, properties }) {
      self.uid = uid;
      self.type = type;
      self.attributes = attributes;
      self.properties = properties;
    }

    function deselectFeature() {
      self.uid = -1;
      self.type = '';
      self.attributes = [];
      self.properties = [];
    }

    function removeFeature() {
      if (self.uid !== -1) {
        const feature = getFeatureByUid(window._source, self.uid);
        window._source.removeFeature(feature);
        deselectFeature();
      }
    }

    function addProperty({ key, value }) {
      if (self.uid !== -1) {
        const feature = getFeatureByUid(window._source, self.uid);
        feature.set(key, value);
        self.properties.push({ key, value });
      }
    }

    function removeProperty(key) {
      if (self.uid !== -1) {
        const feature = getFeatureByUid(window._source, self.uid);
        feature.unset(key);
        self.properties.remove(self.properties.find(p => p.key === key));
      }
    }

    return {
      selectFeature,
      deselectFeature,
      removeFeature,
      addProperty,
      removeProperty
    };
  });

export default FeatureStore;