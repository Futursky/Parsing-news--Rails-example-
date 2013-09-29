define(["models/Breadcrumbs"],function(BreadcrumbsModel){
	
	describe('Tests for BreadcrumbsModel', function() {
		var breadcrumbs = new BreadcrumbsModel();

		it("-Should be correctly defined", function(){
        	expect(breadcrumbs).toBeDefined();
    	});
	});

});