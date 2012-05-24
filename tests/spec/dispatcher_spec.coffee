define ['angel/dispatcher'], (Dispatcher) ->

    describe "Dispatcher Test suite", ->
        dispatcher = null

        beforeEach ->
            dispatcher = new Dispatcher

        afterEach ->
            dispatcher = null

        it "should be defined", ->
            expect(typeof Dispatcher).toBe 'function'

        it "should have pub/sub events", ->
            expect(typeof dispatcher.subscribeEvent).toBe 'function'
            expect(typeof dispatcher.unsubscribeEvent).toBe 'function'
            expect(typeof dispatcher.unsubscribeAllEvents).toBe 'function'
