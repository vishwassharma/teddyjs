require.config
    paths :
        jquery : 'libs/jquery/jquery-min'
        underscore : 'libs/underscore/underscore'
        backbone : 'libs/backbone/backbone'
        text : 'libs/require/text'

require ['app'], (AppView) ->

    application = new AppView
