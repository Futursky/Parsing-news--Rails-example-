define(["models/Article"],function(ArticleModel){
	
	describe('Tests for ArticleModel', function() {
		var article = new ArticleModel();

		it("-Should be correctly defined", function(){
        	expect(article).toBeDefined();
    	});
	});

});