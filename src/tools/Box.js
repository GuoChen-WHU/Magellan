import Draw from 'ol/interaction/draw';
import Snap from 'ol/interaction/snap';

const BoxTool = {
  index: 1,
  name: 'Box',
  icon: 'plus-square-o',
  onSelect: function({ map, vecSource: source }) {
    return function() {
      this.draw = new Draw({
        source,
        type: 'Circle',
        geometryFunction: Draw.createBox(),
        geometryName: 'Box'
      });
      map.addInteraction(this.draw);
      this.snap = new Snap({ source });
      map.addInteraction(this.snap);
    };
  },
  onDeselect: function({ map }) {
    return function() {
      map.removeInteraction(this.draw);
      map.removeInteraction(this.snap);
    };
  }
};

export default BoxTool;