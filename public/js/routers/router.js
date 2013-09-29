//--------------Routs-----------------------------
define( ["app", "backbone"],
function( app, Backbone ){

	var AppRouter = Backbone.Router.extend({
        routes: {
            "feeds/:feedId/articles": "feedArticles",
            "feeds/:feedId/articles/:articleId": "article",
            "search/:searchString": "search",
            "feeds": "mainPage",
            "*other": "mainPage",
            "": "mainPage"
        },
        feedArticles: function(feedId){
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
        },
        article: function(feedId,articleId) {
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
        },
        search: function(searchString){
            app.trigger("search",searchString);
        },
        mainPage: function(other) {
            if(other=='search/'){
                app.contentReg.show(app.articlesView);
                app.contentReg.trigger("addBackLink", app.articlesView.backLink);
                app.contentReg.trigger("addSearchTitle", "");
                app.breadcrumbs.generate(app);
                app.menuView.trigger("highlightMenuItem","")
            }
            else{
                app.lastArticles.fetch({
                    success: function() {
                        app.contentReg.show(app.lastArticlesView);
                        app.breadcrumbs.generate(app); 
                    }
                });    
            }            
        }

    });

    app.router = new AppRouter;     
});