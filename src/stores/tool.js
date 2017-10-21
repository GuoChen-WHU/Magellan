import { types } from 'mobx-state-tree';

const Tool = types.model({
  name: '工具',
  icon: 'tool',
})

const ToolStore = types.model(
  'ToolStore',
  {
    list: types.array(Tool),
    current: types.string,
  },
  {
    changeCurrent(name) {
      this.current = name;
    }
  }
);

export default ToolStore;