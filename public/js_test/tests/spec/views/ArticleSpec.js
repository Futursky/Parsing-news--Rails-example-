define(["views/Article"],function(ArticleCollectionView){
	
	describe('Tests for ArticleCollectionView', function() {
        var articleView;
        beforeEach(function() {            
            articleView = new ArticleCollectionView({ });
            articleView.collection = {};
        });

        it("-Should be correctly defined", function(){
            expect(articleView).toBeDefined();
        });

        it('-Should have backLink', function() {
            expect(articleView.backLink).toBe("<a href='/#'>Back</a>");           
        });

        it('-Is backed by a collection instance', function(){
            expect(articleView.collection).toBeDefined();
        });
        it('-Should have tagName', function() {
           expect(articleView.el.tagName.toLowerCase()).toBe('div');          
        });

        it('-Must have itemView defined', function(){
            expect(articleView.itemView).toBeDefined();
        });
    });

});