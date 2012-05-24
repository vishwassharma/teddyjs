(function() {

  define(['angel/lib/support', 'angel/mediator'], function(support, mediator) {
    return describe("Mediator", function() {
      it("should be a simple object", function() {
        return expect(typeof mediator).toBe('object');
      });
      it("should have pub/sub methods", function() {
        expect(typeof mediator.subscribe).toBe('function');
        expect(typeof mediator.publish).toBe('function');
        return expect(typeof mediator.unsubscribe).toBe('function');
      });
      it("should have read only pub/sub methods", function() {
        var methods;
        if (!(support.propertyDescriptors && Object.getOwnPropertyDescriptor)) {
          return;
        }
        methods = ['subscribe', 'publish', 'unsubscribe', 'on', 'off', 'trigger'];
        return _.each(methods, function(property) {
          var desc;
          desc = Object.getOwnPropertyDescriptor(mediator, property);
          expect(desc.writable).toBe(false);
          expect(desc.enumerable).toBe(true);
          return expect(desc.configurable).toBe(false);
        });
      });
      it("should publish messages to subscriber", function() {
        var eventName, payload, spy;
        spy = jasmine.createSpy();
        eventName = 'foo';
        payload = 'payload';
        mediator.subscribe(eventName, spy);
        mediator.publish(eventName, payload);
        expect(spy).toHaveBeenCalledWith(payload);
        return mediator.unsubscribe(eventName, spy);
      });
      return it("should be able to unsubscribe to events", function() {
        var eventName, payload, spy;
        spy = jasmine.createSpy();
        eventName = 'foo';
        payload = 'payload';
        mediator.subscribe(eventName, spy);
        mediator.unsubscribe(eventName, spy);
        mediator.publish(eventName, payload);
        return expect(spy).not.toHaveBeenCalledWith(payload);
      });
    });
  });

}).call(this);
