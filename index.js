//Defining our plugin
module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kibana-plugin-drilldownmenu',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: [
        'plugins/kibana-plugin-drilldownmenu/field_format/drill_down',
        'plugins/kibana-plugin-drilldownmenu/field_format_editor/drill_down',
      ],
      hacks: ['plugins/kibana-plugin-drilldownmenu/hack'],
    },
  });
};
