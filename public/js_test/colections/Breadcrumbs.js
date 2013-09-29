define([ "backbone", "models/Breadcrumbs"],
function( Backbone,    BreadcrumbsModel ){
    
	var BreadcrumbsColection = Backbone.Collection.extend({
		model: BreadcrumbsModel,
		generate: function(app, feedId, articleId){

            feedId = feedId || false;
            articleId = articleId || false;

           	this.reset();
            this.add([
                { 
                    href: "#", 
                    text: "Home" 
                }
            ]);

            if(feedId)
            {
                if(!articleId)
                {
                    var feed = app.feeds.where({id: parseInt(feedId)});
                  
                    this.add([
                        {
                            href: "/#feeds/"+feedId+"/articles", 
                            text: feed[0].attributes["name"]
                        }
                    ]);
                }
                else
                {
                    var feed = app.feeds.where({id: parseInt(feedId)});
                    var article = app.singleArticle.where({id: parseInt(articleId)});
                    this.add([
                        {
                            href: "/#feeds/"+feedId+"/articles", 
                            text: feed[0].attributes["name"]
                        },
                        {
                            href: "/#feeds/"+feedId+"/articles/"+articleId,
                            text: article[0].attributes["title"]
                        }
                    ]);
                }
            }
            app.breadcrumbsReg.show(app.breadcrumbsView);
        }
	});

	return BreadcrumbsColection;
});



