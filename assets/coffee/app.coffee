define [
    'jquery',
    'underscore',
    'backbone',
], ($, _, Backbone) ->

    class AppRouter extends Backbone.Router

        routes :
            "/" : "main"
        
        main : () ->
            console.log "main"
    
    class Application

        router : null

        constructor: () ->
            @initialize()

        initialize : () ->
            @initializeRouter()

        initializeRouter : () ->
            @router = new AppRouter
            console.log @router
            Backbone.history.start()
            @router.navigate '/'

    Application
