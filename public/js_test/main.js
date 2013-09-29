require.config({
  paths: {
    'text': 'lib/text',
    'router': 'routers/router',
    'jquery': 'lib/jquery',
    'backbone': 'lib/backbone',
    'underscore': 'lib/underscore',
    'marionette': 'lib/backbone.marionette',
    'underscore.string': 'lib/underscore.string',
    'jqueryUI': 'lib/jquery-ui',
    'jasmine': 'lib/jasmine/lib/jasmine-1.3.1/jasmine',
    'jasmine-html': 'lib/jasmine/lib/jasmine-1.3.1/jasmine-html',
    'jasmine-jquery': 'lib/jasmine/lib/jasmine-1.3.1/jasmine-jquery',
    'jasmineStart': 'tests/jasmineStart'
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
    },
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ["jasmine"],
      exports: 'jasmine'
    },
    'jasmine-jquery': {
      deps: ["jasmine","jquery"],
      exports: 'jasmine'
    }
  }
});

require(
  [  
    "app",
    "jquery",
    "underscore",
    "backbone",  
    'jasmine-html',            
    "router",
    "underscore.string",
    "jasmine-jquery",
    "jasmineStart"
  ],
  function(   
    app, 
    $,
    _, 
    Backbone,
    jasmine
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