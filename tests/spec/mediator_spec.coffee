define ['angel/lib/support','angel/mediator'], (support, mediator) ->

    describe "Mediator" , ->

        it "should be a simple object", ->
            expect(typeof mediator).toBe 'object'

        it "should have pub/sub methods", ->
            expect(typeof mediator.subscribe).toBe 'function'
            expect(typeof mediator.publish).toBe 'function'
            expect(typeof mediator.unsubscribe).toBe 'function'

        it "should have read only pub/sub methods", ->
            return unless support.propertyDescriptors and Object.getOwnPropertyDescriptor
            methods = ['subscribe','publish','unsubscribe','on','off','trigger']
            _.each methods, (property) ->
                desc = Object.getOwnPropertyDescriptor mediator, property
                expect(desc.writable).toBe false
                expect(desc.enumerable).toBe true
                expect(desc.configurable).toBe false


        it "should publish messages to subscriber", ->
            # create a spy to catch triggers
            spy = jasmine.createSpy()
            eventName = 'foo'
            payload = 'payload'

            # create pub / sub
            mediator.subscribe eventName , spy
            mediator.publish eventName, payload
            
            # expect spy to catch the payload
            expect(spy).toHaveBeenCalledWith payload
            mediator.unsubscribe eventName, spy


        it "should be able to unsubscribe to events", ->
            spy = jasmine.createSpy()
            eventName = 'foo'
            payload = 'payload'

            # create a subscriber
            mediator.subscribe eventName, spy
            # unsubscribe events
            mediator.unsubscribe eventName, spy
            # trigger the event again and this time spy should not run
            mediator.publish eventName, payload
            expect(spy).not.toHaveBeenCalledWith payload
