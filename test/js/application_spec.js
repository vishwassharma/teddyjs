(function() {

  define(['jquery', 'underscore', 'backbone', 'app/application'], function($, _, Backbone, Application) {
    return describe("Application", function() {
      var application;
      application = null;
      beforeEach(function() {
        return application = new Application;
      });
      it("should be defined", function() {
        return expect(typeof Application).toBe('function');
      });
      return it("should have a router object", function() {
        return expect(application.router).toBeDefined();
      });
    });
  });

}).call(this);
