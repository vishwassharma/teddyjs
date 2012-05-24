(function() {

  define(['angel/lib/support', 'angel/lib/utils'], function(support, utils) {
    'use strict';

    var mediator;
    mediator = {};
    mediator.subscribe = mediator.on = Backbone.Events.on;
    mediator.publish = mediator.trigger = Backbone.Events.trigger;
    mediator.unsubscribe = mediator.off = Backbone.Events.off;
    utils.readonly(mediator, 'subscribe', 'publish', 'unsubscribe', 'on', 'off', 'trigger');
    return mediator;
  });

}).call(this);
