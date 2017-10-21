const BoxTool = {
  name: 'Box',
  icon: 'tool',
  onSelect: function(map, source) {
    return function() {
      this.draw = new ol.interaction.Draw({
        source,
        type: 'Circle',
        geometryFunction: ol.interaction.Draw.createBox()
      });
      map.addInteraction(draw);
      this.snap = new ol.interaction.Snap({ source });
      map.addInteraction(snap);
    }
  },
  onDeselect: function(map, source) {
    return function() {
      map.removeInteraction(this.draw);
      map.removeInteraction(this.snap);
    }
  }
};

export default BoxTool;