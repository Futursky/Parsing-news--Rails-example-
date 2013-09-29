define(["views/LastArticles", "colections/LastArticles"],function(LastArticlesCollectionView, LastArticlesCollection){
	
	describe('Tests for LastArticlesCollectionView', function() {
        var lastArticleView;
        beforeEach(function() {            
            lastArticleView = new LastArticlesCollectionView({});
            lastArticleView.collection = {};
        });

        it("-Should be correctly defined", function(){
            expect(lastArticleView).toBeDefined();
        });

        it('-Is backed by a collection instance', function(){
            expect(lastArticleView.collection).toBeDefined();
        });
        
        it('-Should have tagName', function() {
           expect(lastArticleView.el.tagName.toLowerCase()).toBe('div');          
        });

        it('-Must have itemView defined', function(){
            expect(lastArticleView.itemView).toBeDefined();
        });
    });

});