(function() {
  var __hasProp = {}.hasOwnProperty;

  define(['angel/lib/subscriber'], function(Subscriber) {
    'use strict';

    var Controller;
    Controller = (function() {

      function Controller() {}

      _.extend(Controller.prototype, Subscriber);

      Controller.prototype.view = null;

      Controller.prototype.currentId = null;

      Controller.prototype.contructor = function() {
        return this.initialize.apply(this, arguments);
      };

      Controller.prototype.initialize = function() {};

      Controller.prototype.disposed = false;

      Controller.prototype.dispose = function() {
        var obj, prop, properties, _i, _len;
        if (this.disposed) {
          return;
        }
        for (prop in this) {
          if (!__hasProp.call(this, prop)) continue;
          obj = this[prop];
          if (obj && typeof obj.dispose === 'function') {
            obj.dispose();
            delete this[prop];
          }
        }
        this.unsubscribeAllEvents();
        properties = ['currentId'];
        for (_i = 0, _len = properties.length; _i < _len; _i++) {
          prop = properties[_i];
          delete this[prop];
        }
        delete this.currentId;
        this.disposed = true;
        return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
      };

      return Controller;

    })();
    return Controller;
  });

}).call(this);
