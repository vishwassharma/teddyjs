(function() {

  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Application;
    Application = (function() {

      Application.prototype.router = null;

      function Application() {
        this.initialize();
      }

      return Application;

    })();
    return Application;
  });

}).call(this);
