define(["views/Breadcrumbs"],function(BreadcrumbsCollectionView){
	
	describe('Tests for BreadcrumbsCollectionView', function() {
        var breadcrumbsView;
        beforeEach(function() {            
            breadcrumbsView = new BreadcrumbsCollectionView({ });
            breadcrumbsView.collection = {};
        });

        it("-Should be correctly defined", function(){
            expect(breadcrumbsView).toBeDefined();
        });

        it('-Should have tagName', function() {
            expect(breadcrumbsView.el.tagName.toLowerCase()).toBe('div');          
        });

        it('-Is backed by a collection instance', function(){
            expect(breadcrumbsView.collection).toBeDefined();
        });

        it('-Must have itemView defined', function(){
            expect(breadcrumbsView.itemView).toBeDefined();
        });
    });

});