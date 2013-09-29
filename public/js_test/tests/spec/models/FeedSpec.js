define(["models/Feed"],function(FeedModel){
	
	describe('Tests for FeedModel', function() {
		var feed = new FeedModel();

		it("-Should be correctly defined", function(){
        	expect(feed).toBeDefined();
    	});
	});

});