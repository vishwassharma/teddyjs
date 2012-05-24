(function() {

  define(['angel/dispatcher'], function(Dispatcher) {
    return describe("Dispatcher Test suite", function() {
      var dispatcher;
      dispatcher = null;
      beforeEach(function() {
        return dispatcher = new Dispatcher;
      });
      afterEach(function() {
        return dispatcher = null;
      });
      it("should be defined", function() {
        return expect(typeof Dispatcher).toBe('function');
      });
      return it("should have pub/sub events", function() {
        expect(typeof dispatcher.subscribeEvent).toBe('function');
        expect(typeof dispatcher.unsubscribeEvent).toBe('function');
        return expect(typeof dispatcher.unsubscribeAllEvents).toBe('function');
      });
    });
  });

}).call(this);
