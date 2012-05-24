(function() {

  require.config({
    paths: {
      jquery: 'libs/jquery/jquery-min',
      underscore: 'libs/underscore/underscore',
      backbone: 'libs/backbone/backbone',
      text: 'libs/require/text'
    }
  });

  require(['app'], function(AppView) {
    var application;
    return application = new AppView;
  });

}).call(this);
