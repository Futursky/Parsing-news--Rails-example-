define(["jasmine-html"],function(){
	  var jasmineEnv = jasmine.getEnv();
	  jasmineEnv.updateInterval = 1000;
	 
	  var htmlReporter = new jasmine.HtmlReporter();
	 
	  jasmineEnv.addReporter(htmlReporter);
	 
	  jasmineEnv.specFilter = function(spec) {
	    return htmlReporter.specFilter(spec);
	  };
	 
	  var specs = [];
	  
	  specs.push('tests/spec/models/FeedSpec');
	  specs.push('tests/spec/models/ArticleSpec');
	  specs.push('tests/spec/models/LastArticleSpec');
	  specs.push('tests/spec/models/BreadcrumbsSpec');
	  specs.push('tests/spec/models/NotFoundPageSpec');
	  specs.push('tests/spec/models/SingleArticleSpec');

 	  specs.push('tests/spec/collections/BreadcrumbsSpec');
	  specs.push('tests/spec/collections/ArticlesSpec');
	  specs.push('tests/spec/collections/FeedsSpec');
	  specs.push('tests/spec/collections/LastArticlesSpec');
	  specs.push('tests/spec/collections/NotFoundPageSpec');
	  specs.push('tests/spec/collections/SingleArticlesSpec');


	  specs.push('tests/spec/views/ArticleSpec');
	  specs.push('tests/spec/views/LastArticlesSpec');
	  specs.push('tests/spec/views/NotFoundPageSpec');
	  specs.push('tests/spec/views/BreadcrumbsSpec');
	  specs.push('tests/spec/views/MenuSpec');
	  	
	 
	  require(specs, function(){
	    
	    jasmineEnv.execute();
	    	 	
	  });
});