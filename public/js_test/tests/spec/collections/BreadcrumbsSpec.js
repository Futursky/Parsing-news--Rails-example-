define(["colections/Breadcrumbs"],function(BreadcrumbsCollection){
	
	describe('Tests for BreadcrumbsCollection', function() {
        var breadcrumbs;
     
        beforeEach(function(){
            breadcrumbs = new BreadcrumbsCollection();            
        }); 
        
        it('-Can add Model instances as objects and arrays.', function() {
            expect(breadcrumbs.length).toBe(0);
            breadcrumbs.add({ href: 'http://site.com' });
            expect(breadcrumbs.length).toBe(1);
            breadcrumbs.add([
                { href: 'http://site.com', text: "breadcrumbs colection text"},
                { href: 'http://site.com'}
            ]);
            expect(breadcrumbs.length).toBe(3);
        });


        it("-Have been called generate() function", function() {

            spyOn(breadcrumbs, 'generate');
            breadcrumbs.generate();
            return expect(breadcrumbs.generate).toHaveBeenCalled();
        });
        it("-Tracks call arguments of generate() function ", function() {
            spyOn(breadcrumbs, 'generate');
            breadcrumbs.generate({}, 1, 2);
            return expect(breadcrumbs.generate).toHaveBeenCalledWith({}, 1 ,2);
        });
	});
});