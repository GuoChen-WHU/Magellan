import { types } from 'mobx-state-tree';

const Attribute = types.model({
  key: 'key',
  value: 'value'
});

const FeatureStore = types
  .model('FeatureStore', {
    uid: types.number, // openlayers uid
    type: types.string,
    attributes: types.array(Attribute)
  })
  .actions(self => {
    function selectFeature({ uid, type, attributes }) {
      self.uid = uid;
      self.type = type;
      self.attributes = attributes;
    }

    function deselectFeature() {
      self.uid = -1;
      self.type = '';
      self.attributes = [];
    }

    function changeType(type) {
      self.type = type;
    }

    function addAttribute({ key, value }) {
      self.attributes.push({
        key, 
        value
      });
    }

    function removeAttribute(key) {
      self.attributes
        .remove(self.attributes
          .find(attr => { 
            attr.key = key; 
          })
        );
    }

    function clearAttributes() {
      self.attributes = [];
    }
    
    function editAttribute({ key, value }) {
      self.attributes
        .find(attr => { 
          attr.key = key; 
        })
        .value = value;
    }

    return {
      selectFeature,
      deselectFeature,
      changeType,
      addAttribute,
      removeAttribute,
      clearAttributes,
      editAttribute
    };
  });

export default FeatureStore;