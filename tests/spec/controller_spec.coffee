define ['angel/controllers/controller'], (Controller) ->
    'use strict'

    describe "Controller Base Class", ->

        controller = null

        beforeEach ->
            controller = new Controller

        afterEach ->
            controller = null


        it "should be able to be defined", ->
            expect(Controller).toBeDefined()

        it "should have pub/sub events", ->
            expect(typeof controller.subscribeEvent).toBe 'function'
            expect(typeof controller.unsubscribeEvent).toBe 'function'
            expect(typeof controller.unsubscribeAllEvents).toBe 'function'

        it "should have a view property with it", ->
            expect(controller.view).toBe null

        it "should have a constructor for the object", ->
            expect(typeof controller.constructor).toBe 'function'

        it "should be able to dispose", ->
            expect(controller.disposed).toBe false
            # once we have checked this we should be able to call dispose function
            expect(typeof controller.dispose).toBe 'function'
            controller.dispose()
            # check for clean disposed
            expect(controller.disposed).toBe true
            if Object.isFrozen
                expect(Object.isFrozen(controller)).toBe true
