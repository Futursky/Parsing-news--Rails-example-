define(["views/Menu"],function(MenuCollectionView){
	
	describe('Tests for MenuCollectionView', function() {
        var menuView;
        beforeEach(function() {                        
            $("body").append("<div class='menu_box'><ul></ul></div>");
            menuView = new MenuCollectionView({ });
            menuView.collection = {};
        });

        it("-Should be correctly defined", function(){
            expect(menuView).toBeDefined();
        });

        it('-Is backed by a collection instance', function(){
            expect(menuView.collection).toBeDefined();
        });
        it('-Should have el', function() {
            expect($(".menu_box ul")).toBe('ul');          
        });

        it('-Must have itemView defined', function(){
            expect(menuView.itemView).toBeDefined();
        });

        afterEach(function() {                        
            menuView.remove();
            $(".menu_box ul").remove();
        });
    });

});