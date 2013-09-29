define(["colections/SingleArticle"],function(SingleArticleCollection){
	describe('Tests for SingleArticlesCollection', function() {
        var singleArticle;
        
        beforeEach(function(){
            singleArticle = new SingleArticleCollection();
        }); 
       
        it('-Can add Model instances as objects and arrays.', function() {
            expect(singleArticle.length).toBe(0);
            singleArticle.add({text: "The feed you were looking for doesn't exist!"});
            expect(singleArticle.length).toBe(1);
            singleArticle.add([
                {text: "The feed you were looking for doesn't exist!"},
                {text: "The feed you were looking for doesn't exist!"}
            ]);
            expect(singleArticle.length).toBe(3);
        });
        it('-Can have a url property to define the basic url structure for all contained models.', function() {
            expect(singleArticle.url).toBe('/feeds/5/articles/4');
        });

	});
});