(function() {

  define(['angel/mediator', 'angel/lib/router', 'angel/lib/route'], function(mediator, Router, Route) {
    return describe("Routes and Router", function() {
      var matchRoute, params, route, router;
      router = route = params = null;
      matchRoute = function(_route, _params) {
        route = _route;
        return params = _params;
      };
      beforeEach(function() {
        router = new Router({
          root: '/test/'
        });
        return mediator.subscribe('matchRoute', matchRoute);
      });
      afterEach(function() {
        return router = null;
      });
      it("router should be defined", function() {
        return expect(typeof router).toBe('object');
      });
      it("should have prototype inheritance of subscriber", function() {
        expect(typeof router.subscribeEvent).toBe('function');
        expect(typeof router.unsubscribeEvent).toBe('function');
        return expect(typeof router.unsubscribeAllEvents).toBe('function');
      });
      it("should have a instance of Backbone.History", function() {
        return expect(Backbone.history instanceof Backbone.History).toBe(true);
      });
      it("should not start history instance at once", function() {
        return expect(Backbone.History.started).toBe(false);
      });
      it("should trigger a matchRoute event", function() {
        var spy;
        spy = jasmine.createSpy();
        mediator.subscribe('matchRoute', spy);
        router.match('', 'x#y');
        router.route('/');
        expect(spy).toHaveBeenCalled();
        return mediator.unsubscribe('matchRoute', spy);
      });
      it("should match correctly", function() {
        var routed, spy;
        spy = jasmine.createSpy();
        mediator.subscribe('matchRoute', spy);
        router.match('correct-match1', 'null#null');
        router.match('correct-match2', 'null#null');
        routed = router.route('/correct-match1');
        expect(routed).toBe(true);
        expect(spy.calls.length).toBe(1);
        return mediator.unsubscribe('matchRoute', spy);
      });
      it("should pass the route to the route match handler", function() {
        router.match('passing-the-route', 'null#null');
        router.route('/passing-the-route');
        return expect(route instanceof Route).toBe(true);
      });
      it("should provide controller name and action", function() {
        router.match('controller/action', 'controller#action');
        router.route('/controller/action');
        expect(route.controller).toBe('controller');
        return expect(route.action).toBe('action');
      });
      it("should extract URL parameters", function() {
        router.match('params/:one/:p_two_123/three', 'null#null');
        router.route('/params/123-foo/456-bar/three');
        expect(typeof params).toBe('object');
        expect(params.one).toBe('123-foo');
        return expect(params.p_two_123).toBe('456-bar');
      });
      it("should expect regular express as pattern", function() {
        router.match(/^(\w+)\/(\w+)\/(\w+)$/, 'null#null');
        router.route('/raw/regular/express');
        expect(params[0]).toBe('raw');
        expect(params[1]).toBe('regular');
        return expect(params[2]).toBe('express');
      });
      it("should impose constraint", function() {
        var spy;
        spy = jasmine.createSpy();
        mediator.subscribe('matchRoute', spy);
        router.match('constraint/:id', 'null#null', {
          constraints: {
            id: /^\d+$/
          }
        });
        router.route('/constraint/12-bas');
        expect(spy).not.toHaveBeenCalled();
        router.route('/constraint/12');
        expect(spy).toHaveBeenCalled();
        return mediator.unsubscribe('matchRoute', spy);
      });
      it("should pass extra params to they function", function() {
        router.match('fixed-params/:id', 'null#null', {
          params: {
            foo: 'bar'
          }
        });
        router.route('/fixed-params/10');
        expect(params.id).toBe('10');
        return expect(params.foo).toBe('bar');
      });
      it("should not overwrite fixed parameters", function() {
        router.match('conflict/:foo', 'null#null', {
          params: {
            foo: 'bar'
          }
        });
        router.route('/conflict/12359');
        return expect(params.foo).toBe('bar');
      });
      it('should pass query string parameters', function() {
        var input, queryString;
        router.match('query-string', 'null#null');
        input = {
          foo: '123 456',
          'b a r': 'the _quick &brown föx= jumps over the lazy dáwg',
          'q&uu=x': 'the _quick &brown föx= jumps over the lazy dáwg'
        };
        queryString = _.reduce(input, (function(memo, val, prop) {
          return memo + (memo === '?' ? '' : '&') + encodeURIComponent(prop) + '=' + encodeURIComponent(val);
        }), '?');
        router.route("/query-string" + queryString);
        expect(params.foo).toBe(input.foo);
        expect(params.bar).toBe(input.bar);
        return expect(params['q&uu=x']).toBe(input['q&uu=x']);
      });
      it("should listen to !router:route events", function() {
        var path, spy;
        path = 'path-to-listen';
        spyOn(router, 'route').andCallThrough();
        spy = jasmine.createSpy();
        router.match(path, 'router#path');
        mediator.publish('!router:route', path, spy);
        expect(router.route).toHaveBeenCalledWith(path);
        expect(spy).toHaveBeenCalledWith(true);
        expect(route.controller).toBe('router');
        expect(route.action).toBe('path');
        spy = jasmine.createSpy();
        mediator.publish('!router:route', 'different-path', spy);
        return expect(spy).toHaveBeenCalledWith(false);
      });
      it("should listen to the !router:changeURL events", function() {
        var path;
        path = 'router-changeurl-events';
        spyOn(router, 'changeURL').andCallThrough();
        mediator.publish('!router:changeURL', path);
        return expect(router.changeURL).toHaveBeenCalledWith(path);
      });
      it("should allow us to start the backbone History", function() {
        var spy;
        spy = spyOn(Backbone.history, 'start').andCallThrough();
        expect(typeof router.startHistory).toBe('function');
        router.startHistory();
        expect(Backbone.History.started).toBe(true);
        return expect(spy).toHaveBeenCalled();
      });
      it("should default to pushState", function() {
        expect(typeof router.options).toBe('object');
        return expect(Backbone.history.options.pushState).toBe(router.options.pushState);
      });
      it("should pass options to Backbone.History instance", function() {
        return expect(Backbone.history.options.root).toBe('/test/');
      });
      it("should allow to stop the backbone history", function() {
        var spy;
        spy = spyOn(Backbone.history, 'stop').andCallThrough();
        expect(typeof router.stopHistory).toBe('function');
        router.stopHistory();
        expect(Backbone.History.started).toBe(false);
        return expect(spy).toHaveBeenCalled();
      });
      return it("should be disposable", function() {
        expect(typeof router.dispose).toBe('function');
        router.dispose();
        expect(Backbone.history).toBe(void 0);
        expect(function() {
          return router.match('', 'x#y');
        }).toThrow();
        expect(function() {
          return router.route('/');
        }).toThrow();
        expect(router.disposed).toBe(true);
        if (Object.isFrozen) {
          return expect(Object.isFrozen(router)).toBe(true);
        }
      });
    });
  });

}).call(this);
