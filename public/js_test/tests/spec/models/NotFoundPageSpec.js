define(["models/NotFoundPage"],function(NotFoundPageModel){
	
	describe('Tests for NotFoundPageModel', function() {
		var notFoundPage = new NotFoundPageModel();

		it("-Should be correctly defined", function(){
        	expect(notFoundPage).toBeDefined();
    	});

   		it('-Can be created with default values for it attribute text.', function() {
   	 		expect(notFoundPage.get('text')).toBe("The page you were looking for doesn't exist!");
		});

		it('-Can be created with default values for it attribute title.', function() {
   	 		expect(notFoundPage.get('title')).toBe('Wrong address');
    	});

	});

});