define(["colections/Feeds"],function(FeedCollection){
	
	describe('Tests for FeedsCollection', function() {
        var feeds;
        
        beforeEach(function(){
            feeds = new FeedCollection();
        }); 
       
        it('-Can add Model instances as objects and arrays.', function() {
            expect(feeds.length).toBe(0);
            feeds.add({ content: 'feeds colection content' });
            expect(feeds.length).toBe(1);
            feeds.add([
                { content: 'feeds colection content', title: "feeds colection title"},
                { content: 'feeds colection content'}
            ]);
            expect(feeds.length).toBe(3);
        });

        it('-Can have a url property to define the basic url structure for all contained models.', function() {
            expect(feeds.url).toBe('/feeds');
        });

	});
});