(function() {

  define(['underscore', 'backbone', 'angel/libs/support', 'angel/lib/utils'], function(_, Backbone, support, utils) {
    'use strict';

    var mediator;
    mediator = {};
    mediator.subscribe = mediator.on = Backbone.Events.on;
    mediator.unsubscribe = mediator.off = Backbone.Events.off;
    mediator.publish = mediator.trigger = Backbone.Events.trigger;
    mediator._callbacks = null;
    utils.readonly(mediator, 'subscribe', 'unsubscribe', 'publish', 'on', 'off', 'trigger');
    mediator.seal = function() {
      if (support.propertyDescriptors && Object.seal) {
        return Object.seal(mediator);
      }
    };
    utils.readonly(mediator, 'seal');
    return mediator;
  });

}).call(this);
