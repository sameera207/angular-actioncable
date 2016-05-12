'use strict';

// default websocket configs
// looks for Rails' <%= action_cable_meta_tag %> in this format:
// <meta name="action-cable-url" content="ws://localhost:3000/cable"/>
ngActionCable.factory('ActionCableConfig', function() {
  var defaultWsUri= 'wss://please.add.an.actioncable.meta.tag.invalid:12345/path/to/cable';
  var _wsUri;
  var config= {
    autoStart: true,
    debug: false
  };
  Object.defineProperty(config, 'wsUri', {
    get: function () {
      _wsUri= _wsUri || actioncable_meta_tag_content() ||  defaultWsUri;
      return _wsUri;
    },
    set: function(newWsUri) {
      _wsUri= newWsUri;
      return _wsUri;
    }
  });
  return config;
  function actioncable_meta_tag_content() {
    return angular.element("meta[name='action-cable-url']").attr("content");
  }
});
