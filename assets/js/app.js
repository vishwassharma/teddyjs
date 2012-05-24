(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var AppRouter, Application;
    AppRouter = (function(_super) {

      __extends(AppRouter, _super);

      function AppRouter() {
        return AppRouter.__super__.constructor.apply(this, arguments);
      }

      AppRouter.prototype.routes = {
        "/": "main"
      };

      AppRouter.prototype.main = function() {
        return console.log("main");
      };

      return AppRouter;

    })(Backbone.Router);
    Application = (function() {

      Application.prototype.router = null;

      function Application() {
        this.initialize();
      }

      Application.prototype.initialize = function() {
        return this.initializeRouter();
      };

      Application.prototype.initializeRouter = function() {
        this.router = new AppRouter;
        console.log(this.router);
        Backbone.history.start();
        return this.router.navigate('/');
      };

      return Application;

    })();
    return Application;
  });

}).call(this);
