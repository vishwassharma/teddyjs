define ['jquery', 'underscore', 'backbone', 'app/application'], ($, _, Backbone, Application) ->

    describe "Application", ->

        application  = null

        beforeEach ->
            application = new Application
        
        it "should be defined", ->
            expect(typeof Application).toBe 'function'

        it "should have a router object", ->
            expect(application.router).toBeDefined()

