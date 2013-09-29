define(["models/LastArticle"],function(LastArticleModel){
	
	describe('Tests for LastArticleModel', function() {
		var lastArticle = new LastArticleModel();

		it("-Should be correctly defined", function(){
        	expect(lastArticle).toBeDefined();
    	});
	});

});