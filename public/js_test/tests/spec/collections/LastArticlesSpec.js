define(["colections/LastArticles"],function(LastArticlesColection){
	describe('Tests for LastArticlesColection', function() {
        var lastArticles;
        
        beforeEach(function(){
            lastArticles = new LastArticlesColection();
        }); 
        
        it('-Can add Model instances as objects and arrays.', function() {
            expect(lastArticles.length).toBe(0);
            lastArticles.add({ content: 'lastArticles colection content' });
            expect(lastArticles.length).toBe(1);
            lastArticles.add([
                { content: 'lastArticles colection content', title: "lastArticles colection title"},
                { content: 'lastArticles colection content'}
            ]);
            expect(lastArticles.length).toBe(3);
        });

        it('-Can have a url property to define the basic url structure for all contained models.', function() {
            expect(lastArticles.url).toBe('/feeds/lastArticles');
        });
	});
});