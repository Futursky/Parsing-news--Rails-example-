define(["colections/Articles"],function(ArticlesCollection){
	
	describe('Tests for ArticlesCollection', function() {
        var articles;
        
        beforeEach(function(){
            articles = new ArticlesCollection();
        }); 
        
        it('-Can add Model instances as objects and arrays.', function() {
            expect(articles.length).toBe(0);
            articles.add({ content: 'articles colection content' });
            expect(articles.length).toBe(1);
            articles.add([
                { content: 'articles colection content', title: "articles colection title"},
                { content: 'articles colection content'}
            ]);
            expect(articles.length).toBe(3);
        });

        it('-Can have a url property to define the basic url structure for all contained models.', function() {
            expect(articles.url).toBe('/feeds/5/articles');
        });

	});
});