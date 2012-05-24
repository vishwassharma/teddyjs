define ['angel/mediator', 'angel/lib/router', 'angel/lib/route'] , (mediator, Router, Route) ->
    describe "Routes and Router", ->

        router = route = params = null

        matchRoute = (_route, _params) ->
            route = _route
            params = _params

        beforeEach ->
            router = new Router root : '/test/'
            mediator.subscribe 'matchRoute', matchRoute

        afterEach ->
            router = null

        it "router should be defined", ->
            expect(typeof router).toBe 'object'

        it "should have prototype inheritance of subscriber", ->
            expect(typeof router.subscribeEvent).toBe 'function'
            expect(typeof router.unsubscribeEvent).toBe 'function'
            expect(typeof router.unsubscribeAllEvents).toBe 'function'

        it "should have a instance of Backbone.History", ->
            expect(Backbone.history instanceof Backbone.History).toBe true

        it "should not start history instance at once", ->
            expect(Backbone.History.started).toBe false


        it "should trigger a matchRoute event", ->
            spy = jasmine.createSpy()
            mediator.subscribe 'matchRoute', spy
            # create a route table
            router.match '', 'x#y'
            # go to the following route
            router.route '/'
            expect(spy).toHaveBeenCalled()
            # after testing unsubscribe this event
            mediator.unsubscribe 'matchRoute', spy


        it "should match correctly", ->
            spy = jasmine.createSpy()
            mediator.subscribe 'matchRoute', spy
            router.match 'correct-match1', 'null#null'
            router.match 'correct-match2', 'null#null'

            routed = router.route '/correct-match1'
            expect(routed).toBe true
            expect(spy.calls.length).toBe 1

            mediator.unsubscribe 'matchRoute', spy

        it "should pass the route to the route match handler", ->
            router.match 'passing-the-route', 'null#null'
            router.route '/passing-the-route'
            expect(route instanceof Route).toBe true

        it "should provide controller name and action", ->
            router.match 'controller/action', 'controller#action'
            router.route '/controller/action'
            expect(route.controller).toBe 'controller'
            expect(route.action).toBe 'action'

        it "should extract URL parameters", ->
            router.match 'params/:one/:p_two_123/three', 'null#null'
            router.route '/params/123-foo/456-bar/three'
            expect(typeof params).toBe 'object'
            expect(params.one).toBe '123-foo'
            expect(params.p_two_123).toBe '456-bar'

        it "should expect regular express as pattern", ->

            router.match /^(\w+)\/(\w+)\/(\w+)$/, 'null#null'
            router.route '/raw/regular/express'
            expect(params[0]).toBe 'raw'
            expect(params[1]).toBe 'regular'
            expect(params[2]).toBe 'express'

        it "should impose constraint", ->
            spy = jasmine.createSpy()
            mediator.subscribe 'matchRoute', spy

            router.match 'constraint/:id', 'null#null',
                constraints :
                    id : /^\d+$/
            router.route '/constraint/12-bas'
            expect(spy).not.toHaveBeenCalled()

            router.route '/constraint/12'
            expect(spy).toHaveBeenCalled()

            mediator.unsubscribe 'matchRoute', spy

        it "should pass extra params to they function", ->
            router.match 'fixed-params/:id', 'null#null',
                params :
                    foo : 'bar'

            router.route '/fixed-params/10'
            expect(params.id).toBe '10'
            expect(params.foo).toBe 'bar'

        it "should not overwrite fixed parameters", ->
            router.match 'conflict/:foo', 'null#null',
                params:
                    foo : 'bar'

            router.route '/conflict/12359'
            expect(params.foo).toBe 'bar'

        it 'should pass query string parameters', ->
            router.match 'query-string', 'null#null'

            input =
                foo : '123 456',
                'b a r': 'the _quick &brown föx= jumps over the lazy dáwg',
                'q&uu=x': 'the _quick &brown föx= jumps over the lazy dáwg'

            queryString = _.reduce input, ((memo, val, prop) ->
                memo + (if memo is '?' then '' else '&') + encodeURIComponent(prop) + '=' + encodeURIComponent(val)), '?'

            router.route "/query-string#{queryString}"
            expect(params.foo).toBe input.foo
            expect(params.bar).toBe input.bar
            expect(params['q&uu=x']).toBe input['q&uu=x']

        it "should listen to !router:route events", ->
            path = 'path-to-listen'
            spyOn(router, 'route').andCallThrough()
            spy = jasmine.createSpy()
            
            router.match path, 'router#path'

            mediator.publish '!router:route', path, spy
            expect(router.route).toHaveBeenCalledWith path
            expect(spy).toHaveBeenCalledWith true
            expect(route.controller).toBe 'router'
            expect(route.action).toBe 'path'

            # Because this path is not defined it will not be called :)
            spy = jasmine.createSpy()
            mediator.publish '!router:route', 'different-path', spy
            expect(spy).toHaveBeenCalledWith false

        it "should listen to the !router:changeURL events", ->
            path = 'router-changeurl-events'
            spyOn(router, 'changeURL').andCallThrough()

            mediator.publish '!router:changeURL', path
            expect(router.changeURL).toHaveBeenCalledWith path

        it "should allow us to start the backbone History", ->
            spy = spyOn(Backbone.history, 'start').andCallThrough()
            expect(typeof router.startHistory).toBe 'function'
            router.startHistory()
            expect(Backbone.History.started).toBe true
            expect(spy).toHaveBeenCalled()

        it "should default to pushState", ->
            expect(typeof router.options).toBe 'object'
            expect(Backbone.history.options.pushState).toBe router.options.pushState

        it "should pass options to Backbone.History instance", ->
            expect(Backbone.history.options.root).toBe '/test/'

        it "should allow to stop the backbone history", ->
            spy = spyOn(Backbone.history, 'stop').andCallThrough()
            expect(typeof router.stopHistory).toBe 'function'
            router.stopHistory()
            expect(Backbone.History.started).toBe false
            expect(spy).toHaveBeenCalled()

        it "should be disposable", ->
            expect(typeof router.dispose).toBe 'function'
            router.dispose()

            expect(Backbone.history).toBe undefined

            expect(->
                router.match '', 'x#y'
            ).toThrow()

            expect(->
                router.route '/'
            ).toThrow()
            
            expect(router.disposed).toBe true
            if Object.isFrozen
                expect(Object.isFrozen(router)).toBe true
