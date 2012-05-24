(function() {

  define(['angel/mediator', 'angel/lib/subscriber'], function(mediator, Subscriber) {
    var Dispatcher;
    Dispatcher = (function() {

      _.extend(Dispatcher.prototype, Subscriber);

      function Dispatcher() {
        this.initialize;
      }

      return Dispatcher;

    })();
    return Dispatcher;
  });

}).call(this);
