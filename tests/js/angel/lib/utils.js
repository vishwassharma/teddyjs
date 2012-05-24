(function() {
  var __slice = [].slice;

  define(['angel/lib/support'], function(support) {
    'use strict';

    var utils;
    utils = {
      readonly: (function() {
        var readOnlyDescriptor;
        if (support.propertyDescriptors) {
          readOnlyDescriptor = {
            writable: false,
            enumerable: true,
            configurable: false
          };
          return function() {
            var obj, prop, properties, _i, _len;
            obj = arguments[0], properties = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            for (_i = 0, _len = properties.length; _i < _len; _i++) {
              prop = properties[_i];
              Object.defineProperty(obj, prop, readOnlyDescriptor);
            }
            return true;
          };
        } else {
          return function() {
            return false;
          };
        }
      })()
    };
    return utils;
  });

}).call(this);
