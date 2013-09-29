//--------------Routs-----------------------------
define( ["app", "backbone"],
function( app, Backbone ){

	var AppRouter = Backbone.Router.extend({
        routes: {
            "feeds/:feedId/articles": "feedArticles",
            "feeds/:feedId/articles/:articleId": "article",
            "feeds": "mainPage",
            "*other": "mainPage",
            "": "mainPage"
        }
    });
    var app_router = new AppRouter;

	app_router.on('route:feedArticles', function(feedId) {
    	app.articles.url = '/feeds/'+feedId+'/articles';
		app.articles.fetch({
            success: function() {
                app.menuView.trigger("highlightMenuItem",feedId)
    			app.breadcrumbs.generate(app, feedId);
                app.contentReg.show(app.articlesView);
                app.contentReg.trigger('addBackLink', app.articlesView.backLink);
            },
            error: function(){
                app.notFoundPage.reset();
                app.notFoundPage.add({text: "The feed you were looking for doesn't exist!"});
                app.contentReg.show(app.notFoundPageView);
            }
        });        
    });

    app_router.on('route:article', function(feedId,articleId) {
        app.singleArticle.url = '/feeds/'+feedId+'/articles/'+articleId;
        app.singleArticle.fetch({
            success: function() {
                app.breadcrumbs.generate(app, feedId,articleId);
                app.menuView.trigger("highlightMenuItem",feedId);
                app.contentReg.show(app.singleArticleView);            
                app.contentReg.trigger('addBackLink', app.singleArticleView.backLink(feedId));
            },
            error: function(){
                app.notFoundPage.reset();
                app.notFoundPage.add({text: "The feed or article you were looking for doesn't exist!"});
                app.contentReg.show(app.notFoundPageView);
            }
        });
    });

    app_router.on('route:mainPage', function() {
        app.lastArticles.fetch({
            success: function() {
                app.contentReg.show(app.lastArticlesView);
                app.breadcrumbs.generate(app); 
            }
        });
    });
});