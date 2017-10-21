import { types } from 'mobx-state-tree';

const Attribute = types.model({
  key: '属性名',
  value: '属性值'
});

const FeatureStore = types.model(
  'FeatureStore',
  {
    type: types.string,
    attributes: types.array(Attribute),
  },
  {
    addAttribute({ key, value }) {
      this.attributes.push({
        key, 
        value,
      });
    },
    removeAttribute(key) {
      this.attributes.remove(this.attributes.find(attr => attr.key = key));
    },
    editAttribute({ key, value }) {
      this.attributes.find(attr => attr.key = key).value = value;
    }
  }
);

export default FeatureStore;