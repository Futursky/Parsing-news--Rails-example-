define(["colections/NotFoundPage"],function(NotFoundPageColection){
	describe('Tests for NotFoundPageColection', function() {
        var notFoundPage;
        
        beforeEach(function(){
            notFoundPage = new NotFoundPageColection();
        }); 
       
        it('-Can add Model instances as objects and arrays.', function() {
            expect(notFoundPage.length).toBe(0);
            notFoundPage.add({ content: 'notFoundPage colection content' });
            expect(notFoundPage.length).toBe(1);
            notFoundPage.add([
                { content: 'notFoundPage colection content', title: "notFoundPage colection title"},
                { content: 'notFoundPage colection content'}
            ]);
            expect(notFoundPage.length).toBe(3);
        });
	});
});