define(["views/NotFoundPage", "colections/NotFoundPage"],
function(NotFoundPageCollectionView, NotFoundPageCollection){
	
	describe('Tests for NotFoundPageCollectionView', function() {
        var notFoundPageView;
        beforeEach(function() {            
            notFoundPageView = new NotFoundPageCollectionView({ });
            notFoundPageView.collection = {};
        });

        it("-Should be correctly defined", function(){
            expect(notFoundPageView).toBeDefined();
        });

        it('-Is backed by a collection instance', function(){
            expect(notFoundPageView.collection).toBeDefined();
        });

        it('-Must have itemView defined', function(){
            expect(notFoundPageView.itemView).toBeDefined();
        });

        it('-Should have tagName', function() {
           expect(notFoundPageView.el.tagName.toLowerCase()).toBe('div');          
        });
        
        it('-Should have itemView with class', function(){
            expect(new notFoundPageView.itemView().className).toBe('notFoundPageBox');
        });
    });

});