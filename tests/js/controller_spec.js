(function() {

  define(['angel/controllers/controller'], function(Controller) {
    'use strict';
    return describe("Controller Base Class", function() {
      var controller;
      controller = null;
      beforeEach(function() {
        return controller = new Controller;
      });
      afterEach(function() {
        return controller = null;
      });
      it("should be able to be defined", function() {
        return expect(Controller).toBeDefined();
      });
      it("should have pub/sub events", function() {
        expect(typeof controller.subscribeEvent).toBe('function');
        expect(typeof controller.unsubscribeEvent).toBe('function');
        return expect(typeof controller.unsubscribeAllEvents).toBe('function');
      });
      it("should have a view property with it", function() {
        return expect(controller.view).toBe(null);
      });
      it("should have a constructor for the object", function() {
        return expect(typeof controller.constructor).toBe('function');
      });
      return it("should be able to dispose", function() {
        expect(controller.disposed).toBe(false);
        expect(typeof controller.dispose).toBe('function');
        controller.dispose();
        expect(controller.disposed).toBe(true);
        if (Object.isFrozen) {
          return expect(Object.isFrozen(controller)).toBe(true);
        }
      });
    });
  });

}).call(this);
