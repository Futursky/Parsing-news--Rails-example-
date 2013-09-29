define(["models/SingleArticle"],function(SingleArticleModel){
	
	describe('Tests for SingleArticleModel', function() {
		var singleArticle = new SingleArticleModel();

		it("-Should be correctly defined", function(){
        	expect(singleArticle).toBeDefined();
    	});
	});

});