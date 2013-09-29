require.config({
  paths: {
    'text': 'lib/text',
    'router': 'routers/router',
    'jquery': 'lib/jquery',
    'backbone': 'lib/backbone',
    'underscore': 'lib/underscore',
    'marionette': 'lib/backbone.marionette',
    'underscore.string': 'lib/underscore.string',
    'jqueryUI': 'lib/jquery-ui'
  },
  shim: {
    'underscore': {
      deps: ['underscore.string'],
      exports: '_',
      init: function(UnderscoreString) {
        _.mixin(UnderscoreString);
      }
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    'marionette': {
      deps: ["backbone"]     
    }
  }
});

require(
  [  
    "app",
    "jquery",
    "underscore",
    "backbone",              
    "views/Search",
    "router",
    "underscore.string"

  ],
  function(   
    app, 
    $,
    _, 
    Backbone
  )
  {
    $(function() { 
        app.start({
            feeds: app.feeds,
            articles: app.articles,
            singleArticle: app.singleArticle,
            breadcrumbs: app.breadcrumbs,
            lastArticles: app.lastArticles,
            notFoundPage: app.notFoundPage
        });

    });
  }
);